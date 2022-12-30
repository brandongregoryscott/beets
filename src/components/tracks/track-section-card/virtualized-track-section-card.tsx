import { TrackSectionCard } from "components/tracks/track-section-card/track-section-card";
import { useListFiles } from "hooks/domain/files/use-list-files";
import { useGetInstrument } from "hooks/domain/instruments/use-get-instrument";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import { useTracksState } from "hooks/use-tracks-state";
import type { SetStateAction } from "jotai";
import { merge } from "lodash";
import type { TrackSectionRecord } from "models/track-section-record";
import type { Dispatch } from "react";
import { useState } from "react";
import React, { memo, useMemo } from "react";
import type { DraggableProvided } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { areEqual } from "react-window";
import { isNotNilOrEmpty } from "utils/core-utils";
import { getFileById } from "utils/file-utils";
import { getStepCountOffset } from "utils/track-section-utils";
import { PlaceholderTrackSectionCard } from "components/tracks/track-section-card/placeholder-track-section-card";

interface VirtualizedTrackSectionCardProps {
    data: TrackSectionRecord[];
    index: number;
    style: React.CSSProperties;
}

interface VirtualizedTrackSectionCardContentProps {
    provided: DraggableProvided;
    setIsDragDisabled?: Dispatch<SetStateAction<boolean>>;
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
    const [isDragDisabled, setIsDragDisabled] = useState<boolean>(true);

    return (
        <Draggable
            draggableId={trackSection.id}
            index={trackSection.index}
            isDragDisabled={isDragDisabled}
            key={trackSection.id}>
            {(provided) => (
                <VirtualizedTrackSectionCardContent
                    provided={provided}
                    setIsDragDisabled={setIsDragDisabled}
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
    const {
        setIsDragDisabled,
        provided,
        trackSection,
        style: styleProp,
    } = props;
    const { index } = trackSection;
    const { dragHandleProps, draggableProps, innerRef } = provided;
    const { style: draggableStyle } = draggableProps;
    const { state: tracks } = useTracksState();
    const track = useMemo(
        () => tracks.find((track) => track.id === trackSection.track_id),
        [trackSection.track_id, tracks]
    );
    const instrumentId = track?.instrument_id;
    const { resultObject: files } = useListFiles();
    const { resultObject: instrument } = useGetInstrument({
        id: instrumentId!,
        enabled: isNotNilOrEmpty(instrumentId),
        files,
    });
    const instrumentFile = useMemo(
        () => getFileById(instrument?.file_id, files),
        [files, instrument]
    );
    const { state: trackSections, update: updateTrackSection } =
        useTrackSectionsState({
            trackId: track?.id ?? "",
        });

    const style: React.CSSProperties = useMemo(
        () => merge({}, styleProp, draggableStyle),
        [draggableStyle, styleProp]
    );

    if (trackSection == null || track == null) {
        return null;
    }

    return (
        <div
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
            style={style}>
            {trackSection.isPlaceholder() ? (
                <PlaceholderTrackSectionCard trackSection={trackSection} />
            ) : (
                <TrackSectionCard
                    file={instrumentFile}
                    instrument={instrument}
                    isFirst={index === 0}
                    isLast={index === trackSections.count() - 1}
                    onChange={updateTrackSection}
                    setIsDragDisabled={setIsDragDisabled}
                    stepCountOffset={getStepCountOffset(trackSections, index)}
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
