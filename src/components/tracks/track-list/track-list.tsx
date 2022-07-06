import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { TrackCard } from "components/tracks/track-card/track-card";

interface TrackListProps {
    tracks?: List<TrackRecord>;
}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks } = props;

    return (
        <React.Fragment>
            {tracks?.map((track) => (
                <TrackCard key={track.id} track={track} />
            ))}
        </React.Fragment>
    );
};

export { TrackList };
