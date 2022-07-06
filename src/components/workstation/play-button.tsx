import type { IconButtonProps } from "evergreen-ui";
import { IconButton, PauseIcon, PlayIcon, Spinner } from "evergreen-ui";
import React, { useCallback, useMemo } from "react";
import * as Tone from "tone";

interface PlayButtonProps extends Omit<IconButtonProps, "icon" | "onClick"> {
    isPlaying: boolean;
    onClick?: (isPlaying: boolean) => void;
    toggleIsPlaying: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = (props: PlayButtonProps) => {
    const {
        disabled = false,
        isLoading = false,
        isPlaying = false,
        toggleIsPlaying,
        onClick,
        ...iconButtonProps
    } = props;
    const handleClick = useCallback(
        async (event: React.MouseEvent) => {
            // Ensure AudioContext is started
            await Tone.start();
            event.stopPropagation();
            onClick?.(isPlaying);
            toggleIsPlaying();
        },
        [isPlaying, onClick, toggleIsPlaying]
    );

    const icon = useMemo(() => {
        if (isLoading) {
            return <Spinner />;
        }

        return isPlaying ? PauseIcon : PlayIcon;
    }, [isLoading, isPlaying]);
    return (
        <IconButton
            {...iconButtonProps}
            disabled={isLoading || disabled}
            icon={icon}
            onClick={handleClick}
        />
    );
};

export { PlayButton };
