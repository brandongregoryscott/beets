import { useAtomValue } from "jotai/utils";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";
import {
    clampIndexToRange,
    ClampIndexToRangeOptions,
} from "utils/track-section-step-utils";

interface UseCurrentIndexOptions
    extends Pick<ClampIndexToRangeOptions, "startIndex" | "endIndex"> {}

const useCurrentIndex = (options: UseCurrentIndexOptions) => {
    const { startIndex, endIndex } = options;
    const index = useAtomValue(CurrentIndexAtom);

    return clampIndexToRange({
        index,
        startIndex,
        endIndex,
    });
};

export { useCurrentIndex };
