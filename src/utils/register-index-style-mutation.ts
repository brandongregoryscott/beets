import * as Tone from "tone";
import { difference, debounce, last } from "lodash";
import { clampIndexToRange } from "utils/track-section-step-utils";
import { DataAttributes } from "constants/data-attributes";

let index: number = -1;

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
    // Prioritize the last matching element to handle Dialog components w/ attributes
    const value = last(
        document.querySelectorAll(`[${attributeName}]`)
    )?.attributes.getNamedItem(attributeName)?.value;

    if (value == null || isNaN(parseInt(value))) {
        return undefined;
    }

    return parseInt(value);
};

const getIndexElements = (index?: number): HTMLDivElement[] => {
    const selector =
        index == null
            ? // Since '0' is falsy, we need to explicitly include it in the "find all" query
              `[${DataAttributes.index}],[${DataAttributes.index}='0']`
            : `[${DataAttributes.index}='${index}']`;
    return document.querySelectorAll(selector) as any as HTMLDivElement[];
};

const handleStop = debounce(() => {
    index = -1;
    removeStyles(getIndexElements());
}, 0);

const registerIndexStyleMutation = () => {
    Tone.Transport.on("stop", handleStop);

    Tone.Transport.scheduleRepeat((time: number) => {
        Tone.Draw.schedule(() => {
            index++;

            const endIndex = getAttributeValue(DataAttributes.endIndex);
            const startIndex = getAttributeValue(DataAttributes.startIndex);
            const stepCount = getAttributeValue(DataAttributes.stepCount)!;

            const adjustedIndex = clampIndexToRange({
                index,
                endIndex: endIndex ?? stepCount - 1,
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
