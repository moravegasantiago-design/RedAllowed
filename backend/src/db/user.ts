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

    COALESCE(
      ARRAY_AGG(DISTINCT f.follower_id)
        FILTER (WHERE f.follower_id IS NOT NULL),
      '{}'
    ) AS followers,

    COALESCE(
      ARRAY_AGG(DISTINCT f2.following_id)
        FILTER (WHERE f2.following_id IS NOT NULL),
      '{}'
    ) AS friends

    FROM users u
    JOIN user_profiles up ON up.user_id = u.id

    LEFT JOIN followers f 
      ON f.following_id = u.id

    LEFT JOIN followers f2 
      ON f2.follower_id = u.id

    GROUP BY 
      u.id, u.name, u.username,
      up.photo, up.bio, up.job_title, up.birthday
`;
    const req = await pool.query(query);
    return req.rows;
  } catch (e) {
    console.error(e);
    return { error: true, throw: JSON.stringify(e) };
  }
};
