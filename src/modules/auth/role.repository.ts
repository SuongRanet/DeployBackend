import pool from "../../config/db";

export const getRoleByNameRepository = async (id: number = 2) => {
  const result = await pool.query(
    `
    SELECT *
    FROM roles
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

export const assignRoleRepository = async (userId: number, roleId: number) => {
  const result = await pool.query(
    `
    INSERT INTO user_roles (user_id, role_id)
    VALUES ($1, $2)
    RETURNING *
    `,
    [userId, roleId],
  );

  return result.rows[0];
};
