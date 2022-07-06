import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { PlayingTrackCard } from "components/tracks/track-card/playing-track-card";

interface PlayingTrackListProps {
    tracks?: List<TrackRecord>;
}

const PlayingTrackList: React.FC<PlayingTrackListProps> = (
    props: PlayingTrackListProps
) => {
    const { tracks } = props;

    return (
        <React.Fragment>
            {tracks?.map((track) => (
                <PlayingTrackCard key={track.id} track={track} />
            ))}
        </React.Fragment>
    );
};

export { PlayingTrackList };
