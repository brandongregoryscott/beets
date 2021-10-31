import { Record } from "immutable";
import { WorkstationState } from "interfaces/workstation-state";
import { BaseRecord } from "models/base-record";
import { ProjectRecord } from "models/project-record";
import { makeDefaultValues } from "utils/core-utils";

const defaultValues = makeDefaultValues<WorkstationState>({
    initialProject: new ProjectRecord(),
    currentProject: new ProjectRecord(),
});

class WorkstationStateRecord
    extends BaseRecord(Record(defaultValues))
    implements WorkstationState
{
    constructor(values?: Partial<WorkstationState>) {
        values = values ?? defaultValues;

        if (values.initialProject != null) {
            values.initialProject = new ProjectRecord(values.initialProject);
        }

        if (values.currentProject != null) {
            values.currentProject = new ProjectRecord(values.currentProject);
        }

        super(values);
    }
}

export { WorkstationStateRecord };
