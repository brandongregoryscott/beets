import type { BucketName } from "enums/bucket-name";
import type { FileRejection } from "evergreen-ui";
import {
    MimeType,
    // eslint-disable-next-line no-restricted-imports
    FileUploader as EvergreenFileUploader,
    rebaseFiles,
    Alert,
    FileRejectionReason,
    majorScale,
    FileCard,
    getMaxFilesMessage,
    getFileSizeMessage,
    getAcceptedTypesMessage,
    Pane,
    Button,
} from "evergreen-ui";
import { isEmpty } from "lodash";
import pluralize from "pluralize";
import React, { useCallback, useMemo, useState } from "react";
import { useCreateFile } from "hooks/domain/files/use-create-file";

interface FileUploaderProps {
    bucketName: BucketName;
}

const acceptedMimeTypes = [MimeType.mp3, MimeType.wav];
const maxFiles = 10;
const maxSizeInBytes = 10 * 1024 ** 2; // 10 MB
const width = majorScale(40);

const FileUploader: React.FC<FileUploaderProps> = (
    props: FileUploaderProps
) => {
    const { bucketName } = props;
    const { isLoading, mutateAsync: uploadFile } = useCreateFile({
        bucketName,
    });
    const [files, setFiles] = useState<File[]>([]);
    const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
    const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
    const values = useMemo(
        () => joinFiles(files, fileRejections),
        [fileRejections, files]
    );
    const handleRemove = useCallback(
        (file: File) => {
            const updatedFiles = files.filter(
                (existingFile) => existingFile !== file
            );
            const updatedFileRejections = fileRejections.filter(
                (fileRejection) => fileRejection.file !== file
            );

            // Call rebaseFiles to ensure accepted + rejected files are in sync (some might have previously been
            // rejected for being over the file count limit, but might be under the limit now!)
            const { accepted, rejected } = rebaseFiles(
                joinFiles(updatedFiles, updatedFileRejections),
                { acceptedMimeTypes, maxFiles, maxSizeInBytes }
            );

            setFiles(accepted);
            setFileRejections(rejected);
        },
        [fileRejections, files]
    );

    const handleUploaded = useCallback((file: File) => {
        setFiles((prev) =>
            prev.filter((existingFile) => existingFile !== file)
        );
        setUploadingFiles((prev) =>
            prev.filter((uploadingFile) => uploadingFile !== file)
        );
    }, []);

    const handleUpload = useCallback(async () => {
        if (!isEmpty(fileRejections)) {
            return;
        }

        setUploadingFiles(files);

        await Promise.all(
            files.map(async (file: File) => {
                await uploadFile(file);
                handleUploaded(file);
            })
        );
    }, [fileRejections, files, handleUploaded, uploadFile]);

    const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
    const fileCountError = `${getMaxFilesMessage(
        maxFiles
    )} Please remove ${pluralize("file", fileCountOverLimit, true)}.`;

    const description = [
        getMaxFilesMessage(maxFiles),
        getFileSizeMessage(maxSizeInBytes),
        getAcceptedTypesMessage(acceptedMimeTypes),
    ].join(" ");
    return (
        <Pane marginBottom={majorScale(2)} maxWidth={width} width={width}>
            <EvergreenFileUploader
                acceptedMimeTypes={acceptedMimeTypes}
                description={description}
                disabled={files.length + fileRejections.length >= maxFiles}
                label="Upload Files"
                maxFiles={maxFiles}
                maxSizeInBytes={maxSizeInBytes}
                onAccepted={setFiles}
                onRejected={setFileRejections}
                renderFile={(file, index) => {
                    const { name, size, type } = file;
                    const renderFileCountError =
                        index === 0 && fileCountOverLimit > 0;

                    // We're displaying an <Alert /> component to aggregate files rejected for being over the maxFiles limit,
                    // so don't show those errors individually on each <FileCard />
                    const fileRejection = fileRejections.find(
                        (fileRejection) =>
                            fileRejection.file === file &&
                            fileRejection.reason !==
                                FileRejectionReason.OverFileLimit
                    );
                    const { message } = fileRejection ?? {};

                    return (
                        <React.Fragment key={`${file.name}-${index}`}>
                            {renderFileCountError && (
                                <Alert
                                    intent="danger"
                                    marginBottom={majorScale(2)}
                                    title={fileCountError}
                                />
                            )}
                            <FileCard
                                isInvalid={fileRejection != null}
                                isLoading={uploadingFiles.includes(file)}
                                name={name}
                                onRemove={() => handleRemove(file)}
                                sizeInBytes={size}
                                type={type}
                                validationMessage={message}
                            />
                        </React.Fragment>
                    );
                }}
                values={values}
            />
            <Button
                appearance="primary"
                disabled={isEmpty(files) || !isEmpty(fileRejections)}
                isLoading={isLoading || !isEmpty(uploadingFiles)}
                onClick={handleUpload}
                width="100%">
                Upload
            </Button>
        </Pane>
    );
};

const joinFiles = (files: File[], fileRejections: FileRejection[]): File[] => [
    ...files,
    ...fileRejections.map((fileRejection) => fileRejection.file),
];

export { FileUploader };
