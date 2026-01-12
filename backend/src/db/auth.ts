import { pool } from ".";

type userProps = {
  id?: number;
  name?: string;
  username?: string;
  email: string;
  password?: string;
};
export const registerUser = async (props: userProps): Promise<boolean> => {
  try {
    const { name, username, email, password } = props;
    const query =
      "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)";
    await pool.query(query, [name, username, email, password]);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loginUser = async (
  props: userProps
): Promise<userProps | null> => {
  try {
    const { email } = props;
    const query =
      "SELECT id, name, username, email, password created_at FROM users WHERE email=$1";
    const req = await pool.query(query, [email]);
    return req.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
