import { PianoKey } from "components/piano-roll/piano-key";
import { MidiNotes } from "constants/midi-notes";
import { Pane } from "evergreen-ui";
import { TrackSectionRecord } from "models/track-section-record";

interface PianoRollProps {
    trackSection?: TrackSectionRecord;
}

const PianoRoll: React.FC<PianoRollProps> = (props: PianoRollProps) => {
    return (
        <Pane display="flex" flexDirection="column">
            {MidiNotes.map((note) => (
                <PianoKey key={note} note={note} />
            ))}
        </Pane>
    );
};

export { PianoRoll };
