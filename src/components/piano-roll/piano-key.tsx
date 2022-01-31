import { majorScale, Text, Pane } from "evergreen-ui";
import { memo } from "react";
import { MidiNote } from "lib/reactronica";
import { MidiNoteUtils } from "utils/midi-note-utils";

interface PianoKeyProps {
    note: MidiNote;
}

const PianoKey: React.FC<PianoKeyProps> = (props: PianoKeyProps) => {
    const { note } = props;
    const isBlackKey = MidiNoteUtils.isSharp(note);
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
                {note}
            </Text>
        </Pane>
    );
};

const MemoizedPianoKey = memo(PianoKey);

export { MemoizedPianoKey as PianoKey };
