import {
    IconButton,
    minorScale,
    Pane,
    PauseIcon,
    PlayIcon,
    VolumeOffIcon,
    VolumeUpIcon,
    Label,
    TextInput,
    majorScale,
    CaretDownIcon,
    CaretUpIcon,
    Heading,
} from "evergreen-ui";
import { ChangeEvent, PropsWithChildren, useCallback } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { Song as ReactronicaSong } from "reactronica";
import { useProjectState } from "utils/hooks/use-project-state";
import { isNilOrEmpty } from "utils/core-utils";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";

interface SongControlsProps {}

const marginRight = minorScale(2);

const SongControls: React.FC<SongControlsProps> = (
    props: PropsWithChildren<SongControlsProps>
) => {
    const { children } = props;
    const { state: project, setCurrentState } = useProjectState();
    const { onPause } = useReactronicaState();
    const { bpm, swing, volume } = project;
    const { value: isMuted, toggle: toggleIsMuted } = useBoolean(false);
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean(false);

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

    const handlePlayingClick = useCallback(() => {
        if (isPlaying) {
            onPause();
        }

        toggleIsPlaying();
    }, [isPlaying, onPause, toggleIsPlaying]);

    return (
        <Pane>
            <Heading size={500} marginBottom={majorScale(1)}>
                {project.name}
            </Heading>
            <Pane
                display="flex"
                flexDirection="row"
                alignItems="center"
                marginBottom={majorScale(1)}>
                <IconButton
                    icon={isPlaying ? PauseIcon : PlayIcon}
                    marginRight={marginRight}
                    onClick={handlePlayingClick}
                />
                <IconButton
                    icon={isMuted ? VolumeOffIcon : VolumeUpIcon}
                    marginRight={marginRight}
                    onClick={toggleIsMuted}
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
            <ReactronicaSong
                isMuted={isMuted}
                isPlaying={isPlaying}
                bpm={bpm}
                volume={volume}
                swing={swing / 100}>
                {children}
            </ReactronicaSong>
        </Pane>
    );
};

export { SongControls };
