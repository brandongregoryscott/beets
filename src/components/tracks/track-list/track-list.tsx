import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { TrackCard } from "components/tracks/track-card/track-card";
import { Flex } from "components/flex";
import { TrackSectionList } from "components/tracks/track-section-list/track-section-list";

interface TrackListProps {
    tracks?: List<TrackRecord>;
}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks } = props;

    return (
        <React.Fragment>
            {tracks?.map((track) => (
                <Flex.Row key={track.id}>
                    <TrackCard track={track} />
                    <TrackSectionList track={track} />
                </Flex.Row>
            ))}
        </React.Fragment>
    );
};

export { TrackList };
