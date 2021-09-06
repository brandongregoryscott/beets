import { EditableParagraph } from "components/editable-paragraph";
import { SequencerDialog } from "components/sequencer-dialog";
import {
    Card,
    DeleteIcon,
    HeatGridIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    PropertiesIcon,
    PropertyIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import { Track as TrackInterface } from "interfaces/track";
import { useBoolean } from "utils/hooks/use-boolean";
import { useTrackAtom } from "utils/hooks/use-track-atom";

interface TrackProps extends TrackInterface {
    index: number;
}

const Track: React.FC<TrackProps> = (props: TrackProps) => {
    const { id, name, mute, solo } = props;
    const { remove, setName, toggleMute, toggleSolo } = useTrackAtom(id);
    const {
        value: sequencerDialogOpen,
        setTrue: handleOpenSequencerDialog,
        setFalse: handleCloseSequencerDialog,
    } = useBoolean(false);
    return (
        <Card
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            background="gray200"
            width={majorScale(22)}
            marginY={majorScale(1)}
            padding={majorScale(1)}>
            <EditableParagraph onChange={setName} value={name} />
            <Pane display="flex" flexDirection="row">
                <IconButton
                    icon={mute ? VolumeOffIcon : VolumeUpIcon}
                    marginRight={minorScale(2)}
                    onClick={toggleMute}
                />
                <IconButton
                    icon={solo ? PropertyIcon : PropertiesIcon}
                    marginRight={minorScale(2)}
                    onClick={toggleSolo}
                />
                <IconButton
                    icon={HeatGridIcon}
                    marginRight={minorScale(2)}
                    onClick={handleOpenSequencerDialog}
                />
                <IconButton
                    icon={DeleteIcon}
                    intent="danger"
                    marginRight={minorScale(2)}
                    onClick={remove}
                />
            </Pane>
            {sequencerDialogOpen && (
                <SequencerDialog
                    onClose={handleCloseSequencerDialog}
                    trackId={id}
                />
            )}
        </Card>
    );
};

export { Track };
export type { TrackProps };
