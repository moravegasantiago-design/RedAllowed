import { pool } from ".";

export const bringUsers = async () => {
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
    return null;
  }
};
