import { useTrackSectionsState } from "hooks/use-track-sections-state";
import { range, uniqueId } from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { act, renderHook } from "@testing-library/react";
import type { Atom } from "jotai";
import { Provider } from "jotai";
import { Provider as _Provider } from "jotai/react";
import { CurrentWorkstationStateAtom } from "atoms/workstation-atom";
import { WorkstationStateRecord } from "models/workstation-state-record";
import type { RecordParams } from "types/record-params";

describe(useTrackSectionsState.name, () => {
    const mockWorkstationStateAtom = (
        values?: RecordParams<WorkstationStateRecord>
    ): readonly [Atom<WorkstationStateRecord>, WorkstationStateRecord] => [
        CurrentWorkstationStateAtom,
        new WorkstationStateRecord(values),
    ];

    describe("setState", () => {
        it("should copy list-indexes to index property on each item", () => {
            const trackId = uniqueId();
            const trackSections = range(0, 3).map(
                (index) => new TrackSectionRecord({ track_id: trackId, index })
            );

            const { result } = renderHook(useTrackSectionsState, {
                initialProps: { trackId },
                wrapper: ({ children }) => (
                    <Provider
                        initialValues={[
                            mockWorkstationStateAtom({ trackSections }),
                        ]}>
                        {children}
                    </Provider>
                ),
            });

            act(() => {
                result.current.setState((prev) => prev.remove(1));
            });

            expect(result.current.state.count()).toBe(2);
            expect(
                result.current.state
                    .filter(
                        (trackSection) =>
                            trackSection.index === 0 || trackSection.index === 1
                    )
                    .count()
            ).toBe(2);
        });
    });
});
