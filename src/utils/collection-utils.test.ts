import { List, Range } from "immutable";
import { random } from "lodash";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { getCurrentTime } from "utils/date-utils";

import { diffUpdatedEntities, groupBy } from "./collection-utils";

describe("CollectionUtils", () => {
    describe("diffUpdatedEntities", () => {
        it("should return left-side record when record is not persisted", () => {
            // Arrange
            const expected = new TrackRecord().merge({
                created_on: undefined,
            });
            const values = List.of(expected);
            const initialValues = List.of(expected);

            // Act
            const result = diffUpdatedEntities(values, initialValues);

            // Assert
            expect(
                result.find((record) => record.equals(expected))
            ).not.toBeNil();
        });

        it("should return left-side POJO when not persisted", () => {
            // Arrange
            const expected = new TrackRecord()
                .merge({
                    created_on: undefined,
                })
                .toPOJO();
            const values = List.of(expected);
            const initialValues = List.of(expected);

            // Act
            const result = diffUpdatedEntities(values, initialValues);

            // Assert
            expect(
                result.find((record) => record.id === expected.id)
            ).not.toBeNil();
        });

        it("should not return record that is unmodified", () => {
            // Arrange
            const unexpected = new TrackRecord().merge({
                created_on: getCurrentTime(),
            });
            const values = List.of(unexpected);
            const initialValues = List.of(unexpected);

            // Act
            const result = diffUpdatedEntities(values, initialValues);

            // Assert
            expect(result).toBeEmpty();
        });

        it("should return record that is modified from initial collection", () => {
            // Arrange
            const initialRecord = new TrackRecord().merge({
                created_on: getCurrentTime(),
                name: "Initial",
            });
            const updatedRecord = initialRecord.merge({ name: "Updated" });
            const values = List.of(initialRecord);
            const initialValues = List.of(updatedRecord);

            // Act
            const result = diffUpdatedEntities(values, initialValues);

            // Assert
            expect(
                result.find((record) => record.id === initialRecord.id)
            ).not.toBeNil();
        });

        it("should return record that is modified from initial collection when order is different", () => {
            // Arrange
            const initialRecord = new TrackRecord().merge({
                created_on: getCurrentTime(),
                name: "Initial",
            });
            const unexpected = new TrackRecord();
            const updatedRecord = initialRecord.merge({ name: "Updated" });
            const values = List.of(unexpected, initialRecord);
            const initialValues = List.of(updatedRecord, unexpected);

            // Act
            const result = diffUpdatedEntities(values, initialValues);

            // Assert
            expect(
                result.find((record) => record.id === initialRecord.id)
            ).not.toBeNil();
        });
    });

    describe("groupBy", () => {
        const matchById = (left: TrackRecord, right: TrackRecord): boolean =>
            left.id === right.id;

        it("given object exists in left collection but not right, object is not returned", () => {
            // Arrange
            const left = List.of(new TrackRecord());
            const right = List<TrackRecord>();

            // Act
            const result = groupBy(left, right, matchById);

            // Assert
            expect(result).toBeEmpty();
        });

        it("given object exists in right collection but not left, object is not returned", () => {
            // Arrange
            const left = List<TrackRecord>();
            const right = List.of(new TrackRecord());

            // Act
            const result = groupBy(left, right, matchById);

            // Assert
            expect(result).toBeEmpty();
        });

        it("given object exists in both collections, object is returned", () => {
            // Arrange
            const object = new TrackRecord();
            const left = List.of(object);
            const right = List.of(object);

            // Act
            const result = groupBy(left, right, matchById);

            // Assert
            expect(result).not.toBeEmpty();
            const grouping = result.first()!;
            expect(grouping.left).toBe(object);
            expect(grouping.right).toBe(object);
        });

        it("given object exists in both collections but is in different order, object is returned", () => {
            // Arrange
            const objects = Range(0, 10)
                .map(() => new TrackRecord())
                .toList();
            const left = List(objects);
            const right = List(
                objects.map((track) =>
                    new TrackSectionRecord().merge({ track_id: track.id })
                )
            ).sort(() => random(-1, 1, false));

            // Act
            const result = groupBy(
                left,
                right,
                (left, right) => left.id === right.track_id
            );

            // Assert
            expect(result).not.toBeEmpty();
            expect(result.count()).toBe(left.count());
            left.forEach((left) => {
                expect(
                    result.find((grouping) => grouping.left === left)
                ).not.toBeNil();
            });
            right.forEach((right) => {
                expect(
                    result.find((grouping) => grouping.right === right)
                ).not.toBeNil();
            });
        });
    });
});
