import { SelectMenuItemRendererProps } from "components/select-menu";
import { FileRecord } from "models/file-record";
import { majorScale, minorScale, Option } from "evergreen-ui";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import React, { useCallback, useRef } from "react";

interface FileSelectMenuItemProps
    extends SelectMenuItemRendererProps<FileRecord> {}

const itemHeight = 33;

const FileSelectMenuItem: React.FC<FileSelectMenuItemProps> = (
    props: FileSelectMenuItemProps
) => {
    const { item, ...rest } = props;
    const {
        value: isPlaying,
        toggle: toggleIsPlaying,
        setFalse: setIsPlayingFalse,
    } = useBoolean();
    const audioRef = useRef<HTMLAudioElement>(null);
    const handleClick = useCallback((isPlaying: boolean) => {
        if (isPlaying) {
            audioRef.current?.pause();
            return;
        }

        audioRef.current?.play();
    }, []);

    return (
        <Option
            {...rest}
            height={itemHeight}
            maxHeight={itemHeight}
            minHeight={itemHeight}>
            <PlayButton
                appearance="minimal"
                isPlaying={isPlaying}
                marginLeft={minorScale(1)}
                marginRight={majorScale(1)}
                marginY={minorScale(1)}
                onClick={handleClick}
                size="small"
                toggleIsPlaying={toggleIsPlaying}
            />
            <audio
                onEnded={setIsPlayingFalse}
                preload="none"
                ref={audioRef}
                src={item.value.getPublicUrl()}
            />
            {item.value.name}
        </Option>
    );
};

export { FileSelectMenuItem };
