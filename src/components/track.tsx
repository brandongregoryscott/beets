import { EditableParagraph } from "components/editable-paragraph";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    Card,
    DeleteIcon,
    HeatGridIcon,
    IconButton,
    majorScale,
    minorScale,
    MusicIcon,
    Pane,
    PropertiesIcon,
    PropertyIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import { Track as TrackInterface } from "interfaces/track";
import { FileRecord } from "models/file-record";
import React, { useMemo, useState } from "react";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { List } from "immutable";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { initializeList } from "utils/core-utils";
import { Tooltip } from "components/tooltip";

interface TrackProps extends TrackInterface {
    index: number;
}

const iconMarginRight = minorScale(2);

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { id, name, mute, solo, files: sampleFiles } = props;
    const { addFile, remove, removeFile, setName, toggleMute, toggleSolo } =
        useTrackAtom(id);
    const {
        value: sequencerDialogOpen,
        setTrue: handleOpenSequencerDialog,
        setFalse: handleCloseSequencerDialog,
    } = useBoolean(false);
    const { resultObject: files } = useListFiles();
    const [sequencerValue, setSequencerValue] = useState<
        List<List<FileRecord>>
    >(initializeList(16, List()));
    const options: Array<SelectMenuItem<FileRecord>> = useMemo(
        () => FileRecord.toSelectMenuItems(files),
        [files]
    );

    const handleFileDeselect = (option: SelectMenuItem<FileRecord>) =>
        removeFile(option.value);

    const handleFileSelect = (option: SelectMenuItem<FileRecord>) =>
        addFile(option.value);

    return (
        <Card
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            background="gray200"
            width={majorScale(26)}
            marginY={majorScale(1)}
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
                <SelectMenu
                    isMultiSelect={true}
                    options={options}
                    onDeselect={handleFileDeselect}
                    onSelect={handleFileSelect}
                    selected={sampleFiles}
                    title="Select samples">
                    <Tooltip content="Track Samples">
                        <IconButton
                            icon={MusicIcon}
                            marginRight={iconMarginRight}
                        />
                    </Tooltip>
                </SelectMenu>
                <Tooltip content="Sequencer">
                    <IconButton
                        icon={HeatGridIcon}
                        marginRight={iconMarginRight}
                        onClick={handleOpenSequencerDialog}
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
            {sequencerDialogOpen && (
                <SequencerDialog
                    onChange={setSequencerValue}
                    onClose={handleCloseSequencerDialog}
                    sampleOptions={FileRecord.toSelectMenuItems(
                        sampleFiles.toArray()
                    )}
                    trackId={id}
                    value={sequencerValue}
                />
            )}
            {/* <ReactronicaTrack
                steps={stepsToStepNoteTypes(steps)}
                subdivision="4n"
                onStepPlay={(stepNotes, index) => {
                    console.log(`playing ${index}`, stepNotes);
                }}>
                <Instrument samples={sampleObject} type="sampler" />
            </ReactronicaTrack> */}
        </Card>
    );
};

export { Track };
export type { TrackProps };
