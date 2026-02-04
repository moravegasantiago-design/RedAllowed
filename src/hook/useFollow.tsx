import { useFetch } from "./useFetch";

const useFollow = () => {
  const { data, loading, handleRequest } = useFetch<{
    idP1: number;
    idP2: number;
    message?: string;
  }>();
  const handlerFollow = async (idP1: number, idP2: number) => {
    try {
      await handleRequest({
        href: "api/follow/follow",
        method: "POST",
        isCredentials: false,
        user: { idP1, idP2 },
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
