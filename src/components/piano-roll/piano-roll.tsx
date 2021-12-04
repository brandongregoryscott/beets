import { PianoSteps } from "components/piano-roll/piano-steps";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import { majorScale, Pane } from "evergreen-ui";
import { List } from "immutable";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React from "react";

interface PianoRollProps {
    onChange: (value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const PianoRoll: React.FC<PianoRollProps> = (props: PianoRollProps) => {
    const {
        onChange,
        onStepCountChange,
        stepCount,
        trackSection,
        trackSectionSteps,
    } = props;
    return (
        <React.Fragment>
            <Pane marginBottom={majorScale(1)}>
                <StepCountSelectMenu
                    onChange={onStepCountChange}
                    stepCount={stepCount}
                />
            </Pane>
            <Pane
                display="flex"
                flexDirection="column"
                width="100%"
                flexGrow={1}>
                <PianoSteps
                    onChange={onChange}
                    stepCount={stepCount}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                />
            </Pane>
        </React.Fragment>
    );
};

export { PianoRoll };
