import { majorScale, Text, Pane } from "evergreen-ui";
import { MidiNote } from "reactronica";
import { MidiNoteUtils } from "utils/midi-note-utils";

interface PianoKeyProps {
    note: MidiNote;
}

const PianoKey: React.FC<PianoKeyProps> = (props: PianoKeyProps) => {
    const { note } = props;
    const isBlackKey = MidiNoteUtils.isSharp(note);
    const background = isBlackKey ? "black" : "white";
    const textColor = isBlackKey ? "white" : "black";
    const height = majorScale(3);
    const width = majorScale(6);
    return (
        <Pane
            background={background}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={height}
            width={width}>
            <Text color={textColor} size={300}>
                {note}
            </Text>
        </Pane>
    );
};

export { PianoKey };
