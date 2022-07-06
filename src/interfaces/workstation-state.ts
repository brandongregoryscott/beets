import type { List } from "immutable";
import type { ProjectRecord } from "models/project-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";

interface WorkstationState {
    project: ProjectRecord;
    tracks: List<TrackRecord>;
    trackSections: List<TrackSectionRecord>;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

export type { WorkstationState };
