import { Flex } from "components/flex";
import { IconButton } from "components/icon-button";
import { AddIcon, majorScale, minorScale } from "evergreen-ui";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import type { TrackSectionRecord } from "models/track-section-record";
import React, { useCallback } from "react";

interface PlaceholderTrackSectionCardProps {
    trackSection: TrackSectionRecord;
}

const PlaceholderTrackSectionCard: React.FC<
    PlaceholderTrackSectionCardProps
> = (props: PlaceholderTrackSectionCardProps) => {
    const { trackSection } = props;
    const { insert } = useTrackSectionsState({
        trackId: trackSection.track_id,
    });
    const handleInsertClick = useCallback(() => {
        insert(trackSection.index);
    }, [insert, trackSection.index]);
    return (
        <Flex.Row
            alignItems="center"
            borderRadius={minorScale(1)}
            cursor="grab"
            height={majorScale(10)}
            hoverElevation={2}
            justifyContent="center">
            <IconButton
                appearance="minimal"
                icon={AddIcon}
                onClick={handleInsertClick}
            />
        </Flex.Row>
    );
};

export { PlaceholderTrackSectionCard };
