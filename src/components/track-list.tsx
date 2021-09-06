import { Pane, IconButton, PlusIcon, majorScale } from "evergreen-ui";
import { Track } from "components/track";
import { useTracksAtom } from "utils/hooks/use-tracks-atom";
import { BeatGrid } from "components/beat-grid";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks, add } = useTracksAtom();
    return (
        <Pane>
            <BeatGrid count={4} />
            <Pane display="flex" flexDirection="column">
                {tracks.map((track, index) => (
                    <Track {...track} index={index} key={track.id} />
                ))}
            </Pane>
            <Pane
                display="flex"
                flexDirection="row"
                marginRight="auto"
                marginLeft={majorScale(2)}>
                <IconButton icon={PlusIcon} onClick={add} />
            </Pane>
        </Pane>
    );
};

export { TrackList };
