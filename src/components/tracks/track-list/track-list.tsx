import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { TrackRecord } from "models/track-record";
import { List } from "immutable";
import React from "react";
import { TrackCard } from "components/tracks/track-card/track-card";

interface TrackListProps {
    tracks?: List<TrackRecord>;
}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks } = props;
    const { onStepPlay } = useReactronicaState();

    return (
        <React.Fragment>
            {tracks?.map((track) => (
                <TrackCard
                    key={track.id}
                    onStepPlay={onStepPlay}
                    track={track}
                />
            ))}
        </React.Fragment>
    );
};

export { TrackList };
