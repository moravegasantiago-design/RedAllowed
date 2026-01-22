import { pool } from ".";
import { userProps } from "../models/authProps";

export const bringUsers = async (): Promise<
  userProps[] | { error: boolean; throw: string }
> => {
  try {
    const query = `SELECT 
  u.id,
  u.name,
  u.username,
  up.photo,
  up.bio,
  up.job_title AS job,
  up.birthday,
  f2.following_id as friends,
  f.follower_id AS followers
    FROM users u
    JOIN user_profiles up ON up.user_id = u.id
    LEFT JOIN followers f ON f.following_id = u.id
    LEFT JOIN followers f2 ON f2.follower_id = u.id 
    AND f2.following_id = f.follower_id;
`;
    const req = await pool.query(query);
    return req.rows;
  } catch (e) {
    console.error(e);
    return { error: true, throw: JSON.stringify(e) };
  }
};
