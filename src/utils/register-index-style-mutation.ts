import * as Tone from "tone";
import { difference } from "lodash";
import { clampIndexToRange } from "utils/track-section-step-utils";

let index: number = -1;

const DATA_INDEX = "data-index";

const applyStyles = (adjustedIndex: number): HTMLDivElement[] => {
    const playingElements = getIndexElements(adjustedIndex);
    playingElements.forEach((element) => {
        element.style.transform = "translateY(-2px)";
        element.style.boxShadow =
            "0 0 1px rgb(67 90 111 / 30%), 0 2px 4px -2px rgb(67 90 111 / 47%)";
    });

    return playingElements;
};

const getAttributeValue = (attributeName: string): number | undefined => {
    const value = document
        .querySelector(`[${attributeName}]`)
        ?.attributes.getNamedItem(attributeName)?.value;

    if (value == null || isNaN(parseInt(value))) {
        return undefined;
    }

    return parseInt(value);
};

const getIndexElements = (index?: number): HTMLDivElement[] => {
    const selector =
        index == null
            ? // Since '0' is falsy, we need to explicitly include it in the "find all" query
              `[${DATA_INDEX}],[${DATA_INDEX}='0']`
            : `[${DATA_INDEX}='${index}']`;
    return document.querySelectorAll(selector) as any as HTMLDivElement[];
};

const registerIndexStyleMutation = () => {
    Tone.Transport.on("stop", () => {
        index = -1;
        const allElements = getIndexElements();
        removeStyles(allElements);
    });

    Tone.Transport.scheduleRepeat((time: number) => {
        Tone.Draw.schedule(() => {
            index++;

            const endIndex = getAttributeValue("data-end-index");
            const startIndex = getAttributeValue("data-start-index");
            const stepCount = getAttributeValue("data-step-count")!;

            const adjustedIndex = clampIndexToRange({
                index,
                endIndex: endIndex ?? stepCount,
                startIndex,
            });

            const playingElements = applyStyles(adjustedIndex);
            const pausedElements = difference(
                getIndexElements(),
                playingElements
            ) as HTMLDivElement[];

            removeStyles(pausedElements);
        }, time);
    }, "8n");
};

const removeStyles = (elements: HTMLDivElement[]) => {
    elements.forEach((element) => {
        element.style.transform = "";
        element.style.boxShadow = "";
    });
};

export { registerIndexStyleMutation };
