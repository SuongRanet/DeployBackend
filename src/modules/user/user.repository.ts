import pool from "../../config/db";

export const createUserRepository = async (
  name: string,
  email: string,
  password: string,
) => {
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [name, email, password],
  );

  return result.rows[0];
};

export const getUsersRepository = async () => {
  const result = await pool.query(
    `SELECT id, name, email, password, create_at FROM users ORDER BY id ASC`,
  );

  return result.rows;
};

export const getUserByIdRepository = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, name, email, password, create_at
    FROM users
    WHERE id = $1
    `,
    [id],
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

export const userUpdateRepository = async (
  id: number,
  name: string,
  email: string,
  password: string | null,
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      email = $2,
      password = $3
    WHERE id = $4
    RETURNING id, name, email, create_at
    `,
    [name, email, password, id],
  );

  return result.rows[0];
};

export const userRoleUpdateRepository = async (
  userId: number,
  roleId: number,
) => {
  const result = await pool.query(
    `
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id)
    DO UPDATE SET role_id = EXCLUDED.role_id
    RETURNING user_id, role_id
    `,
    [userId, roleId],
  );

  return result.rows[0];
};
export const deleteUserRepository = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id, name, email
    `,
    [id],
  );

  return result.rows[0];
};
