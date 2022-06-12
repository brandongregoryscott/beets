import { BucketName } from "enums/bucket-name";
import { SortOrder } from "enums/sort-order";
import { useListStorageProviderFiles } from "utils/hooks/supabase/use-list-storage-provider-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { groupBy } from "utils/collection-utils";
import { useListFiles } from "generated/hooks/domain/files/use-list-files";
import { FileCard } from "components/files/file-card";
import { Flex } from "components/flex";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";
import { Button, majorScale, Spinner, TextInputField } from "evergreen-ui";
import React, { useCallback, useState } from "react";
import { useInput } from "utils/hooks/use-input";
import { isEmpty } from "lodash";
import { SortOptions } from "interfaces/sort-options";
import { File } from "generated/interfaces/file";
import { SelectMenu, SelectMenuItem } from "components/select-menu/select-menu";
import { formatSortOptionLabel, toSortOptions } from "utils/select-menu-utils";
import { FormField } from "components/forms/form-field";

interface FileListProps {
    bucketName: BucketName;
}

const sortableKeys: Array<keyof File> = [
    "name",
    "created_on",
    "updated_on",
    "size",
];

const options: Array<SelectMenuItem<SortOptions<File>>> =
    toSortOptions(sortableKeys);

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { bucketName } = props;
    const { globalState } = useGlobalState();
    const {
        resultObject: storageProviderFiles,
        isLoading: isLoadingStorageProviderFiles,
    } = useListStorageProviderFiles({
        bucketName,
        path: globalState.userId(),
    });
    const [sortBy, setSortBy] = useState<SortOptions<File>>({
        column: "created_on",
        order: SortOrder.DESC,
    });
    const { value: nameFilter, onChange: handleNameFilterChange } = useInput();
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles({
        filter: (query) => {
            if (isEmpty(nameFilter)) {
                return query;
            }

            return query.ilike("name", `%${nameFilter}%`);
        },
        key: [nameFilter],
        sortBy,
    });
    useTimeoutRender();

    const groupedFiles = groupBy(
        files,
        storageProviderFiles,
        (a, b) => a.id === b.id
    );
    const isLoading = isLoadingFiles || isLoadingStorageProviderFiles;

    const handleSelect = useCallback(
        (option: SelectMenuItem<SortOptions<File>>) => setSortBy(option.value),
        []
    );

    return (
        <Flex.Column>
            <Flex.Row alignContent="center">
                <TextInputField
                    label="Filter by name"
                    marginBottom={majorScale(2)}
                    marginRight={majorScale(2)}
                    onChange={handleNameFilterChange}
                    value={nameFilter}
                    width={majorScale(40)}
                />
                <FormField label="Sort by">
                    <SelectMenu
                        closeOnSelect={true}
                        hasFilter={false}
                        hasTitle={false}
                        isMultiSelect={false}
                        onSelect={handleSelect}
                        options={options}
                        selected={sortBy}
                        width={majorScale(20)}>
                        <Button width={majorScale(16)}>
                            {formatSortOptionLabel(
                                sortBy.column!,
                                sortBy.order!
                            )}
                        </Button>
                    </SelectMenu>
                </FormField>
            </Flex.Row>
            <Flex.Row flexWrap="wrap" width="100%">
                {isLoading && <Spinner />}
                {groupedFiles.map(
                    ({ left: file, right: storageProviderFile }) => (
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
