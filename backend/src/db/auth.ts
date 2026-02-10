import { pool } from ".";
import { userProps } from "../models/authProps";

export const registerBd = async (props: userProps): Promise<boolean> => {
  try {
    const { name, username, email, password } = props;
    const query = `WITH new_user AS (
    INSERT INTO users (name, username, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING id)
    INSERT INTO user_profiles (user_id) SELECT id FROM new_user
    `;
    await pool.query(query, [name, username, email, password]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginBd = async (props: userProps): Promise<userProps | null> => {
  try {
    const { email } = props;
    const query = `SELECT id, name, username, email, 
      created_at, password, up.photo AS "userPhoto", up.bio AS 
      "userBio", up.job_title AS "userJob", up.birthday 
      AS "userBithDay" FROM users u
      JOIN user_profiles up ON u.id = up.user_id
      WHERE email=$1`;
    const req = await pool.query(query, [email]);
    return req.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
