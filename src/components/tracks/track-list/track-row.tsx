import { Flex } from "components/flex";
import { IconButton } from "components/icon-button";
import { TrackCard } from "components/tracks/track-card/track-card";
import { VirtualizedTrackSectionCard } from "components/tracks/track-section-card/virtualized-track-section-card";
import { AddIcon, majorScale, Pane, Tooltip } from "evergreen-ui";
import { useDraggable } from "hooks/use-draggable";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { ForwardedRef, ForwardRefRenderFunction } from "react";
import { useState } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { ListOnScrollProps } from "react-window";
import { VariableSizeList } from "react-window";
import { useDebouncedValue, useWindowSize } from "rooks";
import type { SelectorMap } from "ui-box";
import { calcFrom100 } from "utils/theme-utils";

interface TrackRowProps {
    onScroll: (props: ListOnScrollProps) => void;
    showScrollbar?: boolean;
    track: TrackRecord;
}

const hiddenScrollbarStyle: React.CSSProperties = {
    // Hide scrollbars on Edge/IE
    msOverflowStyle: "none",
    // Hide scrollbars on Firefox
    scrollbarWidth: "none",
};

const selectors: SelectorMap = {
    // Hide scrollbars on Chrome
    "> div::-webkit-scrollbar": { display: "none" },
};

const _TrackRow: ForwardRefRenderFunction<
    VariableSizeList<TrackSectionRecord[]>,
    TrackRowProps
> = (
    props: TrackRowProps,
    ref: ForwardedRef<VariableSizeList<TrackSectionRecord[]>>
) => {
    const { showScrollbar = false, track, onScroll } = props;

    const { innerWidth } = useWindowSize();
    const {
        state,
        setState: setTrackSections,
        add: addTrackSection,
    } = useTrackSectionsState({
        trackId: track.id,
    });
    const { onDragEnd, onDragStart } = useDraggable({
        setState: setTrackSections,
    });
    const [isTrackDragDisabled, setIsTrackDragDisabled] =
        useState<boolean>(true);

    const trackSections = useMemo(() => state.toArray(), [state]);

    const getItemSize = useCallback(
        (index: number) => {
            const trackSection = trackSections[index];
            if (trackSection == null) {
                return majorScale(19);
            }

            return majorScale(2 * trackSection.step_count);
        },
        [trackSections]
    );

    const variableListHeight = showScrollbar ? majorScale(12) : majorScale(10);
    const variableListStyle = showScrollbar ? undefined : hiddenScrollbarStyle;
    const [variableListWidth] = useDebouncedValue(
        innerWidth! - majorScale(31),
        25,
        { initializeWithNull: false }
    );
    const outerSelectors = showScrollbar ? undefined : selectors;

    return (
        <Flex.Row alignItems="center" marginBottom={majorScale(2)}>
            <Draggable
                draggableId={track.id}
                index={track.index}
                isDragDisabled={isTrackDragDisabled}>
                {(provided) => (
                    <Flex.Row
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        selectors={outerSelectors}
                        width={calcFrom100(majorScale(8))}>
                        <DragDropContext
                            onDragEnd={onDragEnd}
                            onDragStart={onDragStart}>
                            <Pane marginRight={majorScale(2)}>
                                <TrackCard
                                    dragHandleProps={provided.dragHandleProps}
                                    setIsDragDisabled={setIsTrackDragDisabled}
                                    track={track}
                                />
                            </Pane>
                            <Droppable
                                direction="horizontal"
                                droppableId={track.id}
                                mode="virtual"
                                renderClone={(provided, _snapshot, rubric) => (
                                    <VirtualizedTrackSectionCard.Content
                                        provided={provided}
                                        trackSection={
                                            trackSections[rubric.source.index]
                                        }
                                    />
                                )}>
                                {(provided) => (
                                    <VariableSizeList
                                        {...provided.droppableProps}
                                        estimatedItemSize={majorScale(19)}
                                        height={variableListHeight}
                                        itemCount={trackSections.length}
                                        itemData={trackSections}
                                        itemSize={getItemSize}
                                        layout="horizontal"
                                        onScroll={onScroll}
                                        outerRef={provided.innerRef}
                                        ref={ref}
                                        style={variableListStyle}
                                        width={variableListWidth!}>
                                        {VirtualizedTrackSectionCard}
                                    </VariableSizeList>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Flex.Row>
                )}
            </Draggable>
            <Tooltip content="Add Section">
                <IconButton
                    icon={AddIcon}
                    marginX={majorScale(2)}
                    onClick={addTrackSection}
                />
            </Tooltip>
        </Flex.Row>
    );
};

const TrackRow = forwardRef(_TrackRow);
TrackRow.displayName = "TrackRow";

export { TrackRow };
