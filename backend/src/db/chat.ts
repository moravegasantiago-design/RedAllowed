import { pool } from ".";
export const bringChats = async (id: string) => {
  try {
    const query = `SELECT DISTINCT ON (c_m1.chat_id) c_m1.user_id, c_m1.chat_id, c_m1.created_at, u.username AS friend, 
    up.photo AS friendPhoto, up.bio AS friendBio, up.job_title AS friendJob, up.birthday AS friendBirthDay, f.created_at AS friendTime 
    FROM chat_members c_m1 INNER JOIN chat_members c_m2 ON c_m1.chat_id = c_m2.chat_id AND c_m1.user_id != c_m2.user_id
    JOIN users u ON u.id = c_m2.user_id JOIN users_profiles up ON u.id = up.user_id 
    JOIN followers f ON u.id = f.following_id AND c_m1.user_id = f.follower_id
    WHERE c_m1.user_id=$1`;
    const req = await pool.query(query, [id]);
    return req.rows;
  } catch (e) {
    console.error(e);
    return null;
  }
};
