import { EditableParagraph } from "components/editable-paragraph";
import { TrackCardProps } from "components/tracks/track-card/track-card";
import { TrackSectionList } from "components/tracks/track-section-list";
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
import { List } from "immutable";
import { Reactronica } from "lib/reactronica";
import { useCallback, useMemo } from "react";
import { isNotNilOrEmpty } from "utils/core-utils";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useGetInstrument } from "utils/hooks/domain/instruments/use-get-instrument";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import {
    toSequencerStepTypes,
    toInstrumentStepTypes,
} from "utils/track-section-step-utils";

interface PlayingTrackCardProps extends TrackCardProps {}

const iconMarginRight = minorScale(2);
const width = majorScale(21);

const PlayingTrackCard: React.FC<PlayingTrackCardProps> = (
    props: PlayingTrackCardProps
) => {
    const { onStepPlay, track } = props;
    const { id, name, mute, solo, instrument_id, index } = track;
    const { colors } = useTheme();
    const { state } = useWorkstationState();
    const { state: trackSections, update: updateTrackSection } =
        useTrackSectionsState({ trackId: id });
    const { resultObject: files } = useListFiles();
    const { update, state: tracks } = useTracksState();
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

    const samples = useMemo(
        () =>
            track.isSequencer()
                ? toSequencerMap(files)
                : toInstrumentMap(instrumentFile),
        [files, instrumentFile, track]
    );
    const steps = useMemo(
        () =>
            track.isSequencer()
                ? toSequencerStepTypes(
                      trackSections,
                      state.trackSectionSteps,
                      files ?? List()
                  )
                : toInstrumentStepTypes(
                      trackSections,
                      state.trackSectionSteps,
                      instrument
                  ),
        [files, instrument, state.trackSectionSteps, track, trackSections]
    );

    return (
        <Pane
            marginBottom={
                index === tracks.count() - 1 ? undefined : majorScale(1)
            }
            marginTop={index === 0 ? undefined : majorScale(1)}>
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
                    <Reactronica.Track
                        mute={mute}
                        onStepPlay={onStepPlay}
                        solo={solo}
                        steps={steps}
                        subdivision="8n">
                        {instrument != null && (
                            <Reactronica.Instrument
                                options={{
                                    curve: instrument.curve,
                                    release: instrument.release,
                                }}
                                samples={samples}
                                type="sampler"
                            />
                        )}
                        {instrument == null && (
                            <Reactronica.Instrument
                                samples={samples}
                                type="sampler"
                            />
                        )}
                    </Reactronica.Track>
                </Card>
                <Pane
                    border={`2px dashed transparent`}
                    borderRadius={minorScale(1)}
                    display="flex"
                    flexDirection="row"
                    margin={-2}>
                    <TrackSectionList
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
