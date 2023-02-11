import { List } from "immutable";
import { sumBy } from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { findMissingIndices } from "utils/collection-utils";
import { partitionValueToArray } from "utils/core-utils";

const fillWithPlaceholders = (
    trackSections: Array<TrackSectionRecord> | List<TrackSectionRecord>
): List<TrackSectionRecord> => {
    trackSections = List.isList(trackSections)
        ? trackSections
        : List(trackSections);

    const trackIds = trackSections
        .groupBy((trackSection) => trackSection.track_id)
        .keySeq();

    return trackIds
        .map((trackId) => fillWithPlaceholdersByTrackId(trackSections, trackId))
        .flatten()
        .toList() as List<TrackSectionRecord>;
};

const fillWithPlaceholdersByTrackId = (
    trackSections: Array<TrackSectionRecord> | List<TrackSectionRecord>,
    trackId: string
): List<TrackSectionRecord> => {
    trackSections = List.isList(trackSections)
        ? trackSections
        : List(trackSections);

    const trackSectionsByTrackId = getByTrackId(trackId, trackSections);
    const maxTrackSectionCount = getMaxCountByTrackId(trackSections);
    // Determine if there is a Track with a higher TrackSection count, and fill in missing entries
    // with placeholder TrackSections
    const missingTrackSectionCount =
        maxTrackSectionCount - getCountByTrackId(trackSections, trackId);

    if (missingTrackSectionCount === 0) {
        return trackSectionsByTrackId;
    }

    const maxStepCount = getMaxStepCountByTrackId(trackSections);
    const trackStepCount = getTotalStepCount(trackSectionsByTrackId);
    const stepCountDifference = maxStepCount - trackStepCount;

    const stepCounts = partitionValueToArray(
        stepCountDifference,
        missingTrackSectionCount
    );

    const missingIndices = findMissingIndices(
        trackSectionsByTrackId.map((trackSection) => trackSection.index),
        maxTrackSectionCount
    );

    const placeholderTrackSections = missingIndices.map(
        (missingIndex, iteratorIndex) =>
            new TrackSectionRecord({
                index: missingIndex,
                track_id: trackId,
                step_count: stepCounts[iteratorIndex],
            }).setIsPlaceholder()
    );

    const filledTrackSections = trackSectionsByTrackId
        .concat(placeholderTrackSections)
        .sortBy((trackSection) => trackSection.index);

    return filledTrackSections;
};

const getByTrackId = (
    trackId: string,
    trackSections: List<TrackSectionRecord>
): List<TrackSectionRecord> =>
    trackSections.filter((trackSection) => trackSection.track_id === trackId);

const getCountByTrackId = (
    trackSections: List<TrackSectionRecord>,
    trackId: string
): number =>
    trackSections
        .groupBy((trackSection) => trackSection.track_id)
        .get(trackId)
        ?.count() ?? 0;

const getMaxCountByTrackId = (
    trackSections: List<TrackSectionRecord>
): number =>
    trackSections.countBy((trackSection) => trackSection.track_id).max() ?? 0;

const getMaxStepCountByTrackId = (
    trackSections: List<TrackSectionRecord>
): number =>
    trackSections
        .groupBy((trackSection) => trackSection.track_id)
        .map((trackSectionsByTrackId) =>
            getTotalStepCount(trackSectionsByTrackId.toList())
        )
        .max() ?? 0;

const getStepCountOffset = (
    trackSections: List<TrackSectionRecord>,
    index: number
): number => getTotalStepCount(trackSections.slice(0, index));

const getTotalStepCount = (trackSections: List<TrackSectionRecord>): number =>
    sumBy(trackSections.toArray(), (trackSection) => trackSection.step_count);

export {
    fillWithPlaceholders,
    fillWithPlaceholdersByTrackId,
    getByTrackId,
    getStepCountOffset,
    getCountByTrackId,
    getMaxCountByTrackId,
    getTotalStepCount,
    getMaxStepCountByTrackId,
};
