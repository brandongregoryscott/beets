import { majorScale, minorScale, Pane } from "evergreen-ui";
import type { SetStateAction } from "jotai";
import type { FileRecord } from "models/file-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import { getBorderXProps } from "utils/core-utils";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionStepsState } from "utils/hooks/use-track-section-steps-state";
import { useClipboardState } from "utils/hooks/use-clipboard-state";
import type { InstrumentRecord } from "models/instrument-record";
import { TrackSectionStepGrid } from "components/tracks/track-section-card/track-section-step-grid";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface PlayingTrackSectionCardProps {
    file?: FileRecord;
    instrument?: InstrumentRecord;
    isFirst?: boolean;
    isLast?: boolean;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
    stepCountOffset: number;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
}

const PlayingTrackSectionCard: React.FC<PlayingTrackSectionCardProps> = (
    props: PlayingTrackSectionCardProps
) => {
    const {
        isFirst = false,
        isLast = false,
        stepCountOffset,
        trackSection,
    } = props;

    const borderProps = getBorderXProps({
        isFirst,
        isLast,
        borderRadius: minorScale(1),
    });

    const { isSelected } = useClipboardState();

    const { state: workstationState } = useWorkstationState();
    const stepCount = workstationState.getStepCount();
    const { state: trackSectionSteps } = useTrackSectionStepsState({
        trackSectionId: trackSection.id,
    });
    const { colors } = useTheme();

    const backgroundColor = isSelected(trackSection)
        ? colors.gray400
        : colors.gray200;

    return (
        <Pane
            {...borderProps}
            backgroundColor={backgroundColor}
            display="flex"
            flexDirection="row"
            height={majorScale(10)}
            paddingLeft={isFirst ? majorScale(1) : undefined}
            paddingRight={isLast ? majorScale(1) : undefined}
            paddingY={majorScale(1)}>
            <TrackSectionStepGrid
                stepCount={stepCount}
                stepCountOffset={stepCountOffset}
                trackSection={trackSection}
                trackSectionSteps={trackSectionSteps}
            />
        </Pane>
    );
};

export { PlayingTrackSectionCard };
