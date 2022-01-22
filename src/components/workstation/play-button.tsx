import {
    IconButton,
    IconButtonProps,
    PauseIcon,
    PlayIcon,
    Spinner,
} from "evergreen-ui";
import { useCallback, useMemo } from "react";

interface PlayButtonProps extends Omit<IconButtonProps, "icon" | "onClick"> {
    isPlaying: boolean;
    onClick?: (isPlaying: boolean) => void;
    toggleIsPlaying: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = (props: PlayButtonProps) => {
    const {
        isLoading,
        isPlaying,
        toggleIsPlaying,
        onClick,
        ...iconButtonProps
    } = props;
    const handleClick = useCallback(() => {
        onClick?.(isPlaying);
        toggleIsPlaying();
    }, [isPlaying, onClick, toggleIsPlaying]);

    const icon = useMemo(() => {
        if (isLoading) {
            return <Spinner />;
        }

        return isPlaying ? PauseIcon : PlayIcon;
    }, [isLoading, isPlaying]);
    return (
        <IconButton
            {...iconButtonProps}
            disabled={isLoading}
            icon={icon}
            onClick={handleClick}
        />
    );
};

export { PlayButton };
