import { useCallback, useState } from "react";

interface UseIsHoveringResult {
    isHovering: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const useIsHovering = (): UseIsHoveringResult => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const onMouseEnter = useCallback(
        () => setIsHovering(true),
        [setIsHovering]
    );
    const onMouseLeave = useCallback(
        () => setIsHovering(false),
        [setIsHovering]
    );

    return { isHovering, onMouseEnter, onMouseLeave };
};

export { useIsHovering };
