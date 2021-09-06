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
} from "evergreen-ui";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { Song as ReactronicaSong } from "reactronica";

interface SongProps {}

const marginRight = minorScale(2);

const Song: React.FC<SongProps> = (props: PropsWithChildren<SongProps>) => {
    const { children } = props;
    const { value: isMuted, toggle: toggleIsMuted } = useBoolean(false);
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean(false);
    const [bpm, setBpm] = useState<number | undefined>(80);
    const [volume, setVolume] = useState<number>(0);

    const handleNumberChange =
        (
            min: number,
            max: number,
            setState: (value: number | undefined) => void
        ) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            if (value === "") {
                setState(undefined);
                return;
            }

            const valueAsNumber = Number(value);
            if (
                valueAsNumber == null ||
                isNaN(valueAsNumber) ||
                valueAsNumber < min ||
                valueAsNumber > max
            ) {
                return;
            }

            setState(valueAsNumber);
        };

    const handleDecrementVolume = () => setVolume((prev: number) => --prev);
    const handleIncrementVolume = () => setVolume((prev: number) => ++prev);

    return (
        <Pane>
            <Pane display="flex" flexDirection="row" alignItems="center">
                <IconButton
                    icon={isPlaying ? PauseIcon : PlayIcon}
                    marginRight={marginRight}
                    onClick={toggleIsPlaying}
                />
                <IconButton
                    icon={isMuted ? VolumeOffIcon : VolumeUpIcon}
                    marginRight={marginRight}
                    onClick={toggleIsMuted}
                />
                <Label fontSize="x-small" marginRight={marginRight}>
                    BPM
                </Label>
                <TextInput
                    marginRight={marginRight}
                    maxWidth={majorScale(6)}
                    onChange={handleNumberChange(1, 999, setBpm)}
                    value={bpm?.toString()}
                />
                <Label fontSize="x-small" marginRight={marginRight}>
                    VOL
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
                volume={volume}>
                {children}
            </ReactronicaSong>
        </Pane>
    );
};

export { Song };
