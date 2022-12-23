import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import type { RefObject } from "react";
import React, { createRef, useMemo } from "react";
import { VirtualizedTrackRow } from "components/tracks/track-list/virtualized-track-row";
import { range, zipObject } from "lodash";
import type { ListOnScrollProps, VariableSizeList } from "react-window";
import type { TrackSectionRecord } from "models/track-section-record";
import { useDebounce } from "rooks";

interface TrackListProps {
    tracks?: List<TrackRecord>;
}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks } = props;
    const trackIds = useMemo(
        () => tracks?.map((track) => track.id)?.toArray() ?? [],
        [tracks]
    );

    const refs = useMemo(
        () =>
            range(0, tracks?.count()).map(() =>
                createRef<VariableSizeList<TrackSectionRecord[]>>()
            ),
        [tracks]
    );

    const refMapByTrackId = useMemo<
        Record<string, RefObject<VariableSizeList<TrackSectionRecord[]>>>
    >(() => zipObject(trackIds, refs), [refs, trackIds]);

    /**
     * @see https://github.com/bvaughn/react-window/issues/627#issuecomment-1070347334
     */
    const handleScroll = useDebounce((props: ListOnScrollProps) => {
        const { scrollOffset } = props;

        window.requestAnimationFrame(() => {
            refs.forEach((ref) => {
                ref.current?.scrollTo(scrollOffset);
            });
        });
    }, 1);

    return (
        <React.Fragment>
            {tracks?.map((track, index) => (
                <VirtualizedTrackRow
                    key={track.id}
                    onScroll={handleScroll}
                    ref={refMapByTrackId[track.id]}
                    showScrollbar={index === tracks?.count() - 1}
                    track={track}
                />
            ))}
        </React.Fragment>
    );
};

export { TrackList };
