import type { WorkstationStateRecord } from "models/workstation-state-record";
import type { List } from "immutable";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import { Tables } from "generated/enums/tables";
import { listWorkstations } from "queries/list-workstations";

interface UseListWorkstationsOptions {
    enabled?: boolean;
}

type UseListWorkstationsResult = UseQueryResult<List<WorkstationStateRecord>>;

const useListWorkstations = (
    options?: UseListWorkstationsOptions
): UseListWorkstationsResult => {
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

export type { UseListWorkstationsResult };
export { useListWorkstations };
