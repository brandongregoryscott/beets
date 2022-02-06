import { Track } from "components/song-composition/track";
import { List } from "immutable";
import { Reactronica } from "lib/reactronica";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { useProjectState } from "utils/hooks/use-project-state";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { useTracksState } from "utils/hooks/use-tracks-state";

interface SongCompositionProps {
    files: List<FileRecord>;
    instruments: List<InstrumentRecord>;
}

const SongComposition: React.FC<SongCompositionProps> = (
    props: SongCompositionProps
) => {
    const { files, instruments } = props;
    const { state: reactronicaState } = useReactronicaState();
    const { isMuted, isPlaying } = reactronicaState;
    const { state: project } = useProjectState();
    const { state: tracks } = useTracksState();
    const { bpm, swing, volume } = project;

    return (
        <Reactronica.Song
            bpm={bpm}
            isMuted={isMuted}
            isPlaying={isPlaying}
            swing={swing / 100}
            volume={volume}>
            {tracks.map((track) => (
                <Track
                    files={files}
                    instruments={instruments}
                    key={track.id}
                    track={track}
                />
            ))}
        </Reactronica.Song>
    );
};

export { SongComposition };
