import { useLocalstorage as useRooksLocalstorage } from "rooks";

type StorageHandlerAsArray<T = any> = [T, (newValue: T) => void, () => void];
type StorageHandlerAsObject<T = any> = {
    value: T;
    set: (newValue: T) => void;
    remove: () => void;
};

const useLocalstorage = <T = any>(key: string, initialValue?: T) =>
    useRooksLocalstorage(key, initialValue) as StorageHandlerAsArray<T> &
        StorageHandlerAsObject<T>;

export { useLocalstorage };
