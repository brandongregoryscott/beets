import { Elevation, majorScale, minorScale, Pane } from "evergreen-ui";
import { List } from "immutable";
import { SetStateAction } from "jotai";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { sortBy } from "utils/collection-utils";
import { getBorderXProps } from "utils/core-utils";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionStepsState } from "utils/hooks/use-track-section-steps-state";
import { getStepColor } from "utils/theme-utils";
import { useClipboardState } from "utils/hooks/use-clipboard-state";
import { InstrumentRecord } from "models/instrument-record";

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

const stepHeight = majorScale(2);
const stepWidth = majorScale(2);

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

    const { state: trackSectionSteps } = useTrackSectionStepsState({
        trackSectionId: trackSection.id,
    });
    const { colors } = useTheme();

    const groupedTrackSectionSteps = trackSectionSteps.groupBy((e) => e.index);

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
            <Pane display="flex" flexDirection="row">
                {_.range(0, trackSection.step_count).map((index: number) => {
                    const steps =
                        groupedTrackSectionSteps.get(index)?.toList() ?? List();
                    const stepsSortedByFileId = sortBy(
                        steps,
                        (trackSectionStep) => trackSectionStep.file_id
                    );

                    const isPlaying = false;
                    // const isPlaying =
                    //     index + stepCountOffset === reactronicaState?.index;

                    const activeProps = isPlaying
                        ? {
                              elevation: 4 as Elevation,
                              transform: "translateY(-2px)",
                          }
                        : {};

                    return (
                        <Pane
                            {...activeProps}
                            display="flex"
                            flexDirection="column"
                            key={`track-section-${trackSection.id}-column-${index}`}
                            minHeight={stepHeight}
                            minWidth={stepWidth}
                            width={stepWidth}>
                            {_.range(0, 4).map((row: number) => {
                                const backgroundColor = getStepColor(
                                    stepsSortedByFileId.get(row)?.file_id
                                );
                                return (
                                    <Pane
                                        backgroundColor={backgroundColor}
                                        height={stepHeight}
                                        key={`track-section-${trackSection.id}-row-${row}`}
                                        minHeight={stepHeight}
                                        minWidth={stepWidth}
                                        width={stepWidth}
                                    />
                                );
                            })}
                        </Pane>
                    );
                })}
            </Pane>
        </Pane>
    );
};

export { PlayingTrackSectionCard };
