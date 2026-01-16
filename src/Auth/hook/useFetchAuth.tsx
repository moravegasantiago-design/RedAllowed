import { useState, useCallback } from "react";
import type { userProps } from "./useFromUser";

export const useFetchAuth = () => {
  const [data, setData] = useState<{
    success: boolean;
    data: userProps | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ error: string } | null>(null);

  const handleRequest = useCallback(
    async (props: {
      href: string;
      method: string;
      isCredentials: boolean;
      formUser?: userProps;
    }) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const { href, method, isCredentials, formUser } = props;
        const req = await fetch(`http://localhost:4000/api/auth/${href}`, {
          method: method,
          headers: { "Content-Type": "application/json" },
          ...(formUser && {
            body: JSON.stringify({
              email: formUser.email,
              password: formUser.password,
            }),
          }),
          credentials: isCredentials ? "include" : "omit",
        });
        const res = await req.json();
        if (!res.data && res?.success) {
          setData({ success: true, data: null });
          return true;
        }
        if (!res.success) {
          setError({ error: res.error });
          return null;
        }
        setData(res.data);
        return true;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, handleRequest };
};
