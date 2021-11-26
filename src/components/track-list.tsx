import { Pane, IconButton, PlusIcon, minorScale, Tooltip } from "evergreen-ui";
import { TrackCard } from "components/track-card";
import { useCallback } from "react";
import { useTracksState } from "utils/hooks/use-tracks-state";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { state: tracks, add } = useTracksState();
    const handleAdd = useCallback(() => add(), [add]);
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track) => (
                    <TrackCard key={track.id} track={track} />
                ))}
            </Pane>
            <Pane display="flex" flexDirection="row" marginRight="auto">
                <Tooltip content="Add Track">
                    <IconButton
                        icon={PlusIcon}
                        marginTop={minorScale(2)}
                        onClick={handleAdd}
                    />
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export { TrackList };
