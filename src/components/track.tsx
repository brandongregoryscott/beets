import { EditableParagraph } from "components/editable-paragraph";
import {
    Card,
    DeleteIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    PlusIcon,
    PropertiesIcon,
    PropertyIcon,
    Tooltip,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import React, { SetStateAction, useCallback } from "react";
import { Track as ReactronicaTrack, Instrument } from "reactronica";
import { TrackRecord } from "models/track-record";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { TrackSection } from "components/track-section";
import { useTheme } from "utils/hooks/use-theme";
import { TrackSectionRecord } from "models/track-section-record";

interface TrackProps {
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { track } = props;
    const { id, name, mute, solo } = track;
    const { updateTrack, removeTrack } = useWorkstationState();

    const theme = useTheme();
    const trackSections = track.getTrackSections();

    const setName = useCallback(
        (value: string) =>
            updateTrack(id, (prev: TrackRecord) => prev.merge({ name: value })),
        [id, updateTrack]
    );

    const toggleMute = useCallback(
        () =>
            updateTrack(id, (prev: TrackRecord) =>
                prev.merge({ mute: !prev.mute })
            ),
        [id, updateTrack]
    );

    const toggleSolo = useCallback(
        () =>
            updateTrack(id, (prev: TrackRecord) =>
                prev.merge({ solo: !prev.solo })
            ),
        [id, updateTrack]
    );

    const addTrackSection = useCallback(
        () => updateTrack(id, (prev: TrackRecord) => prev.addTrackSection()),
        [id, updateTrack]
    );

    const updateTrackSection = useCallback(
        (trackSectionId: string, update: SetStateAction<TrackSectionRecord>) =>
            updateTrack(id, (prev: TrackRecord) =>
                prev.updateTrackSection(trackSectionId, update)
            ),
        [id, updateTrack]
    );

    const remove = useCallback(() => removeTrack(track), [removeTrack, track]);

    return (
        <Pane display="flex" flexDirection="row" alignItems="center">
            <Card
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                background={theme.colors.gray200}
                width={majorScale(21)}
                marginY={majorScale(1)}
                marginRight={majorScale(1)}
                padding={majorScale(1)}>
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
                    <Tooltip content="Remove Track">
                        <IconButton
                            icon={DeleteIcon}
                            intent="danger"
                            marginRight={iconMarginRight}
                            onClick={remove}
                        />
                    </Tooltip>
                </Pane>
                <ReactronicaTrack
                    mute={mute}
                    solo={solo}
                    /** TODO: Flatten TrackSectionSteps here */
                    steps={undefined}>
                    <Instrument
                        onLoad={undefined}
                        samples={undefined}
                        type="sampler"
                    />
                </ReactronicaTrack>
            </Card>
            {trackSections.map((trackSection) => (
                <TrackSection
                    trackSection={trackSection}
                    onChange={updateTrackSection}
                />
            ))}
            <Tooltip content="Add Section">
                <IconButton
                    icon={PlusIcon}
                    marginLeft={majorScale(1)}
                    onClick={addTrackSection}
                />
            </Tooltip>
        </Pane>
    );
};

export { Track };
export type { TrackProps };
