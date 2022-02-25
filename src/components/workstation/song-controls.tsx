import {
    IconButton,
    minorScale,
    Pane,
    VolumeOffIcon,
    VolumeUpIcon,
    Label,
    TextInput,
    majorScale,
    CaretDownIcon,
    CaretUpIcon,
    Heading,
} from "evergreen-ui";
import React, { ChangeEvent, useCallback } from "react";
import { useProjectState } from "utils/hooks/use-project-state";
import { isNilOrEmpty } from "utils/core-utils";
import { PlayButton } from "components/workstation/play-button";
import { useToneControls } from "utils/hooks/use-tone-controls";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { List } from "immutable";
import { InstrumentRecord } from "models/instrument-record";
import { FileRecord } from "models/file-record";

interface SongControlsProps {
    files?: List<FileRecord>;
    instruments?: List<InstrumentRecord>;
}

const marginRight = minorScale(2);
const SongControlsHeight = majorScale(9);

const SongControls: React.FC<SongControlsProps> = (
    props: SongControlsProps
) => {
    const { files, instruments } = props;
    const { state: workstationState } = useWorkstationState();
    const { state: project, setCurrentState } = useProjectState();
    const { bpm, swing, volume } = project;
    const {
        toggleMute,
        toggleIsPlaying,
        mute,
        isPlaying,
        startIndex,
        endIndex,
    } = useToneControls();

    const { isLoading } = useToneAudio({
        bpm,
        swing,
        volume,
        startIndex,
        endIndex,
        isPlaying,
        tracks: workstationState.tracks,
        trackSections: workstationState.trackSections,
        trackSectionSteps: workstationState.trackSectionSteps,
        files,
        instruments,
    });

    const handleNumberChange = useCallback(
        (min: number, max: number, setState: (value: number) => void) =>
            (event: ChangeEvent<HTMLInputElement>) => {
                const { value: inputValue } = event.target;

                if (isNilOrEmpty(inputValue)) {
                    return;
                }

                const value = Number(inputValue);
                if (
                    value == null ||
                    isNaN(value) ||
                    value < min ||
                    value > max
                ) {
                    return;
                }

                setState(value);
            },
        []
    );

    const setBpm = useCallback(
        (bpm: number) => setCurrentState((prev) => prev.merge({ bpm })),
        [setCurrentState]
    );

    const setSwing = useCallback(
        (swing: number) => setCurrentState((prev) => prev.merge({ swing })),
        [setCurrentState]
    );

    const handleDecrementVolume = useCallback(
        () =>
            setCurrentState((prev) => prev.merge({ volume: prev.volume - 1 })),
        [setCurrentState]
    );

    const handleIncrementVolume = useCallback(
        () =>
            setCurrentState((prev) => prev.merge({ volume: prev.volume + 1 })),
        [setCurrentState]
    );

    return (
        <Pane height={SongControlsHeight}>
            <Heading marginBottom={majorScale(1)} size={500}>
                {project.name}
            </Heading>
            <Pane
                alignItems="center"
                display="flex"
                flexDirection="row"
                marginBottom={majorScale(2)}>
                <PlayButton
                    isLoading={isLoading}
                    isPlaying={isPlaying ?? false}
                    marginRight={marginRight}
                    toggleIsPlaying={toggleIsPlaying}
                />
                <IconButton
                    icon={mute ? VolumeOffIcon : VolumeUpIcon}
                    marginRight={marginRight}
                    onClick={toggleMute}
                />
                <Label
                    fontSize="x-small"
                    marginRight={marginRight}
                    textTransform="uppercase">
                    BPM
                </Label>
                <TextInput
                    marginRight={marginRight}
                    maxWidth={majorScale(6)}
                    onChange={handleNumberChange(1, 200, setBpm)}
                    value={bpm.toString()}
                />
                <Label
                    fontSize="x-small"
                    marginRight={marginRight}
                    textTransform="uppercase">
                    Swing
                </Label>
                <TextInput
                    marginRight={marginRight}
                    maxWidth={majorScale(6)}
                    onChange={handleNumberChange(0, 100, setSwing)}
                    value={swing.toString()}
                />
                <Label
                    fontSize="x-small"
                    marginRight={marginRight}
                    textTransform="uppercase">
                    Vol
                </Label>
                <Label
                    fontSize="x-small"
                    marginRight={marginRight}
                    width={minorScale(3)}>
                    {volume}
                </Label>
                <IconButton
                    icon={CaretDownIcon}
                    marginRight={marginRight}
                    onClick={handleDecrementVolume}
                />
                <IconButton
                    icon={CaretUpIcon}
                    marginRight={marginRight}
                    onClick={handleIncrementVolume}
                />
            </Pane>
        </Pane>
    );
};

export { SongControls, SongControlsHeight };
