import { TrackCard } from "components/tracks/track-card/track-card";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { TrackRecord } from "models/track-record";
import { List } from "immutable";
import React from "react";
import { PlayingTrackCard } from "components/tracks/track-card/playing-track-card";

interface TrackListProps {
    isPlaying: boolean;
    tracks?: List<TrackRecord>;
}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { isPlaying, tracks } = props;
    const { onStepPlay } = useReactronicaState();

    return (
        <React.Fragment>
            {tracks?.map((track) =>
                isPlaying ? (
                    <PlayingTrackCard
                        key={track.id}
                        onStepPlay={onStepPlay}
                        track={track}
                    />
                ) : (
                    <TrackCard
                        key={track.id}
                        onStepPlay={onStepPlay}
                        track={track}
                    />
                )
            )}
        </React.Fragment>
    );
};

export { TrackList };
