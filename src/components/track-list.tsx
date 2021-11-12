import { Pane, IconButton, PlusIcon, minorScale, Tooltip } from "evergreen-ui";
import { Track } from "components/track";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useCallback } from "react";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { state, addTrack } = useWorkstationState();
    const tracks = state.currentProject.getTracks();
    const handleAddTrack = useCallback(() => addTrack(), [addTrack]);
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track) => (
                    <Track key={track.id} track={track} />
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
