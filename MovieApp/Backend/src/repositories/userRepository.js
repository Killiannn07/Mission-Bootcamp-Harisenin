import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const query = `SELECT id, name, email, password, role, created_at, updated_at FROM users WHERE email = $1;`;

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
            role
        )
        VALUES
        ($1, $2, $3, $4)
        RETURNING
            id,
            name,
            email,
            role,
            created_at,
            updated_at;
    `;

  const values = [data.name, data.email, data.password, data.role];

  const result = await pool.query(query, values);

  return result.rows[0];
};
