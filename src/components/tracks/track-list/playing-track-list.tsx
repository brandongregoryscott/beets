import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { TrackRecord } from "models/track-record";
import { List } from "immutable";
import React from "react";
import { PlayingTrackCard } from "components/tracks/track-card/playing-track-card";

interface PlayingTrackListProps {
    tracks?: List<TrackRecord>;
}

const PlayingTrackList: React.FC<PlayingTrackListProps> = (
    props: PlayingTrackListProps
) => {
    const { tracks } = props;
    const { onStepPlay } = useReactronicaState();

    return (
        <React.Fragment>
            {tracks?.map((track) => (
                <PlayingTrackCard
                    key={track.id}
                    onStepPlay={onStepPlay}
                    track={track}
                />
            ))}
        </React.Fragment>
    );
};

export { PlayingTrackList };
