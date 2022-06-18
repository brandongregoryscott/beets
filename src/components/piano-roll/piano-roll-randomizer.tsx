import { Flex } from "components/flex";
import { RangeSlider, Range } from "components/mantine/range-slider";
import { Slider } from "components/mantine/slider";
import { SelectMenu, SelectMenuItem } from "components/select-menu/select-menu";
import { SelectMenuTitle } from "components/select-menu/select-menu-title";
import { Scale } from "enums/scale";
import { Button, Label, majorScale } from "evergreen-ui";
import { useCallback, useEffect, useState } from "react";

interface PianoRollRandomizerProps {
    close: () => void;
    onChange?: (settings: PianoRollRandomizerSettings) => void;
    settings?: PianoRollRandomizerSettings;
    stepCount: number;
}

interface PianoRollRandomizerSettings {
    /**
     * Minimum-maximum number of notes to generate per step
     */
    noteCount: Range;
    /**
     * Minimum-maximum octave to generate notes in
     */
    octaveRange: Range;
    /**
     * The scale to use for randomization.
     */
    scale: Scale;
    /**
     * Chance of note(s) being generated for a given step
     */
    stepChance: number;
    /**
     * First - last steps to generate notes for
     *
     */
    stepRange: Range;
}

const defaultSettings: PianoRollRandomizerSettings = {
    scale: Scale.C_MAJOR,
    stepChance: 30,
    noteCount: [1, 3],
    octaveRange: [4, 4],
    stepRange: [1, 8],
};

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
    const { close, onChange, settings: initialSettings, stepCount } = props;

    const [settings, setSettings] = useState<PianoRollRandomizerSettings>(
        initialSettings ?? defaultSettings
    );

    const [localScale, setLocalScale] = useState<Scale>(settings.scale);
    const [localStepChance, setLocalStepChance] = useState<number>(
        settings.stepChance
    );

    const [localNoteCount, setLocalNoteCount] = useState<Range>(
        settings.noteCount
    );

    const [localOctaveRange, setLocalOctaveRange] = useState<Range>(
        settings.octaveRange
    );

    const [localStepRange, setLocalStepRange] = useState<Range>(
        settings.stepRange
    );

    const handleSelect = useCallback((item: SelectMenuItem<Scale>) => {
        setLocalScale(item.value);
    }, []);

    const handleNoteCountChange = useCallback((value: Range) => {
        setLocalNoteCount(value);
    }, []);

    const handleNoteCountChangeEnd = useCallback((value: Range) => {
        const [minimumNoteCount, maximumNoteCount] = value;

        setSettings((prev) => ({
            ...prev,
            minimumNoteCount,
            maximumNoteCount,
        }));
    }, []);

    const handleOctaveRangeChange = useCallback((value: Range) => {
        setLocalOctaveRange(value);
    }, []);

    const handleOctaveRangeChangeEnd = useCallback((value: Range) => {
        const [minimumOctave, maximumOctave] = value;

        setSettings((prev) => ({
            ...prev,
            minimumOctave,
            maximumOctave,
        }));
    }, []);

    const handleStepRangeChange = useCallback((value: Range) => {
        setLocalStepRange(value);
    }, []);

    const handleStepRangeChangeEnd = useCallback((value: Range) => {
        const [stepStartRange, stepEndRange] = value;

        setSettings((prev) => ({
            ...prev,
            stepStartRange,
            stepEndRange,
        }));
    }, []);

    const handleChanceToAddStepChange = useCallback((value: number) => {
        setSettings((prev) => ({ ...prev, stepChance: value }));
    }, []);

    const handleClear = useCallback(() => {
        setSettings(defaultSettings);
    }, []);

    const handleConfirm = useCallback(() => {
        onChange?.(settings);
        close();
    }, [close, onChange, settings]);

    useEffect(
        () => setLocalStepChance(settings.stepChance),
        [settings.stepChance]
    );

    useEffect(() => {
        setLocalNoteCount(settings.noteCount);
    }, [settings.noteCount]);

    useEffect(() => {
        setLocalOctaveRange(settings.octaveRange);
    }, [settings.octaveRange]);

    useEffect(() => {
        setLocalStepRange(settings.stepRange);
    }, [settings.stepRange]);

    return (
        <Flex.Column width={majorScale(30)}>
            <SelectMenuTitle close={close} title="Randomizer Settings" />

            <Flex.Column padding={majorScale(2)}>
                <Flex.Row alignItems="center" marginBottom={majorScale(2)}>
                    <Label
                        fontSize="x-small"
                        marginRight={majorScale(1)}
                        textTransform="uppercase">
                        Scale
                    </Label>
                    <SelectMenu<Scale>
                        closeOnSelect={true}
                        hasFilter={false}
                        hasTitle={false}
                        onSelect={handleSelect}
                        options={options}
                        selected={localScale}>
                        <Button size="small">{localScale}</Button>
                    </SelectMenu>
                </Flex.Row>
                <Flex.Row marginBottom={majorScale(2)}>
                    <Slider
                        label="Step Chance"
                        max={100}
                        min={1}
                        onChange={setLocalStepChance}
                        onChangeEnd={handleChanceToAddStepChange}
                        value={localStepChance}
                        width="100%"
                    />
                </Flex.Row>
                <Flex.Row marginBottom={majorScale(2)}>
                    <RangeSlider
                        label="Note Count"
                        max={5}
                        min={1}
                        minRange={0}
                        onChange={handleNoteCountChange}
                        onChangeEnd={handleNoteCountChangeEnd}
                        value={localNoteCount}
                        width="100%"
                    />
                </Flex.Row>
                <Flex.Row marginBottom={majorScale(2)}>
                    <RangeSlider
                        label="Octave Range"
                        max={7}
                        min={1}
                        minRange={0}
                        onChange={handleOctaveRangeChange}
                        onChangeEnd={handleOctaveRangeChangeEnd}
                        value={localOctaveRange}
                        width="100%"
                    />
                </Flex.Row>
                <Flex.Row marginBottom={majorScale(2)}>
                    <RangeSlider
                        label="Step Range"
                        max={stepCount}
                        min={1}
                        minRange={0}
                        onChange={handleStepRangeChange}
                        onChangeEnd={handleStepRangeChangeEnd}
                        value={localStepRange}
                        width="100%"
                    />
                </Flex.Row>
            </Flex.Column>
            <Flex.Row borderTop={true} padding={majorScale(1)}>
                <Button
                    marginLeft="auto"
                    marginRight={majorScale(1)}
                    onClick={handleClear}
                    size="small">
                    Clear
                </Button>
                <Button
                    appearance="primary"
                    onClick={handleConfirm}
                    size="small">
                    Apply
                </Button>
            </Flex.Row>
        </Flex.Column>
    );
};

export type { PianoRollRandomizerSettings };
export { PianoRollRandomizer };
