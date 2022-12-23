import { Flex } from "components/flex";
import { TrackCard } from "components/tracks/track-card/track-card";
import { VirtualizedTrackSectionCard } from "components/tracks/track-section-card/virtualized-track-section-card";
import { majorScale } from "evergreen-ui";
import { useDraggable } from "hooks/use-draggable";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { ForwardedRef } from "react";
import { forwardRef, useCallback, useMemo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { ListOnScrollProps } from "react-window";
import { VariableSizeList } from "react-window";
import type { SelectorMap } from "ui-box";
import { getTrackListWidth } from "utils/window-utils";

interface VirtualizedTrackRowProps {
    onScroll: (props: ListOnScrollProps) => void;
    showScrollbar?: boolean;
    track: TrackRecord;
}

const hiddenVerticalScrollbarStyle: React.CSSProperties = {
    overflowY: "hidden",
};

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

const VirtualizedTrackRow = forwardRef(
    (
        props: VirtualizedTrackRowProps,
        ref: ForwardedRef<VariableSizeList<TrackSectionRecord[]>>
    ) => {
        const { showScrollbar = false, track, onScroll } = props;
        const { state, setState: setTrackSections } = useTrackSectionsState({
            trackId: track.id,
        });
        const { onDragEnd, onDragStart } = useDraggable({
            setState: setTrackSections,
        });

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

        return (
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Flex.Row selectors={!showScrollbar ? selectors : undefined}>
                    <TrackCard track={track} />
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
                                height={
                                    !showScrollbar
                                        ? majorScale(10)
                                        : majorScale(12)
                                }
                                itemCount={trackSections.length}
                                itemData={trackSections}
                                itemSize={getItemSize}
                                layout="horizontal"
                                onScroll={onScroll}
                                outerRef={provided.innerRef}
                                ref={ref}
                                style={getStyle(showScrollbar)}
                                width={getTrackListWidth()}>
                                {VirtualizedTrackSectionCard}
                            </VariableSizeList>
                        )}
                    </Droppable>
                </Flex.Row>
            </DragDropContext>
        );
    }
);

const getStyle = (showScrollbar: boolean): React.CSSProperties =>
    showScrollbar ? hiddenVerticalScrollbarStyle : hiddenScrollbarStyle;

VirtualizedTrackRow.displayName = "VirtualizedTrackRow";

export { VirtualizedTrackRow };
