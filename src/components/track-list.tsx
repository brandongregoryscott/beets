import { Track } from "components/track";
import { Pane, IconButton, PlusIcon, majorScale } from "evergreen-ui";
import { useTracksAtom } from "utils/hooks/use-tracks-atom";

interface TrackListProps {}

const TrackList: React.FC<TrackListProps> = (props: TrackListProps) => {
    const { tracks, add } = useTracksAtom();
    return (
        <Pane>
            <Pane
                display="flex"
                flexDirection="row"
                marginRight="auto"
                marginTop={majorScale(2)}
                marginLeft={majorScale(2)}>
                <IconButton
                    icon={PlusIcon}
                    onClick={add}
                    width={majorScale(9)}
                />
            </Pane>
            <Pane display="flex" flexDirection="column">
                {tracks.map((track, index) => (
                    <Track {...track} index={index} key={track.id} />
                ))}
            </Pane>
        </Pane>
    );
};

export { TrackList };
