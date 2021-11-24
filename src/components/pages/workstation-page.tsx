import { SongControls } from "components/song-controls";
import { TrackList } from "components/track-list";
import { majorScale, Pane } from "evergreen-ui";

interface WorkstationPageProps {}

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    return (
        <Pane marginTop={majorScale(2)} marginLeft={majorScale(2)}>
            <SongControls>
                <TrackList />
            </SongControls>
        </Pane>
    );
};

export { WorkstationPage };
