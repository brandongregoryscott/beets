import { ContextualIconButton } from "components/contextual-icon-button";
import { Flex } from "components/flex";
import {
    AddIcon,
    DeleteIcon,
    DragHandleHorizontalIcon,
    HeatGridIcon,
    majorScale,
    StepChartIcon,
} from "evergreen-ui";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

interface TrackSectionHoverMenuProps {
    backgroundColor: string;
    isFirst: boolean;
    isLast: boolean;
    onInsert: () => void;
    onOpenPianoRollDialog: () => void;
    onOpenSequencerDialog: () => void;
    onRemove: () => void;
    setIsDragDisabled?: Dispatch<SetStateAction<boolean>>;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
    width: number;
}

const TrackSectionHoverMenu: React.FC<TrackSectionHoverMenuProps> = (
    props: TrackSectionHoverMenuProps
) => {
    const {
        isFirst,
        backgroundColor,
        onInsert,
        onOpenSequencerDialog,
        onOpenPianoRollDialog,
        onRemove,
        setIsDragDisabled,
        isLast,
        track,
        trackSection,
        width,
    } = props;

    return (
        <Flex.Row
            justifyContent="flex-end"
            marginTop={-majorScale(1)}
            minWidth={width}
            position="absolute"
            width={width}>
            <ContextualIconButton
                backgroundColor={backgroundColor}
                icon={DeleteIcon}
                id={trackSection.id}
                intent="danger"
                isLastCard={isLast}
                onClick={onRemove}
                tooltipText="Remove section"
            />
            {track.isSequencer() && (
                <ContextualIconButton
                    backgroundColor={backgroundColor}
                    icon={HeatGridIcon}
                    id={trackSection.id}
                    isLastCard={isLast}
                    onClick={onOpenSequencerDialog}
                    tooltipText="Sequencer"
                />
            )}
            {!track.isSequencer() && (
                <ContextualIconButton
                    backgroundColor={backgroundColor}
                    icon={StepChartIcon}
                    id={trackSection.id}
                    isLastCard={isLast}
                    onClick={onOpenPianoRollDialog}
                    tooltipText="Piano Roll"
                />
            )}
            <ContextualIconButton
                backgroundColor={backgroundColor}
                icon={AddIcon}
                id={trackSection.id}
                isLastCard={isLast}
                onClick={onInsert}
                tooltipText="Insert section"
            />
            <ContextualIconButton
                backgroundColor={backgroundColor}
                icon={DragHandleHorizontalIcon}
                id={trackSection.id}
                isLastCard={isLast}
                marginRight={isFirst ? majorScale(1) : undefined}
                setIsDragDisabled={setIsDragDisabled}
                tooltipText="Move section"
            />
        </Flex.Row>
    );
};

export { TrackSectionHoverMenu };
