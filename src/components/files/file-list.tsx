import { BucketName } from "enums/bucket-name";
import { SortOrder } from "enums/sort-order";
import { useListStorageProviderFiles } from "utils/hooks/supabase/use-list-storage-provider-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { groupBy } from "utils/collection-utils";
import { useListFiles } from "generated/hooks/domain/files/use-list-files";
import { FileCard } from "components/files/file-card";
import { Flex } from "components/flex";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";
import { majorScale, Spinner, TextInputField } from "evergreen-ui";
import React from "react";
import { useInput } from "utils/hooks/use-input";
import { isEmpty } from "lodash";

interface FileListProps {
    bucketName: BucketName;
}

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { bucketName } = props;
    const { globalState } = useGlobalState();
    const {
        resultObject: storageProviderFiles,
        isLoading: isLoadingStorageProviderFiles,
    } = useListStorageProviderFiles({
        bucketName,
        path: globalState.userId(),
        sortBy: {
            column: "created_at",
            order: SortOrder.DESC,
        },
    });
    const { value: nameFilter, ...textInputProps } = useInput();
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles({
        filter: (query) => {
            if (isEmpty(nameFilter)) {
                return query;
            }

            return query.ilike("name", `%${nameFilter}%`);
        },
    });
    useTimeoutRender();

    const groupedFiles = groupBy(
        storageProviderFiles,
        files,
        (a, b) => a.id === b.id
    );
    const isLoading = isLoadingFiles || isLoadingStorageProviderFiles;

    return (
        <Flex.Column>
            <TextInputField
                {...textInputProps}
                label="Filter by name"
                value={nameFilter}
                width={majorScale(40)}
            />
            <Flex.Row flexWrap="wrap" width="100%">
                {isLoading && <Spinner />}
                {groupedFiles.map(
                    ({ left: storageProviderFile, right: file }) => (
                        <FileCard
                            file={file}
                            key={file.id}
                            storageProviderFile={storageProviderFile}
                        />
                    )
                )}
            </Flex.Row>
        </Flex.Column>
    );
};

export { FileList };
