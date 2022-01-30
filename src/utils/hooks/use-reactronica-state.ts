import { ReactronicaState } from "interfaces/reactronica-state";
import { SetStateAction, useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { StepNoteType } from "lib/reactronica";
import { ReactronicaStateAtom } from "utils/atoms/reactronica-atom";

interface UseReactronicaStateOptions {
    /** When true, uses shared `ReactronicaStateAtom`. Otherwise, creates a local state value */
    useAtomState?: boolean;
}

interface UseReactronicaStateResult {
    onPlayToggle: (isPlaying: boolean) => void;
    onStepPlay: (notes: StepNoteType[], index: number) => void;
    setState: (update: SetStateAction<ReactronicaState | undefined>) => void;
    state: ReactronicaState | undefined;
}

const useReactronicaState = (
    options?: UseReactronicaStateOptions
): UseReactronicaStateResult => {
    const { useAtomState = true } = options ?? {};
    const [atomState, setAtomState] = useAtom(ReactronicaStateAtom);
    const [localState, setLocalState] = useState<
        ReactronicaState | undefined
    >();
    const state = useMemo(
        () => (useAtomState ? atomState : localState),
        [atomState, localState, useAtomState]
    );
    const setState = useMemo(
        () => (useAtomState ? setAtomState : setLocalState),
        [setAtomState, setLocalState, useAtomState]
    );

    const onPause = useCallback(() => setState(undefined), [setState]);
    const onStepPlay = useCallback(
        (notes: StepNoteType[], index: number) => setState({ notes, index }),
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

    return { state, setState, onStepPlay, onPlayToggle };
};

export { useReactronicaState };
