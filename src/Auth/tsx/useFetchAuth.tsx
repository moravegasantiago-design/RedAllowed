import { useState } from "react";
import type { userProps } from "./useFromUser";

export const useFetchAuth = () => {
  const [data, setData] = useState<{
    success: boolean;
    data: userProps | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ error: string } | null>(null);

  const handleRequest = async (props: {
    href: string;
    method: string;
    isCredentials: boolean;
    formUser?: userProps;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const { href, method, isCredentials, formUser } = props;
      const req = await fetch(
        `https://redallowed.onrender.com/api/auth/${href}`,
        {
          method: method,
          headers: { "Content-Type": "application/json" },
          ...(formUser && { body: JSON.stringify(formUser) }),
          credentials: isCredentials ? "include" : "omit",
        }
      );
      const res = await req.json();
      if (!res.body.data && res.success)
        return setData({ success: true, data: null });
      if (!res.body.error) return setError(res.body.error);
      setData(res.body.data);
    } catch (err) {
      console.error(err);
      setError({ error: JSON.stringify(err) });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleRequest };
};
