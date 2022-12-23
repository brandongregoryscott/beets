import { TrackSectionCard } from "components/tracks/track-section-card/track-section-card";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import { useTracksState } from "hooks/use-tracks-state";
import { merge } from "lodash";
import type { TrackSectionRecord } from "models/track-section-record";
import React, { memo, useMemo } from "react";
import type { DraggableProvided } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { areEqual } from "react-window";
import { getStepCountOffset } from "utils/track-section-utils";

interface VirtualizedTrackSectionCardProps {
    data: TrackSectionRecord[];
    index: number;
    style: React.CSSProperties;
}

interface VirtualizedTrackSectionCardContentProps {
    provided: DraggableProvided;
    style?: React.CSSProperties;
    trackSection: TrackSectionRecord;
}

type VirtualizedTrackSectionCardComponent =
    React.FC<VirtualizedTrackSectionCardProps> & {
        Content: typeof VirtualizedTrackSectionCardContent;
    };

const _VirtualizedTrackSectionCard: VirtualizedTrackSectionCardComponent = ((
    props: VirtualizedTrackSectionCardProps
) => {
    const { data: trackSections, index, style } = props;
    const trackSection = useMemo(
        () => trackSections[index],
        [index, trackSections]
    );
    return (
        <Draggable draggableId={trackSection.id} index={trackSection.index}>
            {(provided) => (
                <VirtualizedTrackSectionCardContent
                    provided={provided}
                    style={style}
                    trackSection={trackSection}
                />
            )}
        </Draggable>
    );
}) as unknown as VirtualizedTrackSectionCardComponent;

const _VirtualizedTrackSectionCardContent: React.FC<
    VirtualizedTrackSectionCardContentProps
> = (props) => {
    const { provided, trackSection, style: styleProp } = props;
    const { state: tracks } = useTracksState();
    const track = useMemo(
        () => tracks.find((track) => track.id === trackSection.track_id),
        [trackSection.track_id, tracks]
    );
    const { state: trackSections, update: updateTrackSection } =
        useTrackSectionsState({
            trackId: track?.id ?? "",
        });

    const style = useMemo(
        () => merge({}, styleProp, provided.draggableProps.style),
        [provided.draggableProps.style, styleProp]
    );

    return (
        <div {...provided.draggableProps} ref={provided.innerRef} style={style}>
            {trackSection != null && track != null && (
                <TrackSectionCard
                    dragHandleProps={provided.dragHandleProps}
                    onChange={updateTrackSection}
                    stepCountOffset={getStepCountOffset(
                        trackSections,
                        trackSection.index
                    )}
                    track={track}
                    trackSection={trackSection}
                />
            )}
        </div>
    );
};

const VirtualizedTrackSectionCardContent = memo(
    _VirtualizedTrackSectionCardContent
);
VirtualizedTrackSectionCardContent.displayName =
    "VirtualizedTrackSectionCard.Content";

const VirtualizedTrackSectionCard = memo(
    _VirtualizedTrackSectionCard,
    areEqual
) as unknown as VirtualizedTrackSectionCardComponent;
VirtualizedTrackSectionCard.displayName = "VirtualizedTrackSectionCard";
VirtualizedTrackSectionCard.Content = VirtualizedTrackSectionCardContent;

export { VirtualizedTrackSectionCard };
