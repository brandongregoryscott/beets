import { TrackSectionCard } from "components/tracks/track-section-card/track-section-card";
import { useTracksState } from "hooks/use-tracks-state";
import { noop } from "lodash";
import type { TrackSectionRecord } from "models/track-section-record";
import React, { useMemo } from "react";

interface VirtualizedTrackSectionCardProps {
    data: TrackSectionRecord[];
    index: number;
    style: React.CSSProperties;
}

const VirtualizedTrackSectionCard: React.FC<
    VirtualizedTrackSectionCardProps
> = (props: VirtualizedTrackSectionCardProps) => {
    const { data: trackSections, index, style } = props;
    const trackSection = useMemo(
        () => trackSections[index],
        [index, trackSections]
    );
    const { state: tracks } = useTracksState();
    const track = useMemo(
        () => tracks.find((track) => track.id === trackSection.track_id),
        [trackSection.track_id, tracks]
    );
    return (
        <div style={style}>
            {trackSection != null && track != null && (
                <TrackSectionCard
                    onChange={noop}
                    stepCountOffset={0}
                    track={track}
                    trackSection={trackSection}
                />
            )}
        </div>
    );
};

export { VirtualizedTrackSectionCard };
