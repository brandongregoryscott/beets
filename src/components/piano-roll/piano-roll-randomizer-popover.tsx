import { IconButton } from "components/icon-button";
import type { PianoRollRandomizerProps } from "components/piano-roll/piano-roll-randomizer";
import { PianoRollRandomizer } from "components/piano-roll/piano-roll-randomizer";
import type { BoxProps } from "evergreen-ui";
import { CogIcon, Group, Popover, RandomIcon } from "evergreen-ui";
import type { FileRecord } from "models/file-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { List } from "immutable";
import { useCallback } from "react";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { getRandomSteps } from "utils/track-section-step-utils";
import { ConfirmButton } from "components/confirm-button";

interface PianoRollRandomizerPopoverProps
    extends Omit<BoxProps<"div">, "onChange" | "value">,
        Pick<
            PianoRollRandomizerProps,
            "onSettingsChange" | "settings" | "stepCount" | "trackSectionSteps"
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
        trackSectionSteps,
        ...boxProps
    } = props;
    const fileId = file?.id;
    const { id: trackSectionId } = trackSection;

    const handleRandomClick = useCallback(() => {
        const steps = getRandomSteps(settings, trackSectionId, fileId);
        onChange(steps);
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
                        trackSectionSteps={trackSectionSteps}
                    />
                )}
                shouldCloseOnExternalClick={false}>
                <IconButton icon={CogIcon} />
            </Popover>
            <ConfirmButton
                clearConfirmationAfterMs={5000}
                icon={RandomIcon}
                intent="default"
                is={IconButton}
                onConfirm={handleRandomClick}
            />
        </Group>
    );
};

export { PianoRollRandomizerPopover };
