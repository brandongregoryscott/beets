import type { PianoRollRandomizerSettings } from "components/piano-roll/piano-roll-randomizer";
import { Scale } from "enums/scale";
import { useAtom } from "jotai";
import { isFunction } from "lodash";
import type { TrackRecord } from "models/track-record";
import type { SetStateAction } from "react";
import { useCallback, useMemo } from "react";
import { PianoRollRandomizerSettingsAtom } from "utils/atoms/piano-roll-randomizer-settings-atom";

interface UsePianoRollRandomizerSettingsOptions {
    track: TrackRecord;
}

interface UsePianoRollRandomizerSettingsResult {
    setSettings: (
        settings: SetStateAction<PianoRollRandomizerSettings>
    ) => void;
    settings: PianoRollRandomizerSettings;
}

const defaultSettings: PianoRollRandomizerSettings = {
    scale: Scale.C_MAJOR,
    stepChance: 30,
    noteCount: [1, 3],
    octaveRange: [4, 4],
    stepRange: [1, 8],
};

const usePianoRollRandomizerSettings = (
    options: UsePianoRollRandomizerSettingsOptions
): UsePianoRollRandomizerSettingsResult => {
    const { track } = options;
    const { id: trackId } = track;
    const [allSettings, setAllSettings] = useAtom(
        PianoRollRandomizerSettingsAtom
    );

    const settings = useMemo(
        () => allSettings.get(trackId) ?? defaultSettings,
        [allSettings, trackId]
    );

    const setSettings = useCallback(
        (updatedSettings: SetStateAction<PianoRollRandomizerSettings>) => {
            const value = isFunction(updatedSettings)
                ? updatedSettings(settings)
                : updatedSettings;
            setAllSettings((prev) => prev.set(trackId, value));
        },
        [setAllSettings, settings, trackId]
    );

    return {
        settings,
        setSettings,
    };
};

export type {
    UsePianoRollRandomizerSettingsOptions,
    UsePianoRollRandomizerSettingsResult,
};
export { defaultSettings, usePianoRollRandomizerSettings };
