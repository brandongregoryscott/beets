import { SelectMenuItemRendererProps } from "components/select-menu/select-menu";
import { FileRecord } from "models/file-record";
import { majorScale, minorScale, Option } from "evergreen-ui";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import React, { useCallback, useRef } from "react";
import { isInstanceOf } from "utils/core-utils";

interface FileSelectMenuItemProps
    extends SelectMenuItemRendererProps<FileRecord> {}

const ignoredClickTargets = [SVGSVGElement, SVGPathElement, HTMLButtonElement];
const itemHeight = 33;

const FileSelectMenuItem: React.FC<FileSelectMenuItemProps> = (
    props: FileSelectMenuItemProps
) => {
    const { item, isSelectable, isSelected, onSelect, onDeselect, ...rest } =
        props;
    const {
        value: isPlaying,
        toggle: toggleIsPlaying,
        setFalse: setIsPlayingFalse,
    } = useBoolean();
    const audioRef = useRef<HTMLAudioElement>(null);
    const handlePlayClick = useCallback((isPlaying: boolean) => {
        if (isPlaying) {
            audioRef.current?.pause();
            return;
        }

        audioRef.current?.play();
    }, []);

    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            const { target } = event;
            // Stop event from propagating down - will cause the click to close the SelectMenu when
            // the 'showSelected' filter is applied and there's only one option left
            event.stopPropagation();

            if (!isSelectable) {
                return;
            }

            // Prevent events from the <PlayButton /> from selecting/deselecting item
            if (isInstanceOf(target, ...ignoredClickTargets)) {
                return;
            }

            if (isSelected) {
                onDeselect();
                return;
            }

            onSelect();
        },
        [isSelectable, isSelected, onDeselect, onSelect]
    );

    return (
        <Option
            {...rest}
            height={itemHeight}
            isSelected={isSelected}
            maxHeight={itemHeight}
            minHeight={itemHeight}
            onClick={handleClick}>
            <PlayButton
                appearance="minimal"
                isPlaying={isPlaying}
                marginLeft={minorScale(1)}
                marginRight={majorScale(1)}
                marginY={minorScale(1)}
                onClick={handlePlayClick}
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
