import { useAtom } from "jotai";
import { useCallback } from "react";
import { HoverableAtom } from "utils/atoms/hoverable-atom";

interface UseHoverableOptions {
    hoverableId: string;
}

interface UseHoverableResult {
    hoverableId?: string;
    isHovering: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    resetHoveringState: (callback: () => void) => () => void;
}

const useHoverable = (options: UseHoverableOptions): UseHoverableResult => {
    const [hoverableId, setHoverableId] = useAtom(HoverableAtom);

    const onMouseEnter = useCallback(
        () => setHoverableId(options.hoverableId),
        [options.hoverableId, setHoverableId]
    );
    const onMouseLeave = useCallback(
        () => setHoverableId(undefined),
        [setHoverableId]
    );

    const resetHoveringState = useCallback(
        (callback: () => void) => () => {
            callback();
            setHoverableId(undefined);
        },
        [setHoverableId]
    );

    return {
        isHovering: hoverableId != null,
        hoverableId,
        onMouseEnter,
        onMouseLeave,
        resetHoveringState,
    };
};

export { useHoverable };
