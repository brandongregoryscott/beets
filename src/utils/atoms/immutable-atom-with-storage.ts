import { Record } from "immutable";
import { atomWithStorage } from "jotai/utils";

const immutableAtomWithStorage = <T extends Record<any>>(
    key: string,
    initialValue: T,
    constructor: new (...args: any[]) => T
) =>
    atomWithStorage(key, initialValue, {
        getItem: (key: string) => {
            const value = localStorage.getItem(key);
            if (value == null) {
                return new constructor();
            }

            return new constructor(JSON.parse(value));
        },
        setItem: (key: string, newValue: T) =>
            localStorage.setItem(key, JSON.stringify(newValue.toJS())),
    });

export { immutableAtomWithStorage };
