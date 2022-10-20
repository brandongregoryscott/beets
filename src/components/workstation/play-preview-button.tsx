import { useCallback, useRef } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton, type PlayButtonProps } from "./play-button";

interface PlayPreviewButtonProps
    extends Omit<PlayButtonProps, "isPlaying" | "toggleIsPlaying"> {
    fileUrl?: string;
}

const PlayPreviewButton: React.FC<PlayPreviewButtonProps> = (
    props: PlayPreviewButtonProps
) => {
    const { fileUrl, ...iconButtonProps } = props;
    const audioRef = useRef<HTMLAudioElement>(null);
    const {
        value: isPlaying,
        toggle: toggleIsPlaying,
        setFalse: setIsPlayingFalse,
    } = useBoolean();
    const handlePlayClick = useCallback((isPlaying: boolean) => {
        if (isPlaying) {
            audioRef.current?.pause();
            return;
        }

        audioRef.current?.play();
    }, []);
    return (
        <>
            <PlayButton
                appearance="minimal"
                isPlaying={isPlaying}
                onClick={handlePlayClick}
                toggleIsPlaying={toggleIsPlaying}
                {...iconButtonProps}
            />
            {fileUrl != null && (
                <audio
                    onEnded={setIsPlayingFalse}
                    preload="none"
                    ref={audioRef}
                    src={fileUrl}
                />
            )}
        </>
    );
};

export { PlayPreviewButton };
