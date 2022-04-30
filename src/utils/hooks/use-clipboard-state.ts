import { toaster } from "evergreen-ui";
import { List } from "immutable";
import { useAtom } from "jotai";
import React, { SetStateAction, useCallback } from "react";
import { ClipboardItem } from "types/clipboard-item";
import { SelectedClipboardStateAtom } from "utils/atoms/clipboard-state-atom";
import {
    intersectionWith,
    rebaseIndexes,
    sortBy,
} from "utils/collection-utils";
import { isEventFromDialog } from "utils/event-utils";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { generateIdMap, remapIds } from "utils/id-utils";

interface UseClipboardStateResult {
    clearSelected: () => void;
    deselectItem: (item: ClipboardItem) => void;
    duplicateSelected: (event?: KeyboardEvent) => void;
    isSelected: (value: ClipboardItem) => boolean;
    onSelect: (
        item: ClipboardItem
    ) => (event: React.MouseEvent<HTMLDivElement>) => void;
    selectItem: (item: ClipboardItem) => void;
    selectedState: List<ClipboardItem>;
    setSelectedState: (update: SetStateAction<List<ClipboardItem>>) => void;
}

const useClipboardState = (): UseClipboardStateResult => {
    const { state, setCurrentState: setCurrentWorkstationState } =
        useWorkstationState();
    const [selectedState, setSelectedState] = useAtom(
        SelectedClipboardStateAtom
    );

    const duplicationMessage =
        selectedState.count() === 1
            ? "Track Section duplicated!"
            : `${selectedState.count()} Track Sections duplicated!`;

    const duplicateSelected = useCallback(
        (event?: KeyboardEvent) => {
            event?.preventDefault();

            if (selectedState.isEmpty()) {
                return;
            }

            const { track_id } = selectedState.first()!;

            // Pull from current state's trackSections to ensure any changes after selection are propagated
            const trackSections = intersectionWith(
                selectedState,
                state.trackSections,
                (left, right) => left.id === right.id
            );

            const trackIdMap = generateIdMap(trackSections);
            const trackSectionSteps = intersectionWith(
                state.trackSectionSteps,
                trackSections,
                (trackSectionStep, trackSection) =>
                    trackSection.id === trackSectionStep.track_section_id
            );

            const clonedTrackSections = sortBy(
                remapIds(trackSections, trackIdMap),
                (trackSection) => trackSection.index
            );
            const clonedTrackSectionSteps = remapIds(
                trackSectionSteps,
                trackIdMap,
                {
                    regenerateId: true,
                    property: "track_section_id",
                }
            );

            setCurrentWorkstationState((prev) =>
                prev.merge({
                    trackSections: rebaseIndexes(
                        prev.trackSections.concat(clonedTrackSections),
                        (e) => e.track_id === track_id
                    ),
                    trackSectionSteps: prev.trackSectionSteps.concat(
                        clonedTrackSectionSteps
                    ),
                })
            );
            setSelectedState(List<ClipboardItem>());
            toaster.notify(duplicationMessage);
        },
        [
            duplicationMessage,
            selectedState,
            setCurrentWorkstationState,
            setSelectedState,
            state.trackSectionSteps,
            state.trackSections,
        ]
    );

    const selectItem = useCallback(
        (item: ClipboardItem) => {
            setSelectedState((prev) => prev.push(item));
        },
        [setSelectedState]
    );

    const isSelected = useCallback(
        (value: ClipboardItem) =>
            selectedState.some((item) => item.id === value.id),
        [selectedState]
    );

    const deselectItem = useCallback(
        (item: ClipboardItem) =>
            setSelectedState((prev) =>
                prev.filter((selectedItem) => selectedItem.id !== item.id)
            ),
        [setSelectedState]
    );

    const onSelect = useCallback(
        (item: ClipboardItem) => (event: React.MouseEvent<HTMLDivElement>) => {
            // A bit of a hack to tell where the event is coming from - but it prevents Dialog clicks
            // from leaking through and selecting or deselecting the card
            if (isEventFromDialog(event)) {
                return;
            }

            if (isSelected(item)) {
                deselectItem(item);
                return;
            }

            if (
                selectedState.some(
                    (selectedItem) => selectedItem.track_id !== item.track_id
                )
            ) {
                setSelectedState(List.of(item));
                return;
            }

            selectItem(item);
        },
        [deselectItem, isSelected, selectItem, selectedState, setSelectedState]
    );

    const clearSelected = useCallback(
        () => setSelectedState(List<ClipboardItem>()),
        [setSelectedState]
    );

    return {
        duplicateSelected,
        clearSelected,
        selectItem,
        isSelected,
        onSelect,
        deselectItem,
        selectedState,
        setSelectedState,
    };
};

export { useClipboardState };
