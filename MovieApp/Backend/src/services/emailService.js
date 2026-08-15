import transporter from "../config/mailer.js";

export const sendVerificationEmail = async (email, name, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"MovieApp" <${process.env.SMTP_USER}>`,

    to: email,

    subject: "Verify your MovieApp account",

    html: `
            <h2>Hello ${name}</h2>

            <p>
                Thank you for registering on MovieApp.
            </p>

            <p>
                Please verify your email address by clicking the button below.
            </p>

            <a
                href="${verificationUrl}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#000;
                    color:#fff;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                Verify Email
            </a>

            <p>
                If you did not create this account, you can ignore this email.
            </p>
        `,
  });
};

export const sendResetPasswordEmail = async (email, name, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"MovieApp" <${process.env.SMTP_USER}>`,

    to: email,

    subject: "Reset your MovieApp password",

    html: `
            <h2>Hello ${name}</h2>

            <p>
                We received a request to reset your password.
            </p>

            <p>
                Click the button below to create a new password.
            </p>

            <a
                href="${resetUrl}"
                style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#000;
                    color:#fff;
                    text-decoration:none;
                    border-radius:6px;
                "
            >
                Reset Password
            </a>

            <p>
                This link will expire in 15 minutes.
            </p>

            <p>
                If you did not request a password reset,
                you can safely ignore this email.
            </p>
        `,
  });
};
