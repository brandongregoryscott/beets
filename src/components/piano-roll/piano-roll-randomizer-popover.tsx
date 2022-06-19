import { IconButton } from "components/icon-button";
import {
    PianoRollRandomizer,
    PianoRollRandomizerProps,
} from "components/piano-roll/piano-roll-randomizer";
import {
    BoxProps,
    Button,
    CogIcon,
    Group,
    Popover,
    RandomIcon,
} from "evergreen-ui";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { List } from "immutable";
import { isNotNilOrEmpty } from "utils/core-utils";
import { useCallback } from "react";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { getRandomSteps } from "utils/track-section-step-utils";
import { ConfirmButton } from "components/confirm-button";

interface PianoRollRandomizerPopoverProps
    extends Omit<BoxProps<"div">, "onChange" | "value">,
        Pick<
            PianoRollRandomizerProps,
            "onSettingsChange" | "settings" | "stepCount"
        > {
    file?: FileRecord;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    trackSection: TrackSectionRecord;
}

const PianoRollRandomizerPopover: React.FC<PianoRollRandomizerPopoverProps> = (
    props: PianoRollRandomizerPopoverProps
) => {
    const {
        file,
        trackSection,
        settings,
        onChange,
        onSettingsChange,
        stepCount,
        ...boxProps
    } = props;
    const fileId = file?.id;
    const { id: trackSectionId } = trackSection;

    const handleRandomClick = useCallback(() => {
        const steps = getRandomSteps(settings, trackSectionId, fileId);
        onChange(steps.filter(isNotNilOrEmpty));
    }, [fileId, onChange, settings, trackSectionId]);

    return (
        <Group {...boxProps}>
            <Popover
                content={({ close }) => (
                    <PianoRollRandomizer
                        close={close}
                        onSettingsChange={onSettingsChange}
                        settings={settings}
                        stepCount={stepCount}
                    />
                )}>
                <IconButton icon={CogIcon} />
            </Popover>
            <ConfirmButton
                clearConfirmationAfterMs={5000}
                iconBefore={RandomIcon}
                onConfirm={handleRandomClick}>
                Randomize
            </ConfirmButton>
        </Group>
    );
};

export { PianoRollRandomizerPopover };
