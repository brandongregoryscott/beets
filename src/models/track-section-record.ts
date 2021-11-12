import { AuditableDefaultValues } from "constants/auditable-default-values";
import { TrackSection } from "generated/interfaces/track-section";
import { List, Record } from "immutable";
import _ from "lodash";
import { BaseRecord } from "models/base-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { SetStateAction } from "react";
import {
    getTemporaryId,
    isNilOrEmpty,
    makeDefaultValues,
} from "utils/core-utils";

const defaultValues = makeDefaultValues<TrackSection>({
    ...AuditableDefaultValues,
    get id() {
        return getTemporaryId();
    },
    index: 0,
    step_count: 16,
    track_id: undefined,
});

class TrackSectionRecord
    extends BaseRecord(Record(defaultValues))
    implements TrackSection
{
    private trackSectionSteps: List<TrackSectionStepRecord>;

    constructor(values?: Partial<TrackSection | TrackSectionRecord>) {
        values = values ?? defaultValues;

        if (values instanceof TrackSectionRecord) {
            values = values.toPOJO();
        }

        super(values);

        this.trackSectionSteps = List();
    }

    public addTrackSectionStep(
        trackSectionStep?: TrackSectionStepRecord
    ): TrackSectionRecord {
        const sections = this.trackSectionSteps.push(
            trackSectionStep ?? new TrackSectionStepRecord()
        );
        return new TrackSectionRecord(this).setTrackSectionStep(sections);
    }

    public getTrackSectionStep(id: string): TrackSectionStepRecord | undefined {
        return this.trackSectionSteps.find(
            (trackSection) => trackSection.id === id
        );
    }

    public getTrackSectionSteps(): List<TrackSectionStepRecord> {
        return this.trackSectionSteps;
    }

    public removeTrackSectionStep(
        section: TrackSectionStepRecord
    ): TrackSectionRecord {
        const trackSectionSteps = this.trackSectionSteps.filterNot(
            (existingSection) => existingSection.id === section.id
        );

        return new TrackSectionRecord(this).setTrackSectionStep(
            trackSectionSteps
        );
    }

    public setTrackSectionStep(
        trackSectionSteps:
            | List<TrackSectionStepRecord>
            | TrackSectionStepRecord[]
    ): TrackSectionRecord {
        this.trackSectionSteps = (
            List.isList(trackSectionSteps)
                ? trackSectionSteps
                : List(trackSectionSteps)
        ).filter(
            (trackSectionStep) =>
                isNilOrEmpty(trackSectionStep.track_section_id) ||
                trackSectionStep.track_section_id === this.id
        );
        return this;
    }

    public updateTrackSectionStep(
        id: string,
        update: SetStateAction<TrackSectionStepRecord>
    ): TrackSectionRecord {
        const existing = this.getTrackSectionStep(id);
        if (existing == null) {
            return this;
        }

        const index = this.trackSectionSteps.indexOf(existing);
        if (index < 0) {
            return this;
        }

        const updatedValue = _.isFunction(update) ? update(existing) : update;

        const sections = this.trackSectionSteps.set(
            index,
            existing.merge(updatedValue.toPOJO())
        );
        return new TrackSectionRecord(this).setTrackSectionStep(sections);
    }
}

export { TrackSectionRecord };
