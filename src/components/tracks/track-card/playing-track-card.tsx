import { EditableParagraph } from "components/editable-paragraph";
import type { TrackCardProps } from "components/tracks/track-card/track-card";
import { PlayingTrackSectionList } from "components/tracks/track-section-list/playing-track-section-list";
import { TrackTime } from "components/tracks/track-time/track-time";
import {
    Card,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    PropertiesIcon,
    PropertyIcon,
    Tooltip,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import { useCallback, useMemo } from "react";
import { isNotNilOrEmpty } from "utils/core-utils";
import { getFileById } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useGetInstrument } from "utils/hooks/domain/instruments/use-get-instrument";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface PlayingTrackCardProps extends TrackCardProps {}

const iconMarginRight = minorScale(2);
const width = majorScale(21);

const PlayingTrackCard: React.FC<PlayingTrackCardProps> = (
    props: PlayingTrackCardProps
) => {
    const { track } = props;
    const { id, name, mute, solo, instrument_id, index } = track;
    const { colors } = useTheme();
    const { state: workstationState } = useWorkstationState();
    const { state: trackSections, update: updateTrackSection } =
        useTrackSectionsState({ trackId: id });
    const { resultObject: files } = useListFiles();
    const { update } = useTracksState();
    const { resultObject: instrument } = useGetInstrument({
        id: instrument_id!,
        enabled: isNotNilOrEmpty(instrument_id),
        files,
    });
    const instrumentFile = useMemo(
        () => getFileById(instrument?.file_id, files),
        [files, instrument]
    );

    const setName = useCallback(
        (value: string) => update(id, (prev) => prev.merge({ name: value })),
        [id, update]
    );

    const toggleMute = useCallback(
        () => update(id, (prev) => prev.merge({ mute: !prev.mute })),
        [id, update]
    );

    const toggleSolo = useCallback(
        () => update(id, (prev) => prev.merge({ solo: !prev.solo })),
        [id, update]
    );

    return (
        <Pane marginY={majorScale(2)}>
            {index === 0 && (
                <Pane
                    marginBottom={majorScale(1)}
                    marginLeft={width + majorScale(3)}
                    marginTop={-majorScale(1)}>
                    <TrackTime stepCount={workstationState.getStepCount()} />
                </Pane>
            )}
            <Pane alignItems="center" display="flex" flexDirection="row">
                <Card
                    alignItems="flex-start"
                    background={colors.gray200}
                    display="flex"
                    flexDirection="column"
                    marginRight={majorScale(2)}
                    padding={majorScale(1)}
                    width={width}>
                    <EditableParagraph onChange={setName} value={name} />
                    <Pane display="flex" flexDirection="row">
                        <Tooltip content="Mute Track">
                            <IconButton
                                icon={mute ? VolumeOffIcon : VolumeUpIcon}
                                marginRight={iconMarginRight}
                                onClick={toggleMute}
                            />
                        </Tooltip>
                        <Tooltip content="Solo Track">
                            <IconButton
                                icon={solo ? PropertyIcon : PropertiesIcon}
                                marginRight={iconMarginRight}
                                onClick={toggleSolo}
                            />
                        </Tooltip>
                    </Pane>
                </Card>
                <Pane
                    borderRadius={minorScale(1)}
                    display="flex"
                    flexDirection="row">
                    <PlayingTrackSectionList
                        instrument={instrument}
                        instrumentFile={instrumentFile}
                        onChange={updateTrackSection}
                        track={track}
                        trackSections={trackSections}
                    />
                </Pane>
            </Pane>
        </Pane>
    );
};

export { PlayingTrackCard };
