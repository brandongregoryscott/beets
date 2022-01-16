import { Record } from "immutable";
import { atom, SetStateAction, WritableAtom } from "jotai";
import { isFunction, merge } from "lodash";
import { PickKeysOfType } from "types/pick-keys-by-type";

const derivedAtomFactory = <TParent, TDerived>(
    parentAtom: WritableAtom<TParent, SetStateAction<TParent>>,
    derivedKey: PickKeysOfType<TParent, TDerived>
) =>
    atom<TDerived, SetStateAction<TDerived>>(
        (get) =>
            get(parentAtom)[derivedKey as keyof TParent] as any as TDerived,
        (get, set, updated) => {
            const prev: TDerived = get(parentAtom)[
                derivedKey
            ] as any as TDerived;
            const updatedValue: TDerived = isFunction(updated)
                ? updated(prev)
                : updated;

            set(parentAtom, (parentAtom: TParent) =>
                Record.isRecord(parentAtom)
                    ? parentAtom.merge({ [derivedKey]: updatedValue })
                    : merge(parentAtom, { [derivedKey]: updatedValue })
            );
        }
    );

export { derivedAtomFactory };
