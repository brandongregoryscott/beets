import { EditableParagraph } from "components/editable-paragraph";
import { SequencerDialog } from "components/sequencer-dialog";
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
import React, { useEffect, useMemo, useState } from "react";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { Instrument, Track as ReactronicaTrack } from "reactronica";
import { List } from "immutable";
import _ from "lodash";
import { SelectMenu, SelectMenuItem } from "components/select-menu";

interface TrackProps extends TrackInterface {
    index: number;
}

const iconMarginRight = minorScale(2);

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { id, name, mute, solo } = props;
    const { remove, setName, toggleMute, toggleSolo } = useTrackAtom(id);
    const {
        value: sequencerDialogOpen,
        setTrue: handleOpenSequencerDialog,
        setFalse: handleCloseSequencerDialog,
    } = useBoolean(false);
    const { resultObject: files } = useListFiles();
    const [selectedFile, setSelectedFile] = useState<FileRecord | undefined>();
    const [sampleObject, setSampleObject] = useState<
        Record<string, string> | undefined
    >(fileToSampleObject(selectedFile));
    const [steps, setSteps] = useState<List<string | null>>(
        List(_.fill(new Array(16), null))
    );

    const options: Array<SelectMenuItem<FileRecord>> = useMemo(
        () =>
            files?.map((file) => ({
                label: file.name,
                id: file.id,
                value: file,
            })) ?? [],
        [files]
    );

    const handleFileDeselect = (option: SelectMenuItem<FileRecord>) =>
        setSelectedFile(undefined);

    const handleFileSelect = (option: SelectMenuItem<FileRecord>) =>
        setSelectedFile(option.value);

    const handleSequencerChange = (index: number) => {
        if (steps.get(index) == null) {
            setSteps((prev) => prev.set(index, selectedFile?.id ?? null));
            return;
        }

        setSteps((prev) => prev.set(index, null));
    };

    useEffect(() => {
        setSampleObject(fileToSampleObject(selectedFile));
    }, [selectedFile, setSampleObject]);

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
                <IconButton
                    icon={mute ? VolumeOffIcon : VolumeUpIcon}
                    marginRight={iconMarginRight}
                    onClick={toggleMute}
                />
                <IconButton
                    icon={solo ? PropertyIcon : PropertiesIcon}
                    marginRight={iconMarginRight}
                    onClick={toggleSolo}
                />
                <SelectMenu
                    isMultiSelect={true}
                    options={options}
                    onDeselect={handleFileDeselect}
                    onSelect={handleFileSelect}
                    selected={selectedFile}>
                    <IconButton
                        icon={MusicIcon}
                        marginRight={iconMarginRight}
                    />
                </SelectMenu>
                <IconButton
                    icon={HeatGridIcon}
                    marginRight={iconMarginRight}
                    onClick={handleOpenSequencerDialog}
                />
                <IconButton
                    icon={DeleteIcon}
                    intent="danger"
                    marginRight={iconMarginRight}
                    onClick={remove}
                />
            </Pane>
            {sequencerDialogOpen && (
                <SequencerDialog
                    onChange={handleSequencerChange}
                    onClose={handleCloseSequencerDialog}
                    trackId={id}
                    value={steps}
                />
            )}
            <ReactronicaTrack
                steps={stepsToStepNoteTypes(steps)}
                subdivision="4n"
                onStepPlay={(stepNotes, index) => {
                    console.log(`playing ${index}`, stepNotes);
                }}>
                <Instrument samples={sampleObject} type="sampler" />
            </ReactronicaTrack>
        </Card>
    );
};

const fileToSampleObject = (file?: FileRecord) =>
    file == null
        ? undefined
        : {
              C4: file.getPublicUrl()!,
          };

const stepsToStepNoteTypes = (steps: List<string | null>) =>
    steps
        .map((step) => {
            if (step == null) {
                return null;
            }

            return "C4";
        })
        .toArray() as string[];

export { Track };
export type { TrackProps };
