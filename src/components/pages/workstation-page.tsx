import {
    SongControls,
    SongControlsHeight,
} from "components/workstation/song-controls";
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
import type { RouteProps } from "interfaces/route-props";
import { useCurrentUser } from "utils/hooks/use-current-user";
import { ChooseOrCreateInstrumentDialog } from "components/instruments/choose-or-create-instrument-dialog";
import React from "react";
import type { SelectMenuItem } from "components/select-menu/select-menu";
import { SelectMenu } from "components/select-menu/select-menu";
import { TrackRecord } from "models/track-record";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTracksState } from "utils/hooks/use-tracks-state";
import type { InstrumentRecord } from "models/instrument-record";
import { useDialog } from "utils/hooks/use-dialog";
import { useProjectState } from "utils/hooks/use-project-state";
import { DraggableTrackList } from "components/tracks/track-list/draggable-track-list";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { List } from "immutable";
import { SidebarNavigationWidth } from "components/sidebar/sidebar-navigation";
import { WorkstationTabsHeight } from "components/workstation/workstation-tabs";
import { calcFrom100 } from "utils/theme-utils";
import { TrackSectionRecord } from "models/track-section-record";
import type { Track } from "generated/interfaces/track";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";

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
    const { setState } = useWorkstationState();
    const { state: project } = useProjectState();
    const { state: tracks, add: addTrack } = useTracksState();
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
    useTimeoutRender({
        onTimeout: () => {
            // If we're still seeing a loading state for either of these after 1s, assume react-query
            // is stuck and set state manually
            if (isLoadingFiles || isLoadingWorkstations) {
                setState(new WorkstationStateRecord());
            }
        },
    });

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

        if (workstations?.isEmpty() === true) {
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

    const addTrackWithTrackSection = useCallback(
        (overrides?: Partial<Track>) => {
            const newTrack = new TrackRecord().merge({
                index: tracks.count(),
                project_id: project.id,
                ...(overrides ?? {}),
            });

            const newTrackSection = new TrackSectionRecord().merge({
                track_id: newTrack.id,
            });

            addTrack(newTrack);

            setState((prev) =>
                prev.merge({
                    trackSections: prev.trackSections.push(newTrackSection),
                })
            );
        },
        [addTrack, project.id, setState, tracks]
    );

    const handleSelect = useCallback(
        (item: SelectMenuItem<boolean>) => {
            const { value: isInstrument } = item;
            if (isInstrument) {
                handleOpenInstrumentDialog();
                return;
            }

            addTrackWithTrackSection();
        },
        [addTrackWithTrackSection, handleOpenInstrumentDialog]
    );

    const handleInstrumentSubmit = useCallback(
        (instrument: InstrumentRecord) => {
            addTrackWithTrackSection({
                instrument_id: instrument.id,
                name: instrument?.name,
            });
        },
        [addTrackWithTrackSection]
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
                    <SongControls files={files} instruments={instruments} />
                    <Pane
                        height={calcFrom100(
                            WorkstationTabsHeight + SongControlsHeight + margin
                        )}
                        overflow="auto"
                        width={calcFrom100(SidebarNavigationWidth + margin)}>
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
                                onCloseComplete={handleCloseInstrumentDialog}
                                onSubmit={handleInstrumentSubmit}
                                showTabs={globalState.isAuthenticated()}
                            />
                        )}
                    </Pane>
                </Pane>
            )}
        </Pane>
    );
};

export { WorkstationPage };
