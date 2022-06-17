import { IconButton } from "components/icon-button";
import { SelectMenu, SelectMenuItem } from "components/select-menu/select-menu";
import { Button, Group, RandomIcon } from "evergreen-ui";
import { List, Range } from "immutable";
import { flatMap, range } from "lodash";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";
import { scale as getChordsByScale } from "scribbletune";
import { isNotNilOrEmpty, randomInt, randomValue } from "utils/core-utils";

interface PianoRollRandomizerProps {
    file?: FileRecord;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
}

/* eslint-disable typescript-sort-keys/string-enum */
enum Scale {
    C_MAJOR = "C major",
    C_SHARP_MAJOR = "C# major",
    D_MAJOR = "D major",
    D_SHARP_MAJOR = "D# major",
    E_MAJOR = "E major",
    F_MAJOR = "F major",
    F_SHARP_MAJOR = "F# major",
    G_MAJOR = "G major",
    G_SHARP_MAJOR = "G# major",
    A_MAJOR = "A major",
    A_SHARP_MAJOR = "A# major",
    B_MAJOR = "B major",
    C_MINOR = "C minor",
    C_SHARP_MINOR = "C# minor",
    D_MINOR = "D minor",
    D_SHARP_MINOR = "D# minor",
    E_MINOR = "E minor",
    F_MINOR = "F minor",
    F_SHARP_MINOR = "F# minor",
    G_MINOR = "G minor",
    G_SHARP_MINOR = "G# minor",
    A_MINOR = "A minor",
    A_SHARP_MINOR = "A# minor",
    B_MINOR = "B minor",
}

const options: Array<SelectMenuItem<Scale>> = Object.entries(Scale).map(
    ([label, value]): SelectMenuItem<Scale> => ({
        id: label,
        label: value,
        value,
    })
);

const PianoRollRandomizer: React.FC<PianoRollRandomizerProps> = (
    props: PianoRollRandomizerProps
) => {
    const { file, stepCount, onChange, trackSection } = props;
    const [scale, setScale] = useState<Scale>(Scale.C_MAJOR);

    const handleSelect = useCallback((item: SelectMenuItem<Scale>) => {
        setScale(item.value);
    }, []);

    const handleRandomClick = useCallback(() => {
        const notes: string[] = flatMap(range(1, 5), (octave) =>
            getChordsByScale(`${scale.replace(" ", `${octave} `)}`)
        );

        const steps = Range(0, stepCount)
            .flatMap((index: number) => {
                if (randomInt(0, 100) < 30) {
                    return List<TrackSectionStepRecord>();
                }

                const steps = Range(0, randomInt(1, 4)).map(
                    () =>
                        new TrackSectionStepRecord({
                            index,
                            file_id: file?.id,
                            track_section_id: trackSection.id,
                            note: randomValue(notes),
                        })
                );

                return steps;
            })
            .toList();

        onChange(steps.filter(isNotNilOrEmpty));
    }, []);

    return (
        <Group>
            <SelectMenu<Scale>
                closeOnSelect={true}
                hasFilter={false}
                hasTitle={false}
                onSelect={handleSelect}
                options={options}
                selected={scale}>
                <Button>{scale}</Button>
            </SelectMenu>
            <IconButton icon={RandomIcon} onClick={handleRandomClick} />
        </Group>
    );
};

export { PianoRollRandomizer };
