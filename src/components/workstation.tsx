import { Song } from "components/song";
import { TrackList } from "components/track-list";

interface WorkstationProps {}

const Workstation: React.FC<WorkstationProps> = (props: WorkstationProps) => {
    return (
        <Song>
            <TrackList />
        </Song>
    );
};

export { Workstation };
