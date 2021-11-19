import { WorkstationStateRecord } from "models/workstation-state-record";
import { List } from "immutable";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { Tables } from "generated/enums/tables";
import { listWorkstations } from "utils/queries/list-workstations";

interface UseListWorkstationsOptions {}

const useListWorkstations = (
    options: UseListWorkstationsOptions
): UseQueryResult<List<WorkstationStateRecord>> => {
    const result = useQuery<List<WorkstationStateRecord>, Error>({
        key: [Tables.Projects, Tables.Tracks, Tables.TrackSections],
        fn: listWorkstations,
    });

    return result;
};

export { useListWorkstations };
