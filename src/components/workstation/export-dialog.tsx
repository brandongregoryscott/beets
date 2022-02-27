import { Dialog, DialogProps } from "components/dialog";
import {
    Button,
    ExportIcon,
    Text,
    majorScale,
    Paragraph,
    RecordIcon,
    Spinner,
    Pane,
    TextInput,
    Label,
    minorScale,
} from "evergreen-ui";
import { List } from "immutable";
import React, { useCallback, useMemo, useState } from "react";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { useBoolean } from "utils/hooks/use-boolean";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import * as Tone from "tone";
import { ProjectRecord } from "models/project-record";
import { useTheme } from "utils/hooks/use-theme";
import { MimeType } from "enums/mime-type";
import { enumToSelectMenuItems } from "utils/select-menu-utils";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { getExtension } from "utils/mime-type-utils";
import slugify from "slugify";
import { unixTime } from "utils/core-utils";
import { useInput } from "utils/hooks/use-input";
import { isEmpty } from "lodash";

interface ExportDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const options: Array<SelectMenuItem<MimeType>> = enumToSelectMenuItems(
    MimeType
).map((item) => {
    const mimeType = item.value as MimeType;
    return { ...item, label: getExtension(mimeType)! };
}) as Array<SelectMenuItem<MimeType>>;

const title = "Export as Audio";

const ExportDialog: React.FC<ExportDialogProps> = (
    props: ExportDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const { colors } = useTheme();
    const { resultObject: files = List(), isLoading: isLoadingFiles } =
        useListFiles();
    const {
        resultObject: instruments = List(),
        isLoading: isLoadingInstruments,
    } = useListInstruments({ files });
    const { state } = useWorkstationState();
    const {
        value: isRecording,
        setTrue: startRecording,
        setFalse: stopRecording,
    } = useBoolean();

    const { value: fileName, ...inputProps } = useInput({
        initialValue: getDefaultFileName(state.project),
        isRequired: true,
    });
    const [mimeType, setMimeType] = useState<MimeType>(MimeType.WAV);
    const [blob, setBlob] = useState<Blob>();
    const handleRecordingComplete = useCallback(
        (file: Blob) => {
            setBlob(file);
            stopRecording();
        },
        [stopRecording]
    );

    const { isLoading: isLoadingSamples } = useToneAudio({
        lengthInMs: state.getLengthInMs(),
        onRecordingComplete: handleRecordingComplete,
        mimeType,
        isRecording,
        files,
        instruments,
        tracks: state.tracks,
        trackSections: state.trackSections,
        trackSectionSteps: state.trackSectionSteps,
    });

    const isLoading =
        isLoadingFiles || isLoadingInstruments || isLoadingSamples;

    const handleExportClick = useCallback(async () => {
        // Ensure AudioContext is started
        await Tone.start();
        startRecording();
    }, [startRecording]);

    const handleClose = useCallback(() => {
        stopRecording();
        onCloseComplete?.();
    }, [onCloseComplete, stopRecording]);

    const handleSelect = useCallback(
        (item: SelectMenuItem<MimeType>) => setMimeType(item.value),
        []
    );

    const fullFileName = useMemo(() => {
        const extension = getExtension(mimeType)!;
        if (isEmpty(fileName)) {
            return `${getDefaultFileName(state.project)}${extension}`;
        }

        return `${fileName}${extension}`;
    }, [fileName, mimeType, state.project]);
    const hasFile = blob != null;

    return (
        <Dialog
            confirmLabel="Close"
            hasCancel={false}
            isShown={isShown}
            onCloseComplete={handleClose}
            shouldCloseOnOverlayClick={false}
            title={title}>
            {isLoading && <Spinner />}
            {!isLoading && (
                <React.Fragment>
                    <Paragraph marginBottom={majorScale(2)}>
                        To export the project as an audio file, click the button
                        below. Recording happens in real-time, and you'll be
                        able to download the file once complete.
                    </Paragraph>
                    <Pane
                        display="flex"
                        flexDirection="row"
                        marginBottom={majorScale(2)}>
                        <Pane
                            display="flex"
                            flexDirection="column"
                            marginRight={majorScale(1)}
                            width="88%">
                            <Label marginBottom={minorScale(1)}>Name</Label>
                            <TextInput
                                {...inputProps}
                                value={fileName}
                                width="100%"
                            />
                        </Pane>
                        <Pane display="flex" flexDirection="column" width="12%">
                            <Label marginBottom={minorScale(1)}>Type</Label>
                            <SelectMenu
                                calculateHeight={true}
                                closeOnSelect={true}
                                hasFilter={false}
                                isMultiSelect={false}
                                onSelect={handleSelect}
                                options={options}
                                title="Type"
                                width={majorScale(16)}>
                                <Button disabled={hasFile || isRecording}>
                                    {getExtension(mimeType)}
                                </Button>
                            </SelectMenu>
                        </Pane>
                    </Pane>
                    <Button
                        allowUnsafeHref={true}
                        appearance={hasFile ? "primary" : "default"}
                        download={fullFileName}
                        href={hasFile ? URL.createObjectURL(blob) : undefined}
                        iconBefore={
                            hasFile ? (
                                ExportIcon
                            ) : (
                                <RecordIcon
                                    color={
                                        isRecording ? colors.red600 : undefined
                                    }
                                />
                            )
                        }
                        is="a"
                        isLoading={isRecording}
                        onClick={hasFile ? undefined : handleExportClick}
                        width="100%">
                        {!hasFile && !isRecording && "Export"}
                        {isRecording && (
                            <Text color={colors.red600}>Recording...</Text>
                        )}
                        {hasFile && !isRecording && "Download file"}
                    </Button>
                </React.Fragment>
            )}
        </Dialog>
    );
};

const getDefaultFileName = (project: ProjectRecord): string =>
    slugify(`${project.name} ${project.bpm} BPM ${unixTime()}`);

export { ExportDialog };
