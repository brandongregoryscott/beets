import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import type { RefObject } from "react";
import { useCallback } from "react";
import React, { createRef, useMemo } from "react";
import { VirtualizedTrackRow } from "components/tracks/track-list/virtualized-track-row";
import { range, zipObject } from "lodash";
import type { ListOnScrollProps, VariableSizeList } from "react-window";
import type { TrackSectionRecord } from "models/track-section-record";

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

    const handleScroll = useCallback(
        (props: ListOnScrollProps) => {
            // See https://github.com/bvaughn/react-window/issues/627#issuecomment-1070347334
            const { scrollUpdateWasRequested, scrollOffset } = props;
            if (scrollUpdateWasRequested) {
                return;
            }

            refs.forEach((ref) => {
                window.requestAnimationFrame(() => {
                    ref.current?.scrollTo(scrollOffset);
                });
            });
        },
        [refs]
    );

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
