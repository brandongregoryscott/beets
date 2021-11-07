import { Pane, IconButton, PlusIcon, minorScale, Tooltip } from "evergreen-ui";
import { Track } from "components/track";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { List } from "immutable";
import { MidiNote } from "reactronica";
import { FileRecord } from "models/file-record";
import { useCallback } from "react";

interface TrackListProps {}

const files = List<FileRecord>();
const steps = List<MidiNote>();

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { state, addTrack } = useWorkstationState();
    const { tracks } = state.currentProject.getNavigationProperties();
    const handleAddTrack = useCallback(() => addTrack(), [addTrack]);
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track, index) => (
                    <Track
                        {...track.toPOJO()}
                        files={files}
                        steps={steps}
                        index={index}
                        key={track.id}
                    />
                ))}
            </Pane>
            <Pane display="flex" flexDirection="row" marginRight="auto">
                <Tooltip content="Add Track">
                    <IconButton
                        icon={PlusIcon}
                        marginTop={minorScale(2)}
                        onClick={handleAddTrack}
                    />
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export { TrackList };
