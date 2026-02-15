import { useFetch } from "./useFetch";

const useFollow = () => {
  const { data, loading, handleRequest } = useFetch<{
    idP2: number;
    message?: string;
  }>();
  const handlerFollow = async (idP2: number) => {
    try {
      await handleRequest({
        href: "api/follow/follow",
        method: "POST",
        isCredentials: true,
        user: { idP2 },
      });
      return true;
    } catch (e) {
      console.error(`Error handlerFollow: ${e}`);
      return null;
    }
  };
  return { data, loading, handlerFollow };
};

export default useFollow;
