import { useState, type ChangeEvent } from "react";

const useSearch = <T extends object>(keys: (keyof T)[]) => {
  const [search, setSearch] = useState<{ value: string; filter: T[] }>({
    value: "",
    filter: [],
  });
  const handleSearch = ({
    e,
    list,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    list: T[];
  }) => {
    const value = e.target.value;
    const filter = list.filter((l) =>
      keys.some((k) => {
        const item = l[k];
        return (
          typeof item === "string" &&
          item.toLowerCase().includes(value.toLowerCase().trim())
        );
      })
    );
    setSearch({ value: value, filter: filter });
  };

  return { search, handleSearch };
};
export default useSearch;
