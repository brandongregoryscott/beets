import { useAtom } from "jotai";
import { SampleSelectionAtom } from "utils/atoms/sample-selection-atom";
import { List, Map } from "immutable";
import { FileRecord } from "models/file-record";
import { useCallback, useEffect, useState } from "react";
import { TrackRecord } from "models/track-record";

interface UseSampleSelectionOptions {
    files: List<FileRecord>;
    track: TrackRecord;
}

interface UseSampleSelectionResult {
    onClear: () => void;
    onDeselect: (file: FileRecord) => void;
    onSelect: (file: FileRecord) => void;
    selected: List<FileRecord>;
}

const useSampleSelection = (
    options: UseSampleSelectionOptions
): UseSampleSelectionResult => {
    const { files, track } = options;
    const [sampleSelection, setSampleSelection] = useAtom(SampleSelectionAtom);
    const [selected, setSelected] = useState<List<FileRecord>>(
        getFilesFromSelectionMap(sampleSelection, track, files)
    );

    const onDeselect = useCallback(
        (file: FileRecord) =>
            setSelected((prev) =>
                prev.includes(file) ? prev.remove(prev.indexOf(file)) : prev
            ),
        []
    );

    const onSelect = useCallback(
        (file: FileRecord) =>
            setSelected((prev) =>
                prev.includes(file) ? prev : prev.push(file)
            ),
        []
    );

    const onClear = useCallback(() => {
        setSelected(List());
    }, []);

    useEffect(() => {
        setSampleSelection((prev) =>
            prev.set(
                track.id,
                selected.map((file) => file.id)
            )
        );
    }, [selected, setSampleSelection, track.id]);

    return { selected, onDeselect, onSelect, onClear };
};

const getFilesFromSelectionMap = (
    sampleSelection: Map<string, List<string>>,
    track: TrackRecord,
    files: List<FileRecord>
): List<FileRecord> => {
    const fileIds = sampleSelection.get(track.id);

    return files.filter((file) => fileIds?.includes(file.id)) ?? List();
};

export { useSampleSelection };
