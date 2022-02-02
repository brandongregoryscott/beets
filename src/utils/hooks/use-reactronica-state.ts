import { ReactronicaState } from "interfaces/reactronica-state";
import { SetStateAction, useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { StepNoteType } from "lib/reactronica";
import {
    initialReactronicaState,
    ReactronicaStateAtom,
} from "utils/atoms/reactronica-atom";
import { isFunction } from "lodash";

interface UseReactronicaStateOptions {
    /** When true, uses shared `ReactronicaStateAtom`. Otherwise, creates a local state value */
    useAtomState?: boolean;
}

interface UseReactronicaStateResult {
    onPlayToggle: (isPlaying: boolean) => void;
    onStepPlay: (notes: StepNoteType[], index: number) => void;
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
        (notes: StepNoteType[], index: number) =>
            setState((prev) => ({
                ...prev,
                notes,
                index,
            })),
        [setState]
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

    return {
        state,
        setIsPlaying,
        setIsMuted,
        setState,
        onStepPlay,
        onPlayToggle,
    };
};

export { useReactronicaState };
