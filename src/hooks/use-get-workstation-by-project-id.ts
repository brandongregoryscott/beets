import type { WorkstationStateRecord } from "models/workstation-state-record";
import type { UseQueryOptions, UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import { Tables } from "generated/enums/tables";
import { getWorkstationByProjectId } from "queries/get-workstation-by-project-id";
import type { PostgrestError } from "@supabase/supabase-js";
import { isUuid } from "utils/id-utils";

interface UseGetWorkstationByProjectIdOptions
    extends Pick<
        UseQueryOptions<WorkstationStateRecord, PostgrestError>,
        "enabled" | "onSuccess"
    > {
    projectId: string | undefined;
}

const useGetWorkstationByProjectId = (
    options: UseGetWorkstationByProjectIdOptions
): UseQueryResult<WorkstationStateRecord, PostgrestError> => {
    const { enabled = true, projectId, onSuccess } = options;
    const result = useQuery<WorkstationStateRecord, PostgrestError>({
        enabled: enabled && isUuid(projectId),
        key: [
            projectId,
            Tables.Projects,
            Tables.Tracks,
            Tables.TrackSections,
            Tables.TrackSectionSteps,
        ],
        fn: () => getWorkstationByProjectId(projectId!),
        onSuccess,
    });

    return result;
};

export { useGetWorkstationByProjectId };
