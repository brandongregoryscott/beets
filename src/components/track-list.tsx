import { Pane, IconButton, PlusIcon } from "evergreen-ui";
import { Track } from "components/track";
import { useTracksAtom } from "utils/hooks/use-tracks-atom";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks, add } = useTracksAtom();
    return (
        <Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track, index) => (
                    <Track {...track} index={index} key={track.id} />
                ))}
            </Pane>
            <Pane display="flex" flexDirection="row" marginRight="auto">
                <IconButton icon={PlusIcon} onClick={add} />
            </Pane>
        </Pane>
    );
};

export { TrackList };
