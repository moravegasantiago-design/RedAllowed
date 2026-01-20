import { json } from "stream/consumers";
import { pool } from ".";
import { userProps } from "../models/authProps";

export const bringUsers = async (): Promise<
  userProps[] | { error: boolean; throw: string }
> => {
  try {
    const query = `SELECT 
  u.id,
  u.name,
  up.username,
  up.photo,
  up.bio,
  up.job,
  up.birthday,
  COUNT(DISTINCT f2.following_id) as friends,
  COUNT(DISTINCT f.follower_id) AS followers
    FROM users u
    JOIN user_profiles up ON up.user_id = u.id
    LEFT JOIN followers f ON f.following_id = u.id
    LEFT JOIN followers f2 ON f2.follower_id = u.id 
    AND f2.following_id = f.follower_id
    GROUP BY 
  u.id, u.name, up.username, up.photo, up.bio, up.job, up.birthday;
`;
    const req = await pool.query(query);
    return req.rows;
  } catch (e) {
    console.error(e);
    return { error: true, throw: JSON.stringify(e) };
  }
};
