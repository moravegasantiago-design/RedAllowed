import { pool } from ".";
import { userProps } from "../models/authProps";

export const bringUsers = async (
  userId: number,
  amount: "ALL" | "ONE",
): Promise<userProps[] | { error: boolean; throw: string }> => {
  try {
    const query = `SELECT 
    u.id,
    u.name,
    u.username,
    up.photo,
    up.bio,
    up.job_title AS job,
    up.birthday,
    COUNT (DISTINCT f.follower_id) AS followers,
    COUNT (DISTINCT fr.follower_id) AS friends,
    EXISTS(SELECT 1 FROM followers fo WHERE follower_id = $1 AND following_id = u.id) AS "iFollow",
    EXISTS (SELECT 1 FROM followers fl WHERE follower_id = u.id AND following_id=$1) AS "followMe"
    FROM users u
    JOIN user_profiles up ON up.user_id = u.id

    LEFT JOIN followers f 
      ON f.following_id = u.id 

    
    LEFT JOIN followers fr
      ON fr.following_id = u.id
    AND EXISTS (
        SELECT 1
        FROM followers back
        WHERE back.follower_id = u.id
          AND back.following_id = fr.follower_id
    )
    WHERE ${amount === "ALL" ? "u.id != $1" : "u.id = $1"}
    
    GROUP BY 
      u.id, u.name, u.username,
      up.photo, up.bio, up.job_title, up.birthday`;
    const req = await pool.query(query, [userId]);
    return req.rows;
  } catch (e) {
    console.error(e);
    return { error: true, throw: JSON.stringify(e) };
  }
};
