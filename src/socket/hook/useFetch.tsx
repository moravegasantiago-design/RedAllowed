import { useState, useCallback } from "react";
import type { userProps } from "../../Auth/hook/useFromUser";

export const useFetch = <T = userProps,>() => {
  const [data, setData] = useState<{
    success: boolean;
    data: T | null;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ error: string } | null>(null);

  const handleRequest = useCallback(
    async (props: {
      href: string;
      method: string;
      isCredentials: boolean;
      user?: userProps;
    }) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const { href, method, isCredentials, user } = props;
        const req = await fetch(`https://redallowed.onrender.com/${href}`, {
          method: method,
          headers: { "Content-Type": "application/json" },
          ...(user && {
            body: JSON.stringify({
              ...user,
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
