import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { HoverableAtom } from "utils/atoms/hoverable-atom";

interface UseHoverableOptions {
    hoverableId: string;
}

interface UseHoverableResult {
    hoverableId?: string;
    isHovering: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const useHoverable = (options: UseHoverableOptions): UseHoverableResult => {
    const [hoverableId, setHoverableId] = useAtom(HoverableAtom);

    const onMouseEnter = useCallback(
        () => setHoverableId(options.hoverableId),
        [setHoverableId]
    );
    const onMouseLeave = useCallback(
        () => setHoverableId(undefined),
        [setHoverableId]
    );

    return {
        isHovering: hoverableId != null,
        hoverableId,
        onMouseEnter,
        onMouseLeave,
    };
};

export { useHoverable };
