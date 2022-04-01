import { isEmpty } from "lodash";
import { useEffect } from "react";

const useScrollToHash = () => {
    useEffect(() => {
        setTimeout(scrollToHash, 0);
    });
};

const scrollToHash = () => {
    const { hash } = window.location;
    if (isEmpty(hash)) {
        return;
    }

    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element == null) {
        return;
    }

    element.scrollIntoView({
        block: "start",
        behavior: "smooth",
    });
};

export { useScrollToHash };
