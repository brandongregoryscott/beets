import { List } from "immutable";
import { ToneState } from "interfaces/tone-state";
import { useAtom } from "jotai";
import { merge, isNil } from "lodash";
import { useCallback } from "react";
import { isHotkeyPressed } from "react-hotkeys-hook";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";
import { useToneMuteEffect } from "utils/hooks/use-tone-mute-effect";
import { useTonePlayingEffect } from "utils/hooks/use-tone-playing-effect";

interface UseToneControlsResult extends ToneState {
    isSelected: (index: number) => boolean;
    onIndexClick: (index: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setMute: (isMuted: boolean) => void;
    toggleIsPlaying: () => void;
    toggleMute: () => void;
}

const useToneControls = (): UseToneControlsResult => {
    const [state, setState] = useAtom(ToneStateAtom);
    const { mute, isPlaying, endIndex, startIndex } = state;

    useTonePlayingEffect(isPlaying);
    useToneMuteEffect(mute);

    const setIsPlaying = useCallback(
        (isPlaying: boolean) =>
            setState((prev) => mergeState(prev, { isPlaying })),
        [setState]
    );

    const setMute = useCallback(
        (mute: boolean) => setState((prev) => mergeState(prev, { mute })),
        [setState]
    );

    const toggleIsPlaying = useCallback(
        () =>
            setState((prev) =>
                mergeState(prev, { isPlaying: !prev.isPlaying })
            ),
        [setState]
    );

    const toggleMute = useCallback(
        () => setState((prev) => mergeState(prev, { mute: !prev.mute })),
        [setState]
    );

    const onIndexClick = useCallback(
        (index: number) => {
            if (!isHotkeyPressed("shift")) {
                setState((prev) => ({
                    ...prev,
                    startIndex: startIndex === index ? undefined : index,
                    endIndex: undefined,
                }));

                return;
            }

            const indexes = List([startIndex, endIndex, index])
                .filterNot(isNil)
                .sort();

            setState((prev) => ({
                ...prev,
                startIndex: indexes.first(),
                endIndex: indexes.last(),
            }));
        },
        [endIndex, setState, startIndex]
    );

    const isSelected = useCallback(
        (index: number) => {
            if (startIndex == null) {
                return false;
            }

            if (endIndex == null) {
                return index === startIndex;
            }

            return index >= startIndex && index <= endIndex;
        },
        [endIndex, startIndex]
    );

    return {
        ...state,
        setIsPlaying,
        setMute,
        toggleIsPlaying,
        toggleMute,
        onIndexClick,
        isSelected,
    };
};

const mergeState = (previousState: ToneState, update: Partial<ToneState>) =>
    merge({}, previousState, update);

export { useToneControls };
