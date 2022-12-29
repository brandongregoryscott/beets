import { PianoRollDialog } from "components/piano-roll/piano-roll-dialog";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import { majorScale, minorScale, Pane } from "evergreen-ui";
import type { SetStateAction } from "jotai";
import type { FileRecord } from "models/file-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { Dispatch } from "react";
import { memo, useCallback } from "react";
import { useListFiles } from "hooks/domain/files/use-list-files";
import { useDialog } from "hooks/use-dialog";
import { useTheme } from "hooks/use-theme";
import { useTrackSectionStepsState } from "hooks/use-track-section-steps-state";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import { useClipboardState } from "hooks/use-clipboard-state";
import type { InstrumentRecord } from "models/instrument-record";
import { TrackSectionStepGrid } from "components/tracks/track-section-card/track-section-step-grid";
import { TrackSectionStepColumnWidth } from "components/tracks/track-section-card/track-section-step-column";
import { useWorkstationState } from "hooks/use-workstation-state";
import { unsoloAll } from "utils/track-utils";
import type { SelectorMap } from "ui-box";
import { getBorderXProps } from "utils/core-utils";
import { useBoolean } from "hooks/use-boolean";
import { useDebounce } from "rooks";
import { TrackSectionHoverMenu } from "components/tracks/track-section-card/track-section-hover-menu";
import { Flex } from "components/flex";

interface TrackSectionCardProps {
    file?: FileRecord;
    instrument?: InstrumentRecord;
    isFirst?: boolean;
    isLast?: boolean;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
    setIsDragDisabled?: Dispatch<SetStateAction<boolean>>;
    stepCountOffset: number;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
}

const selectors: SelectorMap = {
    "&:hover": {
        cursor: "pointer",
    },
};

const TrackSectionCard: React.FC<TrackSectionCardProps> = memo(
    (props: TrackSectionCardProps) => {
        const {
            instrument,
            file,
            isFirst = false,
            isLast = false,
            onChange,
            setIsDragDisabled,
            stepCountOffset,
            track,
            trackSection,
        } = props;

        const [
            isSequencerDialogOpen,
            openSequencerDialog,
            handleCloseSequencerDialog,
        ] = useDialog();

        const [
            isPianoRollDialogOpen,
            openPianoRollDialog,
            handleClosePianoRollDialog,
        ] = useDialog();

        const { value: isHovered, setValue: setIsHovered } = useBoolean();
        const handleMouseOver = useDebounce(() => setIsHovered(true), 25);
        const handleMouseLeave = useDebounce(() => setIsHovered(false), 25);

        const borderProps = getBorderXProps({
            isFirst,
            isLast,
            borderRadius: minorScale(1),
        });

        const { remove, insert } = useTrackSectionsState({
            trackId: trackSection.track_id,
        });

        const {
            state: workstationState,
            setCurrentState: setWorkstationState,
        } = useWorkstationState();
        const stepCount = workstationState.getStepCount();
        const { isSelected, onSelect } = useClipboardState();

        const {
            setState: handleTrackSectionStepsChange,
            state: trackSectionSteps,
        } = useTrackSectionStepsState({ trackSectionId: trackSection.id });
        const { resultObject: files } = useListFiles();
        const theme = useTheme();

        const unsoloTracks = useCallback(() => {
            setWorkstationState((prev) => {
                const { tracks } = prev;
                return prev.merge({ tracks: unsoloAll(tracks) });
            });
        }, [setWorkstationState]);

        const handleOpenSequencerDialog = useCallback(() => {
            unsoloTracks();
            openSequencerDialog();
            // Unless we explicitly close the hover menu, it'll stay up after opening a dialog
            setIsHovered(false);
        }, [openSequencerDialog, setIsHovered, unsoloTracks]);

        const handleOpenPianoRollDialog = useCallback(() => {
            unsoloTracks();
            openPianoRollDialog();
            // Unless we explicitly close the hover menu, it'll stay up after opening a dialog
            setIsHovered(false);
        }, [openPianoRollDialog, setIsHovered, unsoloTracks]);

        const handleRemove = useCallback(
            () => remove(trackSection),
            [remove, trackSection]
        );

        const handleStepCountChange = useCallback(
            (stepCount: number) => {
                onChange(trackSection.id, (prev) =>
                    prev.merge({ step_count: stepCount })
                );
            },
            [onChange, trackSection.id]
        );

        const handleInsert = useCallback(() => {
            insert(trackSection.index + 1);
        }, [insert, trackSection.index]);

        const width = trackSection.step_count * TrackSectionStepColumnWidth;

        const backgroundColor = isSelected(trackSection)
            ? theme.colors.gray400
            : theme.colors.gray200;

        const isDialogOpen = isPianoRollDialogOpen || isSequencerDialogOpen;

        return (
            <Flex.Row
                {...borderProps}
                backgroundColor={backgroundColor}
                height={majorScale(10)}
                onClick={onSelect(trackSection)}
                onMouseLeave={handleMouseLeave}
                // If the mouseOver event handler is still attached, the hover menu will be re-rendered
                // immediately on click
                onMouseOver={isDialogOpen ? undefined : handleMouseOver}
                paddingLeft={isFirst ? majorScale(1) : undefined}
                paddingRight={isLast ? majorScale(1) : undefined}
                paddingY={majorScale(1)}
                position="relative"
                selectors={selectors}>
                {isHovered && (
                    <TrackSectionHoverMenu
                        backgroundColor={backgroundColor}
                        isFirst={isFirst}
                        isLast={isLast}
                        onInsert={handleInsert}
                        onOpenPianoRollDialog={handleOpenPianoRollDialog}
                        onOpenSequencerDialog={handleOpenSequencerDialog}
                        onRemove={handleRemove}
                        setIsDragDisabled={setIsDragDisabled}
                        track={track}
                        trackSection={trackSection}
                        width={width}
                    />
                )}
                <TrackSectionStepGrid
                    stepCount={stepCount}
                    stepCountOffset={stepCountOffset}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                />
                {isSequencerDialogOpen && files != null && (
                    <SequencerDialog
                        files={files}
                        onCloseComplete={handleCloseSequencerDialog}
                        onStepChange={handleTrackSectionStepsChange}
                        onStepCountChange={handleStepCountChange}
                        track={track}
                        trackSection={trackSection}
                        trackSectionSteps={trackSectionSteps}
                    />
                )}
                {isPianoRollDialogOpen && (
                    <PianoRollDialog
                        file={file}
                        instrument={instrument}
                        onChange={handleTrackSectionStepsChange}
                        onCloseComplete={handleClosePianoRollDialog}
                        onStepCountChange={handleStepCountChange}
                        track={track}
                        trackSection={trackSection}
                        trackSectionSteps={trackSectionSteps}
                    />
                )}
            </Flex.Row>
        );
    }
);

TrackSectionCard.displayName = "TrackSectionCard";

export { TrackSectionCard };
