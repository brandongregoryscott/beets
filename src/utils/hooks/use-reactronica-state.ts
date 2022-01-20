import { ReactronicaState } from "interfaces/reactronica-state";
import { SetStateAction, useAtom } from "jotai";
import { useCallback } from "react";
import { StepNoteType } from "@brandongregoryscott/reactronica";
import { ReactronicaStateAtom } from "utils/atoms/reactronica-atom";

interface UseReactronicaStateResult {
    onPause: () => void;
    onStepPlay: (notes: StepNoteType[], index: number) => void;
    setState: (update?: SetStateAction<ReactronicaState | undefined>) => void;
    state: ReactronicaState | undefined;
}

const useReactronicaState = (): UseReactronicaStateResult => {
    const [state, setState] = useAtom(ReactronicaStateAtom);

    const onPause = useCallback(() => setState(undefined), [setState]);
    const onStepPlay = useCallback(
        (notes: StepNoteType[], index: number) => setState({ notes, index }),
        [setState]
    );

    return { state, setState, onPause, onStepPlay };
};

export { useReactronicaState };
