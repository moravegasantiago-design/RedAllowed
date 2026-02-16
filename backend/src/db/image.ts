import { pool } from ".";

export const updateImage = async (url: string, id: number) => {
  try {
    const query = `UPDATE user_profiles SET photo=$1 WHERE user_id=$2`;
    await pool.query(query, [url, id]);
    return true;
  } catch (e) {
    console.error(e);
    return null;
  }
};
