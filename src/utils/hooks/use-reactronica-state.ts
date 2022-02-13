import { ReactronicaState } from "interfaces/reactronica-state";
import { SetStateAction, useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { StepType } from "lib/reactronica";
import {
    initialReactronicaState,
    ReactronicaStateAtom,
} from "utils/atoms/reactronica-atom";
import { isFunction } from "lodash";
import { isHotkeyPressed } from "react-hotkeys-hook";
import _ from "lodash";
import { List } from "immutable";

interface UseReactronicaStateOptions {
    /** When true, uses shared `ReactronicaStateAtom`. Otherwise, creates a local state value */
    useAtomState?: boolean;
}

interface UseReactronicaStateResult {
    isSelected: (index: number) => boolean;
    onIndexClick: (index: number) => void;
    onPlayToggle: (isPlaying: boolean) => void;
    onStepPlay: (notes: StepType, index: number) => void;
    setIsMuted: (update: SetStateAction<boolean>) => void;
    setIsPlaying: (update: SetStateAction<boolean>) => void;
    setState: (update: SetStateAction<ReactronicaState>) => void;
    state: ReactronicaState;
}

const useReactronicaState = (
    options?: UseReactronicaStateOptions
): UseReactronicaStateResult => {
    const { useAtomState = true } = options ?? {};
    const [atomState, setAtomState] = useAtom(ReactronicaStateAtom);
    const [localState, setLocalState] = useState<ReactronicaState>(
        initialReactronicaState
    );
    const state = useMemo(
        () => (useAtomState ? atomState : localState),
        [atomState, localState, useAtomState]
    );

    const { startIndex, endIndex } = state;

    const setState = useMemo(
        () => (useAtomState ? setAtomState : setLocalState),
        [setAtomState, setLocalState, useAtomState]
    );

    const setIsPlaying = useCallback(
        (update: SetStateAction<boolean>) => {
            setState((prev) => {
                const updatedIsPlaying = isFunction(update)
                    ? update(prev.isPlaying)
                    : update;
                return { ...prev, isPlaying: updatedIsPlaying };
            });
        },
        [setState]
    );

    const setIsMuted = useCallback(
        (update: SetStateAction<boolean>) => {
            setState((prev) => {
                const updatedIsMuted = isFunction(update)
                    ? update(prev.isMuted)
                    : update;
                return { ...prev, isMuted: updatedIsMuted };
            });
        },
        [setState]
    );
    const onPause = useCallback(
        () => setState((prev) => ({ ...prev, index: undefined, notes: [] })),
        [setState]
    );

    const onStepPlay = useCallback(
        (notes: StepType, index: number) =>
            setState((prev) => ({
                ...prev,
                notes,
                index: startIndex != null ? index + startIndex : index,
            })),
        [setState, startIndex]
    );

    const onPlayToggle = useCallback(
        (isPlaying: boolean) => {
            if (!isPlaying) {
                return;
            }

            onPause();
        },
        [onPause]
    );

    const onIndexClick = useCallback(
        (index: number) => {
            if (!isHotkeyPressed("shift")) {
                setState((prev) => ({
                    ...prev,
                    startIndex: startIndex === index ? undefined : index,
                    endIndex: undefined,
                }));

                return;
            }

            const indexes = List([startIndex, endIndex, index])
                .filterNot(_.isNil)
                .sort();

            setState((prev) => ({
                ...prev,
                startIndex: indexes.first(),
                endIndex: indexes.last(),
            }));
        },
        [endIndex, setState, startIndex]
    );

    const isSelected = useCallback(
        (index: number) => {
            if (startIndex == null) {
                return false;
            }

            if (endIndex == null) {
                return index === startIndex;
            }

            return index >= startIndex && index <= endIndex;
        },
        [endIndex, startIndex]
    );

    return {
        isSelected,
        state,
        setIsPlaying,
        setIsMuted,
        setState,
        onStepPlay,
        onPlayToggle,
        onIndexClick,
    };
};

export { useReactronicaState };
