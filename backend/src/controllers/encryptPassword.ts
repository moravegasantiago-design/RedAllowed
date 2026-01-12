import bcrypt from "bcrypt";
export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};
export const comparePassword = async (props: {
  encryptPassword: string;
  password: string;
}): Promise<boolean> => {
  const { encryptPassword, password } = props;
  return await bcrypt.compare(password, encryptPassword);
};
