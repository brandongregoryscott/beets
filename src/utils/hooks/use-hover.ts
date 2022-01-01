import { RefObject, useEffect, useRef, useState } from "react";

/**
 * See https://usehooks.com/useHover/
 */
const useHover = <T extends HTMLElement = HTMLElement>(): [
    ref: RefObject<T>,
    isHovered: boolean
] => {
    const [value, setValue] = useState(false);
    const ref = useRef<T>(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener("mouseover", handleMouseOver);
                node.addEventListener("mouseout", handleMouseOut);
                return () => {
                    node.removeEventListener("mouseover", handleMouseOver);
                    node.removeEventListener("mouseout", handleMouseOut);
                };
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ref.current]
    );
    return [ref, value];
};

export { useHover };
