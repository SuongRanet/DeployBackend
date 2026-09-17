import pool from "../../config/db";

export const registerRepository = async (
  name: string,
  email: string,
  password: string,
) => {
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
    `,
    [name, email, password],
  );

  return result.rows[0];
};
export const getUserByEmailRepository = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id, name, email, password, create_at
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0];
};
export const loginRepository = async (email: string) => {
  const result = await pool.query(
    `
    SELECT
      u.id,
      u.name,
      u.email,
      u.password,
      ur.role_id AS role
    FROM users u
    LEFT JOIN user_roles ur
      ON u.id = ur.user_id
    WHERE u.email = $1
    `,
    [email],
  );

  return result.rows[0];
};
