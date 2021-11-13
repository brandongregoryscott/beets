import { List } from "immutable";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";

interface WorkstationState {
    project: ProjectRecord;
    tracks: List<TrackRecord>;
}

export type { WorkstationState };
