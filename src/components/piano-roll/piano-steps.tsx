import { PianoKey } from "components/piano-roll/piano-key";
import { PianoStep } from "components/piano-roll/piano-step";
import { MidiNotes } from "constants/midi-notes";
import { Pane } from "evergreen-ui";
import _ from "lodash";
import React, { useMemo } from "react";
import { randomInt } from "utils/core-utils";

interface PianoStepsProps {
    stepCount: number;
}

const PianoSteps: React.FC<PianoStepsProps> = (props: PianoStepsProps) => {
    const { stepCount } = props;
    const innerContent = useMemo(
        () =>
            MidiNotes.map((note) => (
                <Pane display="flex" flexDirection="row" flexGrow={1}>
                    <PianoKey key={note} note={note} />
                    {_.range(0, stepCount).map((index: number) => (
                        <PianoStep
                            index={index}
                            isSelected={Boolean(randomInt(0, 1))}
                            note={note}
                        />
                    ))}
                </Pane>
            )),
        [stepCount]
    );
    return <React.Fragment>{innerContent}</React.Fragment>;
};

export { PianoSteps };
