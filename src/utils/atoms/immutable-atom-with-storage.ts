import { Collection, Record } from "immutable";
import { atomWithStorage } from "jotai/utils";

const immutableAtomWithStorage = <T extends Record<any> | Collection<any, any>>(
    key: string,
    initialValue: T,
    constructorOrFactory: (...args: any[]) => T
) =>
    atomWithStorage(key, initialValue, {
        getItem: (key: string) => {
            const value = localStorage.getItem(key);
            if (value == null) {
                return constructorOrFactory();
            }

            return constructorOrFactory(JSON.parse(value));
        },
        removeItem: (key: string) => localStorage.removeItem(key),
        setItem: (key: string, newValue: T) =>
            localStorage.setItem(key, JSON.stringify(newValue.toJS())),
    });

export { immutableAtomWithStorage };
