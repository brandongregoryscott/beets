import { Pane, IconButton, PlusIcon, minorScale, Tooltip } from "evergreen-ui";
import { Track } from "components/track";
import { useTracksAtom } from "utils/hooks/use-tracks-atom";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks, add } = useTracksAtom();
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track, index) => (
                    <Track
                        {...track.toPOJO()}
                        files={track.files}
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
                        onClick={add}
                    />
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export { TrackList };
