import { TrackTimeCard } from "components/tracks/track-time/track-time-card";
import { useToneControls } from "hooks/use-tone-controls";
import { useWorkstationState } from "hooks/use-workstation-state";
import React, { memo } from "react";
import { areEqual } from "react-window";
import { toDataAttributes } from "utils/data-attribute-utils";

interface VirtualizedTrackTimeCardProps {
    index: number;
    style: React.CSSProperties;
}

const _VirtualizedTrackTimeCard: React.FC<VirtualizedTrackTimeCardProps> = (
    props: VirtualizedTrackTimeCardProps
) => {
    const { style, index } = props;
    const { endIndex, startIndex } = useToneControls();
    const { state: workstationState } = useWorkstationState();

    return (
        <div
            {...toDataAttributes({
                endIndex,
                startIndex,
                stepCount: workstationState.getMaxStepCount(),
            })}
            style={style}>
            <TrackTimeCard index={index} />
        </div>
    );
};

const VirtualizedTrackTimeCard = memo(_VirtualizedTrackTimeCard, areEqual);
VirtualizedTrackTimeCard.displayName = "VirtualizedTrackTimeCard";

export { VirtualizedTrackTimeCard };
