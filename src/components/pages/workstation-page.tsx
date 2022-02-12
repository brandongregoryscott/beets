import {
    SongControls,
    SongControlsHeight,
} from "components/workstation/song-controls";
import { PlayingTrackList } from "components/tracks/track-list/playing-track-list";
import {
    AddIcon,
    IconButton,
    majorScale,
    Pane,
    Spinner,
    Tooltip,
} from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCallback, useEffect, useState } from "react";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useListWorkstations } from "utils/hooks/use-list-workstations";
import { RouteProps } from "interfaces/route-props";
import { useCurrentUser } from "utils/hooks/use-current-user";
import { useTimeoutWhen } from "rooks";
import { ChooseOrCreateInstrumentDialog } from "components/instruments/choose-or-create-instrument-dialog";
import React from "react";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { TrackRecord } from "models/track-record";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { InstrumentRecord } from "models/instrument-record";
import { useDialog } from "utils/hooks/use-dialog";
import { useProjectState } from "utils/hooks/use-project-state";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { DraggableTrackList } from "components/tracks/track-list/draggable-track-list";
import { SongComposition } from "components/song-composition/song-composition";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { List } from "immutable";
import { TrackTime } from "components/tracks/track-time/track-time";
import { SidebarNavigationWidth } from "components/sidebar/sidebar-navigation";
import { WorkstationTabsHeight } from "components/workstation/workstation-tabs";
import { calcFrom100 } from "utils/theme-utils";

interface WorkstationPageProps extends RouteProps {}

const options: Array<SelectMenuItem<boolean>> = [
    {
        label: "Sequencer",
        id: "sequencer",
        value: false,
    },
    {
        label: "Instrument",
        id: "instrument",
        value: true,
    },
];

const margin = majorScale(2);

const WorkstationPage: React.FC<WorkstationPageProps> = (
    props: WorkstationPageProps
) => {
    const { user } = useCurrentUser();
    const { state, setState } = useWorkstationState();
    const {
        state: { isPlaying },
    } = useReactronicaState();
    const { state: project } = useProjectState();
    const { state: tracks, add } = useTracksState();
    const [
        instrumentDialogOpen,
        handleOpenInstrumentDialog,
        handleCloseInstrumentDialog,
    ] = useDialog();
    const { globalState } = useGlobalState();
    const { resultObject: files = List(), isLoading: isLoadingFiles } =
        useListFiles();
    const {
        resultObject: instruments = List(),
        isLoading: isLoadingInstruments,
    } = useListInstruments({ files });
    const { resultObject: workstations, isLoading: isLoadingWorkstations } =
        useListWorkstations();
    const [hasInitialized, setHasInitialized] = useState<boolean>(false);

    // Unfortunate hack to prevent infinite loading issue for initial render when a staleTime
    // is set: https://github.com/tannerlinsley/react-query/issues/1657
    const [hookTimedOut, setHookTimedOut] = useState(false);
    useTimeoutWhen(
        () => {
            // If we're still seeing a loading state for either of these after 1s, assume react-query
            // is stuck and set state manually
            if (isLoadingFiles || isLoadingWorkstations) {
                setState(new WorkstationStateRecord());
            }

            setHookTimedOut(true);
        },
        1000,
        !hookTimedOut
    );

    useEffect(() => {
        if (
            hasInitialized ||
            isLoadingFiles ||
            isLoadingWorkstations ||
            (project.isPersisted() && user != null) ||
            (project.isDemo() && user == null)
        ) {
            return;
        }

        setHasInitialized(true);

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
        hasInitialized,
        isLoadingFiles,
        isLoadingWorkstations,
        project,
        setState,
        user,
        workstations,
    ]);

    const handleSelect = useCallback(
        (item: SelectMenuItem<boolean>) => {
            const { value: isInstrument } = item;
            if (isInstrument) {
                handleOpenInstrumentDialog();
                return;
            }

            add(
                new TrackRecord().merge({
                    index: tracks.count(),
                    project_id: project.id,
                })
            );
        },
        [add, handleOpenInstrumentDialog, project, tracks]
    );

    const handleInstrumentSubmit = useCallback(
        (instrument: InstrumentRecord) => {
            add(
                new TrackRecord().merge({
                    index: tracks.count(),
                    instrument_id: instrument.id,
                    project_id: project.id,
                    name: instrument?.name,
                })
            );
        },
        [add, project, tracks]
    );

    const renderSpinner =
        isLoadingFiles || isLoadingWorkstations || isLoadingInstruments;
    const renderControls = !renderSpinner;

    return (
        <Pane height="100%" marginTop={margin} width="100%">
            {renderSpinner && (
                <Pane
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                    width="100%">
                    <Spinner />
                </Pane>
            )}
            {renderControls && (
                <Pane height="100%" marginLeft={margin} width="100%">
                    <SongControls />
                    <Pane
                        height={calcFrom100(
                            WorkstationTabsHeight + SongControlsHeight + margin
                        )}
                        overflow="auto"
                        width={calcFrom100(SidebarNavigationWidth + margin)}>
                        <TrackTime stepCount={state.getStepCount()} />
                        {isPlaying && <PlayingTrackList tracks={tracks} />}
                        {!isPlaying && (
                            <React.Fragment>
                                <DraggableTrackList tracks={tracks} />
                                <Pane
                                    display="flex"
                                    flexDirection="row"
                                    marginRight="auto">
                                    <SelectMenu
                                        calculateHeight={true}
                                        closeOnSelect={true}
                                        hasFilter={false}
                                        isMultiSelect={false}
                                        onSelect={handleSelect}
                                        options={options}
                                        title="Track Type"
                                        width={majorScale(16)}>
                                        <Tooltip content="Add Track">
                                            <IconButton
                                                icon={AddIcon}
                                                marginTop={majorScale(2)}
                                            />
                                        </Tooltip>
                                    </SelectMenu>
                                </Pane>
                                {instrumentDialogOpen && (
                                    <ChooseOrCreateInstrumentDialog
                                        isShown={true}
                                        onCloseComplete={
                                            handleCloseInstrumentDialog
                                        }
                                        onSubmit={handleInstrumentSubmit}
                                        showTabs={globalState.isAuthenticated()}
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </Pane>
                </Pane>
            )}
            <SongComposition files={files} instruments={instruments} />
        </Pane>
    );
};

export { WorkstationPage };
