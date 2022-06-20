import { Flex } from "components/flex";
import { RangeSlider } from "components/mantine/range-slider";
import { Slider } from "components/mantine/slider";
import { SelectMenu, SelectMenuItem } from "components/select-menu/select-menu";
import { SelectMenuTitle } from "components/select-menu/select-menu-title";
import { Scale } from "enums/scale";
import { Button, Label, majorScale } from "evergreen-ui";
import { useCallback, useEffect, useState } from "react";
import { defaultSettings } from "utils/hooks/use-piano-roll-randomizer-settings";
import { Range } from "types/range";

interface PianoRollRandomizerProps {
    close: () => void;
    onSettingsChange: (value: PianoRollRandomizerSettings) => void;
    settings: PianoRollRandomizerSettings;
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
     */
    stepRange: Range;
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
    const {
        close,
        onSettingsChange,
        settings: initialSettings,
        stepCount,
    } = props;

    const [settings, setSettings] = useState<PianoRollRandomizerSettings>(
        initialSettings ?? defaultSettings
    );

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
        setSettings(
            (prev): PianoRollRandomizerSettings => ({
                ...prev,
                scale: item.value,
            })
        );
    }, []);

    const handleNoteCountChange = useCallback((value: Range) => {
        setLocalNoteCount(value);
    }, []);

    const handleNoteCountChangeEnd = useCallback((value: Range) => {
        setSettings(
            (prev): PianoRollRandomizerSettings => ({
                ...prev,
                noteCount: value,
            })
        );
    }, []);

    const handleOctaveRangeChange = useCallback((value: Range) => {
        setLocalOctaveRange(value);
    }, []);

    const handleOctaveRangeChangeEnd = useCallback((value: Range) => {
        setSettings(
            (prev): PianoRollRandomizerSettings => ({
                ...prev,
                octaveRange: value,
            })
        );
    }, []);

    const handleStepRangeChange = useCallback((value: Range) => {
        setLocalStepRange([...value]);
    }, []);

    const handleStepRangeChangeEnd = useCallback((value: Range) => {
        setSettings(
            (prev): PianoRollRandomizerSettings => ({
                ...prev,
                stepRange: value,
            })
        );
    }, []);

    const handleChanceToAddStepChange = useCallback((value: number) => {
        setSettings((prev) => ({ ...prev, stepChance: value }));
    }, []);

    const handleReset = useCallback(() => {
        setSettings(defaultSettings);
    }, []);

    const handleConfirm = useCallback(() => {
        onSettingsChange?.(settings);
        close();
    }, [close, onSettingsChange, settings]);

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
                        selected={settings.scale}>
                        <Button size="small">{settings.scale}</Button>
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
                    onClick={handleReset}
                    size="small">
                    Reset
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

export type { PianoRollRandomizerSettings, PianoRollRandomizerProps };
export { PianoRollRandomizer };
