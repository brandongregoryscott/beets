import { Track } from "components/song-composition/track";
import { List } from "immutable";
import { Reactronica } from "lib/reactronica";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { useProjectState } from "utils/hooks/use-project-state";
import { useTone } from "utils/hooks/use-tone";
import { useToneTracks } from "utils/hooks/use-tone-tracks";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface SongCompositionProps {
    files: List<FileRecord>;
    instruments: List<InstrumentRecord>;
}

const SongComposition: React.FC<SongCompositionProps> = (
    props: SongCompositionProps
) => {
    const { files, instruments } = props;
    const { state: project } = useProjectState();
    const { bpm, swing, volume } = project;
    console.log("files in SongComposition", files);
    const { mute, isPlaying } = useTone({
        bpm,
        swing,
        volume,
        files,
        instruments,
    });

    return null;
    // return (
    //     <Reactronica.Song
    //         bpm={bpm}
    //         isMuted={mute}
    //         isPlaying={isPlaying}
    //         swing={swing / 100}
    //         volume={volume}>
    //         {tracks.map((track) => (
    //             <Track
    //                 files={files}
    //                 instruments={instruments}
    //                 key={track.id}
    //                 track={track}
    //             />
    //         ))}
    //     </Reactronica.Song>
    // );
};

export { SongComposition };
