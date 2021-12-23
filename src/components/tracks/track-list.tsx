import {
    Pane,
    IconButton,
    PlusIcon,
    minorScale,
    Tooltip,
    majorScale,
} from "evergreen-ui";
import { TrackCard } from "components/tracks/track-card";
import { useCallback } from "react";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { SelectMenuItem, SelectMenu } from "components/select-menu";
import { TrackRecord } from "models/track-record";
import { useProjectState } from "utils/hooks/use-project-state";
import { useDialog } from "utils/hooks/use-dialog";
import { InstrumentSettingsDialog } from "components/instruments/instrument-settings-dialog";
import { InstrumentRecord } from "models/instrument-record";

interface TrackListProps {}

const options: Array<SelectMenuItem<boolean>> = [
    {
        label: "Sequencer",
        id: "sequencer",
        value: false,
    },
    {
        label: "Instrument",
        id: "instrument",
        value: true,
    },
];

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { state: project } = useProjectState();
    const { state: tracks, add } = useTracksState();
    const { onStepPlay } = useReactronicaState();
    const [
        instrumentDialogOpen,
        handleOpenInstrumentDialog,
        handleCloseInstrumentDialog,
    ] = useDialog();

    const handleSelect = useCallback(
        (item: SelectMenuItem<boolean>) => {
            const { value: isInstrument } = item;
            if (isInstrument) {
                handleOpenInstrumentDialog();
                return;
            }

            add(
                new TrackRecord().merge({
                    index: tracks.count(),
                    project_id: project.id,
                })
            );
        },
        [add, handleOpenInstrumentDialog, project, tracks]
    );

    const handleInstrumentSubmit = useCallback(
        (instrument: InstrumentRecord) => {
            add(
                new TrackRecord().merge({
                    index: tracks.count(),
                    instrument_id: instrument.id,
                    project_id: project.id,
                })
            );
        },
        [add, project, tracks]
    );
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track) => (
                    <TrackCard
                        key={track.id}
                        onStepPlay={onStepPlay}
                        track={track}
                    />
                ))}
            </Pane>
            <Pane display="flex" flexDirection="row" marginRight="auto">
                <Tooltip content="Add Track">
                    <SelectMenu
                        calculateHeight={true}
                        closeOnSelect={true}
                        hasFilter={false}
                        isMultiSelect={false}
                        onSelect={handleSelect}
                        options={options}
                        title="Track Type"
                        width={majorScale(16)}>
                        <IconButton icon={PlusIcon} marginTop={minorScale(2)} />
                    </SelectMenu>
                </Tooltip>
            </Pane>
            {instrumentDialogOpen && (
                <InstrumentSettingsDialog
                    isShown={true}
                    onCloseComplete={handleCloseInstrumentDialog}
                    onSubmit={handleInstrumentSubmit}
                />
            )}
        </Pane>
    );
};

export { TrackList };
