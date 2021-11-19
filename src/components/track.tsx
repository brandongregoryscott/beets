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
import React, { useCallback } from "react";
import { Track as ReactronicaTrack, Instrument } from "reactronica";
import { TrackRecord } from "models/track-record";
import { TrackSection } from "components/track-section";
import { useTheme } from "utils/hooks/use-theme";
import { useTracksState } from "utils/hooks/use-workstation-tracks-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";

interface TrackProps {
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { track } = props;
    const { id, name, mute, solo } = track;
    const { update, remove } = useTracksState();
    const {
        add: addTrackSection,
        state: trackSections,
        update: updateTrackSection,
    } = useTrackSectionsState({ trackId: id });
    const theme = useTheme();

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

    const handleAddTrackSection = useCallback(
        () => addTrackSection(),
        [addTrackSection]
    );

    const handleRemove = useCallback(() => remove(track), [remove, track]);

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
                            onClick={handleRemove}
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
            {trackSections?.map((trackSection, index) => (
                <TrackSection
                    isFirst={index === 0}
                    isLast={index === trackSections.count() - 1}
                    key={trackSection.id}
                    trackSection={trackSection}
                    onChange={updateTrackSection}
                />
            ))}
            <Tooltip content="Add Section">
                <IconButton
                    icon={PlusIcon}
                    marginLeft={majorScale(1)}
                    onClick={handleAddTrackSection}
                />
            </Tooltip>
        </Pane>
    );
};

export { Track };
export type { TrackProps };
