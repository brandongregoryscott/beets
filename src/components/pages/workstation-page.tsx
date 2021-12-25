import { SongControls } from "components/workstation/song-controls";
import { TrackList } from "components/tracks/track-list";
import { majorScale, Pane, Spinner } from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useEffect } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useListWorkstations } from "utils/hooks/use-list-workstations";
import { RouteProps } from "interfaces/route-props";

interface WorkstationPageProps extends RouteProps {}

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    const { isAuthenticated } = useGlobalState();
    const { state, setState } = useWorkstationState();
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles();
    const { resultObject: workstations, isLoading: isLoadingWorkstations } =
        useListWorkstations({
            enabled: isAuthenticated,
        });

    useEffect(() => {
        if (
            (isAuthenticated && isLoadingWorkstations) ||
            state.project.isPersisted()
        ) {
            return;
        }

        if (
            !isAuthenticated &&
            (isLoadingFiles || isNilOrEmpty(files) || state.isDemo())
        ) {
            return;
        }

        // Load the most recently updated workstation if authenticated
        if (isAuthenticated) {
            setState(workstations?.first() ?? new WorkstationStateRecord());
            return;
        }

        const demoState = WorkstationStateRecord.demo(files);
        setState(demoState);
    }, [
        files,
        isAuthenticated,
        isLoadingFiles,
        isLoadingWorkstations,
        setState,
        state,
        workstations,
    ]);

    const renderSpinner =
        (!isAuthenticated && isLoadingFiles) ||
        (isAuthenticated && isLoadingWorkstations);
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
