import { SongControls } from "components/workstation/song-controls";
import { TrackList } from "components/tracks/track-list";
import { majorScale, Pane, Spinner } from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useEffect } from "react";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useListWorkstations } from "utils/hooks/use-list-workstations";
import { RouteProps } from "interfaces/route-props";
import { useCurrentUser } from "utils/hooks/use-current-user";

interface WorkstationPageProps extends RouteProps {}

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    const { user } = useCurrentUser();
    const { setState } = useWorkstationState();
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles();
    const { resultObject: workstations, isLoading: isLoadingWorkstations } =
        useListWorkstations();

    useEffect(() => {
        if (isLoadingFiles || isLoadingWorkstations) {
            return;
        }

        if (user == null) {
            setState(
                files?.isEmpty()
                    ? new WorkstationStateRecord()
                    : WorkstationStateRecord.demo(files)
            );
            return;
        }

        if (workstations?.isEmpty()) {
            setState(new WorkstationStateRecord());
            return;
        }

        setState(workstations?.first()!);
    }, [
        files,
        isLoadingFiles,
        isLoadingWorkstations,
        setState,
        user,
        workstations,
    ]);

    const renderSpinner = isLoadingFiles || isLoadingWorkstations;
    const renderControls = !renderSpinner;
    return (
        <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
            {renderSpinner && <Spinner />}
            {renderControls && (
                <SongControls>
                    <TrackList />
                </SongControls>
            )}
        </Pane>
    );
};

export { WorkstationPage };
