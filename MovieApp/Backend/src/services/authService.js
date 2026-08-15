import * as userRepository from "../repositories/userRepository.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as emailService from "./emailService.js";

export const registerUser = async (data) => {
  const existingUser = await userRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "user",
    verificationToken,
  });

  await emailService.sendVerificationEmail(
    user.email,
    user.name,
    verificationToken,
  );

  return user;
};

export const login = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.is_verified) {
    throw new AppError("Please verify your email before login", 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const verifyEmail = async (token) => {
  const user = await userRepository.findUserByVerificationToken(token);

  if (!user) {
    throw new AppError("Invalid verification token", 400);
  }

  if (user.is_verified) {
    throw new AppError("Email already verified", 400);
  }

  return await userRepository.verifyUser(user.id);
};

export const forgotPassword = async (email) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    return;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await userRepository.saveResetPasswordToken(user.id, resetToken, expires);

  await emailService.sendResetPasswordEmail(user.email, user.name, resetToken);
};

export const resetPassword = async (token, newPassword) => {
  const user = await userRepository.findUserByResetToken(token);

  if (!user) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await userRepository.updatePassword(user.id, hashedPassword);
};
