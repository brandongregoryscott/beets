import { List } from "immutable";
import { TrackRecord } from "models/track-record";
import { groupBy } from "./collection-utils";

describe("CollectionUtils", () => {
    describe("groupBy", () => {
        const matchById = (left: TrackRecord, right: TrackRecord): boolean =>
            left.id === right.id;

        it("given object exists in left collection but not right, object is not returned", () => {
            const left = List.of(new TrackRecord());
            const right = List<TrackRecord>();

            const result = groupBy(left, right, matchById);

            expect(result).toBeEmpty();
        });
    });
});
