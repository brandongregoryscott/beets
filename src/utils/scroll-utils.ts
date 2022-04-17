import { isEmpty } from "lodash";

const scrollToHash = (hashOrId?: string) => {
    if (isEmpty(hashOrId)) {
        return;
    }

    const id = hashOrId!.replace("#", "");
    const element = document.getElementById(id);
    if (element == null) {
        return;
    }

    element.scrollIntoView({
        block: "start",
        inline: "start",
        behavior: "smooth",
    });
};

export { scrollToHash };
