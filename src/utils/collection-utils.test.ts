import { List, Range } from "immutable";
import { random } from "lodash";
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

        it("given object exists in right collection but not left, object is not returned", () => {
            const left = List<TrackRecord>();
            const right = List.of(new TrackRecord());

            const result = groupBy(left, right, matchById);

            expect(result).toBeEmpty();
        });

        it("given object exists in both collections, object is returned", () => {
            const object = new TrackRecord();
            const left = List.of(object);
            const right = List.of(object);

            const result = groupBy(left, right, matchById);

            expect(result).not.toBeEmpty();
            const grouping = result.first()!;
            expect(grouping.left).toBe(object);
            expect(grouping.right).toBe(object);
        });

        it("given object exists in both collections but is in different order, object is returned", () => {
            const objects = Range(0, 10)
                .map(() => new TrackRecord())
                .toList();
            const left = List(objects);
            const right = List(objects).sort(() => random());

            const result = groupBy(left, right, matchById);

            expect(result).not.toBeEmpty();
            expect(result.count()).toBe(objects.count());
        });
    });
});
