import { SongControls } from "components/song-controls";
import { TrackList } from "components/track-list";
import { majorScale, Pane, Spinner } from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useEffect } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface WorkstationPageProps {}

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    const { isAuthenticated } = useGlobalState();
    const { state, setState } = useWorkstationState();
    const { resultObject: files } = useListFiles();

    useEffect(() => {
        if (isAuthenticated || isNilOrEmpty(files) || state.isDemo()) {
            return;
        }

        const demoState = WorkstationStateRecord.demo(files);
        setState(demoState);
    }, [files, isAuthenticated, setState, state]);

    const renderSpinner = !isAuthenticated && !state.isDemo();
    const renderControls = !renderSpinner;
    return (
        <Pane marginTop={majorScale(2)} marginLeft={majorScale(2)}>
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
