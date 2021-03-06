import { WorkstationStateRecord } from "models/workstation-state-record";
import { List } from "immutable";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { Tables } from "generated/enums/tables";
import { listWorkstations } from "utils/queries/list-workstations";

interface UseListWorkstationsOptions {
    enabled?: boolean;
}

const useListWorkstations = (
    options?: UseListWorkstationsOptions
): UseQueryResult<List<WorkstationStateRecord>> => {
    const { enabled } = options ?? {};
    const result = useQuery<List<WorkstationStateRecord>, Error>({
        enabled,
        key: [
            Tables.Projects,
            Tables.Tracks,
            Tables.TrackSections,
            Tables.TrackSectionSteps,
        ],
        fn: listWorkstations,
    });

    return result;
};

export { useListWorkstations };
