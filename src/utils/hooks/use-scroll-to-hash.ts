import { useEffect } from "react";
import { scrollToHash } from "utils/scroll-utils";

const useScrollToHash = () => {
    useEffect(() => {
        setTimeout(() => {
            const { hash } = window.location;
            scrollToHash(hash);
        }, 0);
    });
};

export { useScrollToHash };
