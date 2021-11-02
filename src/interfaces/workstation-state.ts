import { ProjectRecord } from "models/project-record";

interface WorkstationState {
    initialProject: ProjectRecord;
    currentProject: ProjectRecord;
}

export type { WorkstationState };
