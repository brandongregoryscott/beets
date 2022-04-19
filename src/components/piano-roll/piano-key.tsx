import { majorScale, Text, Pane } from "evergreen-ui";
import { isNumber } from "lodash";
import { MidiNote } from "types/midi-note";
import { isMidiNote, isSharp } from "utils/midi-note-utils";

interface PianoKeyProps {
    noteOrIndex?: MidiNote | number;
}

const PianoKey: React.FC<PianoKeyProps> = (props: PianoKeyProps) => {
    const { noteOrIndex } = props;
    const isSharpNote = isMidiNote(noteOrIndex) && isSharp(noteOrIndex);
    const is4thBeat = isNumber(noteOrIndex) && noteOrIndex % 4 === 0;
    const isBlackKey = isSharpNote || is4thBeat;
    const background = isBlackKey ? "black" : "white";
    const textColor = isBlackKey ? "white" : "black";
    const height = majorScale(4);
    const width = majorScale(4);
    return (
        <Pane
            alignItems="center"
            background={background}
            display="flex"
            flexGrow={1}
            height={height}
            justifyContent="center"
            maxHeight={height}
            maxWidth={width}
            minHeight={height}
            minWidth={width}
            width={width}>
            <Text color={textColor} cursor="default" size={300}>
                {noteOrIndex}
            </Text>
        </Pane>
    );
};

export { PianoKey };
