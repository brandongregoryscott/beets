import { PianoKey } from "components/piano-roll/piano-key";
import { MidiNotes } from "constants/midi-notes";
import { Pane } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";

interface PianoRollProps {}

const PianoRoll: React.FC<PianoRollProps> = (props: PianoRollProps) => {
    const theme = useTheme();
    return (
        <Pane display="flex" flexDirection="column">
            {MidiNotes.map((note) => (
                <PianoKey key={note} note={note} />
            ))}
        </Pane>
    );
};

export { PianoRoll };
