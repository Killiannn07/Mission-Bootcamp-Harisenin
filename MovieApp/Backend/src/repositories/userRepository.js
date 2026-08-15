import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `SELECT id, name, email, password, role, is_verified, created_at, updated_at FROM users WHERE email = $1;`;

  const res = await pool.query(query, [email]);

  return res.rows[0];
};

export const createUser = async (data) => {
  const query = `
        INSERT INTO users
        (
            name,
            email,
            password,
            role, 
            verification_token
        )
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING
            id,
            name,
            email,
            role,
            is_verified,
            created_at,
            updated_at;
    `;

  const values = [
    data.name,
    data.email,
    data.password,
    data.role,
    data.verificationToken,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const findUserByVerificationToken = async (token) => {
  const query = `
        SELECT
            id,
            name,
            email,
            is_verified
        FROM users
        WHERE verification_token = $1;
    `;

  const result = await pool.query(query, [token]);

  return result.rows[0];
};

export const verifyUser = async (id) => {
  const query = `
        UPDATE users
        SET
            is_verified = TRUE,
            verification_token = NULL,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING
            id,
            name,
            email,
            role,
            is_verified;
    `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export const saveResetPasswordToken = async (id, token, expires) => {
  const query = `
        UPDATE users
        SET
            reset_password_token = $1,
            reset_password_expires = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3;
    `;

  await pool.query(query, [token, expires, id]);
};

export const findUserByResetToken = async (token) => {
  const query = `
        SELECT
            id,
            name,
            email
        FROM users
        WHERE reset_password_token = $1
        AND reset_password_expires > CURRENT_TIMESTAMP;
    `;

  const result = await pool.query(query, [token]);

  return result.rows[0];
};

export const updatePassword = async (id, hashedPassword) => {
  const query = `
        UPDATE users
        SET
            password = $1,
            reset_password_token = NULL,
            reset_password_expires = NULL,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2;
    `;

  await pool.query(query, [hashedPassword, id]);
};
