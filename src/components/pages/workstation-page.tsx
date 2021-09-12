import { Song } from "components/song";
import { TrackList } from "components/track-list";

interface WorkstationPageProps {}

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    return (
        <Song>
            <TrackList />
        </Song>
    );
};

export { WorkstationPage };
