import { Dialog, DialogProps } from "components/dialog";
import {
    Alert,
    Button,
    ExportIcon,
    Link,
    Text,
    majorScale,
    Paragraph,
    RecordIcon,
    Spinner,
} from "evergreen-ui";
import { List } from "immutable";
import React, { useCallback, useState } from "react";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { useBoolean } from "utils/hooks/use-boolean";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import * as Tone from "tone";
import { formatNow } from "utils/date-utils";
import { ProjectRecord } from "models/project-record";
import { useTheme } from "utils/hooks/use-theme";

interface ExportDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

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
                    <Alert
                        marginBottom={majorScale(2)}
                        title="The file will be exported as a .webm file">
                        <Text>
                            Use a site like{" "}
                            <Link
                                href="https://cloudconvert.com/webm-converter"
                                target="_blank">
                                CloudConvert
                            </Link>{" "}
                            to convert it to your desired format.
                        </Text>
                    </Alert>
                    <Button
                        allowUnsafeHref={true}
                        appearance={blob == null ? "default" : "primary"}
                        download={getFileName(state.project)}
                        href={
                            blob != null ? URL.createObjectURL(blob) : undefined
                        }
                        iconBefore={
                            blob == null ? (
                                <RecordIcon
                                    color={
                                        isRecording ? colors.red600 : undefined
                                    }
                                />
                            ) : (
                                ExportIcon
                            )
                        }
                        is="a"
                        isLoading={isRecording}
                        onClick={blob == null ? handleExportClick : undefined}
                        width="100%">
                        {blob == null && !isRecording && "Export"}
                        {isRecording && (
                            <Text color={colors.red600}>Recording...</Text>
                        )}
                        {blob != null && !isRecording && "Download file"}
                    </Button>
                </React.Fragment>
            )}
        </Dialog>
    );
};

const getFileName = (project: ProjectRecord): string =>
    `${project.name} ${formatNow()}.webm`;

export { ExportDialog };
