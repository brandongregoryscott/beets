import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { TrackList } from "components/tracks/track-list/track-list";
import { Flex } from "components/flex";

interface DraggableTrackListProps {
    tracks?: List<TrackRecord>;
}

const DraggableTrackList: React.FC<DraggableTrackListProps> = (
    props: DraggableTrackListProps
) => {
    const { tracks } = props;

    return (
        <Flex.Column>
            <TrackList tracks={tracks} />
        </Flex.Column>
    );
};

export { DraggableTrackList };
