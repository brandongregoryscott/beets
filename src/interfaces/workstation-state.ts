import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";

interface WorkstationState {
    project: ProjectRecord;
    tracks: List<TrackRecord>;
    trackSections: List<TrackSectionRecord>;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

export type { WorkstationState };
