import { IconButton } from "components/icon-button";
import { SelectMenu, SelectMenuItem } from "components/select-menu/select-menu";
import { Scale } from "enums/scale";
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
    }, [file?.id, onChange, scale, stepCount, trackSection.id]);

    return (
        <Group>
            <IconButton icon={RandomIcon} onClick={handleRandomClick} />
        </Group>
    );
};

export { PianoRollRandomizer };
