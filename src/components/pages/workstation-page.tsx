import { Song } from "components/song";
import { TrackList } from "components/track-list";
import { majorScale, Pane } from "evergreen-ui";

interface WorkstationPageProps {}

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    return (
        <Pane marginTop={majorScale(2)} marginLeft={majorScale(2)}>
            <Song>
                <TrackList />
            </Song>
        </Pane>
    );
};

export { WorkstationPage };
