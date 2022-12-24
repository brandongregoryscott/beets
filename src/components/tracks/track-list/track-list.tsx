import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import type { RefObject } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import React, { createRef } from "react";
import { VirtualizedTrackRow } from "components/tracks/track-list/virtualized-track-row";
import { range } from "lodash";
import type {
    FixedSizeList,
    ListOnScrollProps,
    VariableSizeList,
} from "react-window";
import type { TrackSectionRecord } from "models/track-section-record";
import { useDebounce } from "rooks";
import { useWorkstationState } from "hooks/use-workstation-state";
import { majorScale, Pane } from "evergreen-ui";
import { VirtualizedTrackTime } from "components/tracks/track-time/virtualized-track-time";

interface TrackListProps {
    isDragging?: boolean;
    tracks?: List<TrackRecord>;
}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { isDragging = false, tracks } = props;
    const { state: workstationState } = useWorkstationState();

    const trackTimeRef = useRef<FixedSizeList>(null);
    const trackRowRefs = useRef<
        Array<RefObject<VariableSizeList<TrackSectionRecord[]>>>
    >(createRefs<VariableSizeList<TrackSectionRecord[]>>(tracks?.count() ?? 0));

    /**
     * @see https://github.com/bvaughn/react-window/issues/627#issuecomment-1070347334
     */
    const handleScroll = useDebounce((props: ListOnScrollProps) => {
        const { scrollOffset } = props;

        window.requestAnimationFrame(() => {
            trackTimeRef.current?.scrollTo(scrollOffset);
            trackRowRefs.current.forEach((ref) => {
                ref.current?.scrollTo(scrollOffset);
            });
        });
    }, 1);

    useEffect(() => {
        trackRowRefs.current = createRefs<
            VariableSizeList<TrackSectionRecord[]>
        >(tracks?.count() ?? 0);
    }, [tracks]);

    return (
        <React.Fragment>
            <Pane marginLeft={majorScale(21)}>
                <VirtualizedTrackTime
                    onScroll={handleScroll}
                    ref={trackTimeRef}
                    stepCount={workstationState.getStepCount()}
                />
            </Pane>
            {tracks?.map((track, index) => (
                <VirtualizedTrackRow
                    key={track.id}
                    onScroll={handleScroll}
                    ref={trackRowRefs.current[index]}
                    showScrollbar={!isDragging && index === tracks?.count() - 1}
                    track={track}
                />
            ))}
        </React.Fragment>
    );
};

const createRefs = <T,>(count: number): Array<RefObject<T>> =>
    range(0, count).map(() => createRef<T>());

export { TrackList };
