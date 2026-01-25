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

export const createGroup = async (props: { idP1: string; idP2: string }) => {
  const { idP1, idP2 } = props;
  try {
    const query = `WITH existing_chat AS (
    -- Busca si ya existe un chat 1 a 1 entre los dos usuarios
    SELECT cm1.chat_id
    FROM chats_members cm1
    JOIN chats_members cm2 
      ON cm1.chat_id = cm2.chat_id
    WHERE cm1.user_id = $1
      AND cm2.user_id = $2
    GROUP BY cm1.chat_id
    HAVING COUNT(*) = 2),
    new_chat AS (
        INSERT INTO chats DEFAULT VALUES
        WHERE NOT EXISTS (SELECT 1 FROM existing_chat)
        RETURNING id AS chat_id
    ),
    final_chat AS (
        SELECT chat_id FROM existing_chat
        UNION ALL
        SELECT chat_id FROM new_chat
    )

    INSERT INTO chats_members (chat_id, user_id)
    SELECT chat_id, $1 FROM final_chat
    UNION ALL
    SELECT chat_id, $2 FROM final_chat
    RETURNING *`;
    const res = (await pool.query(query, [idP1, idP2])).rows;
    if (res.length) return true;
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const addMessage = async (props: {
  idMessage: string;
  chatId: number;
  userId: number;
  content: string;
}) => {
  const query = `INSERT INTO messages (id , chat_id, sender_id, content) VALUES ($1, $2, $3, $4)`;
  try {
    await pool.query(query, Object.values(props));
    return true;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const modifyStatus = async (props: {
  idMessage: string;
  chatId: number;
  userId: number;
  status: "delivered" | "seen";
}) => {
  const query = `UPDATE messages SET status=$4 WHERE id=$1 AND chat_id=$2 AND sender_id=$3`;
  try {
    await pool.query(query, Object.values(props));
    return true;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const bringMessage = async ({ chatId }: { chatId: number }) => {
  const query = `SELECT content, status, created_at AS date, sender_id AS userId, id, chat_id AS chatId
  FROM messages WHERE chat_id=$1 ORDER BY created_at DESC`;
  try {
    const req = await pool.query(query, [chatId]);
    return req.rows;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const lastMessages = async ({ userId }: { userId: number }) => {
  try {
    const query = `SELECT DISTINCT ON (m.chat_id) m.chat_id AS chatId, m.id, m.sender_id AS userId, m.content, m.status, m.created_at AS date
  FROM messages m JOIN chat_members cm ON cm.chat_id = m.chat_id WHERE cm.user_id =$1 ORDER BY m.chat_id, m.created_at DESC`;
    const req = await pool.query(query, [userId]);
    return req.rows;
  } catch (e) {
    console.error(e);
    return null;
  }
};