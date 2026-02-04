import { pool } from ".";

export const follow = async (props: { idP1: number; idP2: number }) => {
  try {
    const isFollowed = await pool.query(
      `SELECT * FROM followers f WHERE follower_id=$1 AND following_id=$2`,
      Object.values(props)
    );
    if (!isFollowed.rows.length) {
      const query = `INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)`;
      await pool.query(query, Object.values(props));
      return false;
    } else return true;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const stopFollowing = async (props: { idP1: number; idP2: number }) => {
  try {
    const query = `DELETE from followers WHERE follower_id=$1 AND following_id=$2`;
    await pool.query(query, Object.values(props));
    return true;
  } catch (e) {
    console.error(e);
    return null;
  }
};
