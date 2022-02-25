import * as Tone from "tone";
import { difference } from "lodash";

let index: number = -1;

const registerIndexStyleMutation = () => {
    Tone.Transport.on("stop", () => {
        index = -1;
    });

    Tone.Transport.scheduleRepeat((time: number) => {
        Tone.Draw.schedule(() => {
            index++;

            const matchingElements = document.querySelectorAll(
                `[data-index='${index}']`
            );

            matchingElements.forEach((element) => {
                (element as HTMLDivElement).style.transform =
                    "translateY(-2px)";
            });

            const nonMatchingElements = difference(
                document.querySelectorAll("[data-index]"),
                matchingElements
            );

            nonMatchingElements.forEach((element) => {
                (element as HTMLDivElement).style.transform = "";
            });
        }, time);
    }, "8n");
};

export { registerIndexStyleMutation };
