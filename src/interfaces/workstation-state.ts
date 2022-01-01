import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";

interface WorkstationState {
    project: ProjectRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
    trackSections: List<TrackSectionRecord>;
    tracks: List<TrackRecord>;
}

export type { WorkstationState };
