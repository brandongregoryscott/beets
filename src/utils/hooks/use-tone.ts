import { Project } from "generated/interfaces/project";
import { ToneState } from "interfaces/tone-state";
import { useAtom } from "jotai";
import { merge } from "lodash";
import { useCallback } from "react";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";
import { useToneBpmEffect } from "utils/hooks/use-tone-bpm-effect";
import { useToneMuteEffect } from "utils/hooks/use-tone-mute-effect";
import { useTonePlayingEffect } from "utils/hooks/use-tone-playing-effect";
import { useToneSwingEffect } from "utils/hooks/use-tone-swing-effect";
import { useToneVolumeEffect } from "utils/hooks/use-tone-volume-effect";

interface UseToneOptions extends Pick<Project, "bpm" | "swing" | "volume"> {}

interface UseToneResult extends ToneState {
    setIsPlaying: (isPlaying: boolean) => void;
    setMute: (isMuted: boolean) => void;
    toggleIsPlaying: () => void;
    toggleMute: () => void;
}

const useTone = (options?: UseToneOptions): UseToneResult => {
    const { bpm, swing, volume } = options ?? {};
    const [state, setState] = useAtom(ToneStateAtom);
    const { mute, isPlaying } = state;

    useToneSwingEffect(swing);
    useToneBpmEffect(bpm);
    useToneVolumeEffect(volume);
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

    return { ...state, setIsPlaying, setMute, toggleIsPlaying, toggleMute };
};

const mergeState = (previousState: ToneState, update: Partial<ToneState>) =>
    merge({}, previousState, update);

export { useTone };
