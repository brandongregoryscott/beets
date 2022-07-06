import { immutableAtomWithStorage } from "utils/atoms/immutable-atom-with-storage";
import { Map } from "immutable";
import type { PianoRollRandomizerSettings } from "components/piano-roll/piano-roll-randomizer";

const PianoRollRandomizerSettingsAtom = immutableAtomWithStorage<
    Map<string, PianoRollRandomizerSettings>
>("pianoRollRandomizerSettings", Map(), Map);

export { PianoRollRandomizerSettingsAtom };
