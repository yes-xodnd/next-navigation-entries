import { JSONStorage } from "./types";

export const createPersister = <T>(key: string, storage: JSONStorage) => {
  const save = (data: T) => {
    storage.setItem(key, JSON.stringify(data));
  };

  const restore = (): T | null => {
    const persisted = storage.getItem(key);
    return persisted ? JSON.parse(persisted) : null;
  };

  return {
    save,
    restore,
  };
};
