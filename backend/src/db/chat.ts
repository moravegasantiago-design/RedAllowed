import { pool } from ".";
export const bringChats = async (id: string) => {
  try {
    const query = `SELECT DISTINCT ON (c_m1.chat_id) up.user_id, c_m1.chat_id, c_m1.created_at, u.username AS friend, 
    up.photo AS "friendPhoto", up.bio AS "friendBio", up.job_title AS "friendJob", up.birthday AS "friendBirthDay", f.created_at AS "friendTime" 
    FROM chat_members c_m1 INNER JOIN chat_members c_m2 ON c_m1.chat_id = c_m2.chat_id AND c_m1.user_id != c_m2.user_id
    JOIN users u ON u.id = c_m2.user_id JOIN user_profiles up ON u.id = up.user_id 
    JOIN followers f ON u.id = f.following_id AND c_m1.user_id = f.follower_id
    WHERE c_m1.user_id=$1`;
    const req = await pool.query(query, [id]);
    return req.rows;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createGroup = async (props: { idP1: number; idP2: number }) => {
  const { idP1, idP2 } = props;
  try {
    const existing = await pool.query(
      `SELECT DISTINCT cm2.chat_id FROM chat_members cm JOIN chat_members cm2 ON cm2.chat_id = cm2.chat_id AND cm2.user_id = $2 WHERE cm.user_id = $1 
    `,
      [idP1, idP2],
    );
    let chatId: number;

    if (existing.rows.length > 0) {
      chatId = existing.rows[0].chat_id;
    } else {
      const newChat = await pool.query(
        `INSERT INTO chats DEFAULT VALUES RETURNING id`,
      );
      chatId = newChat.rows[0].id;

      await pool.query(
        `INSERT INTO chat_members (chat_id, user_id) VALUES ($1, $2), ($1, $3)`,
        [chatId, idP1, idP2],
      );
    }
    return true;
  } catch (e) {
    console.error("ERROR EN createGroup:", e);
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

export const modifyStatus = async ({
  idMessage,
  chatId,
  userId,
  status,
}: {
  idMessage?: string;
  chatId: number;
  userId: number;
  status: "delivered" | "seen";
}) => {
  const previousStatus = status === "delivered" ? "sent" : "delivered";
  const query = `UPDATE messages SET status=$4
   WHERE chat_id = $2 AND sender_id != $3 AND status = $5
   AND created_at <= COALESCE((SELECT created_at FROM messages WHERE id = $1), NOW())`;
  try {
    await pool.query(query, [
      idMessage || null,
      chatId,
      userId,
      status,
      previousStatus,
    ]);
    return true;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const bringMessage = async ({ chatId }: { chatId: number }) => {
  const query = `SELECT content, status, created_at AS date, sender_id AS "userId", id, chat_id AS "chatId"
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
    const query = `SELECT DISTINCT ON (m.chat_id)
    m.chat_id AS "chatId",
    m.id,
    m.sender_id AS "userId",
    m.content,
    m.status,
    m.created_at AS "date",
    (
      SELECT COUNT(*)
      FROM messages m2
      WHERE m2.chat_id = m.chat_id
        AND m2.status = 'delivered'
        AND m2.sender_id != $1
    ) AS "unReadMessages"
  FROM messages m
  JOIN chat_members cm ON cm.chat_id = m.chat_id
  WHERE cm.user_id = $1
  ORDER BY m.chat_id, m.created_at DESC
`;
    const req = await pool.query(query, [userId]);
    return req.rows;
  } catch (e) {
    console.error(e);
    return null;
  }
};