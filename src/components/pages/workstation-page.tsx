import {
    SongControls,
    SongControlsHeight,
} from "components/workstation/song-controls";
import {
    AddIcon,
    majorScale,
    Pane,
    Spinner,
    Tooltip,
    Text,
    Strong,
    ProjectsIcon,
} from "evergreen-ui";
import { useCallback, useEffect, useState } from "react";
import { useListFiles } from "hooks/domain/files/use-list-files";
import { useWorkstationState } from "hooks/use-workstation-state";
import { ChooseOrCreateInstrumentDialog } from "components/instruments/choose-or-create-instrument-dialog";
import React from "react";
import type { SelectMenuItem } from "components/select-menu/select-menu";
import { SelectMenu } from "components/select-menu/select-menu";
import { TrackRecord } from "models/track-record";
import { useGlobalState } from "hooks/use-global-state";
import { useTracksState } from "hooks/use-tracks-state";
import type { InstrumentRecord } from "models/instrument-record";
import { useDialog } from "hooks/use-dialog";
import { useProjectState } from "hooks/use-project-state";
import { DraggableTrackList } from "components/tracks/track-list/draggable-track-list";
import { useListInstruments } from "hooks/domain/instruments/use-list-instruments";
import { List } from "immutable";
import { SidebarNavigationWidth } from "components/sidebar/sidebar-navigation";
import { WorkstationTabsHeight } from "components/workstation/workstation-tabs";
import { calcFrom100 } from "utils/theme-utils";
import { TrackSectionRecord } from "models/track-section-record";
import type { Track } from "generated/interfaces/track";
import { matchPath } from "react-router";
import { useGetWorkstationByProjectId } from "hooks/use-get-workstation-by-project-id";
import { EmptyState } from "components/empty-state";
import { isInvalidUuidError, isNotFoundError } from "utils/error-utils";
import { Sitemap } from "sitemap";
import { useRouter } from "hooks/use-router";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCurrentUser } from "hooks/use-current-user";
import { useTimeoutRender } from "hooks/use-timeout-render";
import { IconButton } from "components/icon-button";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

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

const WorkstationPage: React.FC = () => {
    const { location, params } = useRouter();
    const { projectId } = params;
    const { setState } = useWorkstationState();
    const { state: project } = useProjectState();
    const [isStateInitialized, setIsStateInitialized] = useState<boolean>(
        project.id === projectId
    );
    const { state: tracks, add: addTrack } = useTracksState();
    const [
        instrumentDialogOpen,
        handleOpenInstrumentDialog,
        handleCloseInstrumentDialog,
    ] = useDialog();
    const { globalState } = useGlobalState();
    const { user } = useCurrentUser();
    const { resultObject: files = List(), isLoading: isLoadingFiles } =
        useListFiles();
    const {
        resultObject: instruments = List(),
        isLoading: isLoadingInstruments,
    } = useListInstruments({ files });
    const {
        isLoading: isLoadingWorkstation,
        refetch,
        error,
    } = useGetWorkstationByProjectId({
        projectId,
        enabled: !isStateInitialized,
        onSuccess: (workstation) => {
            setState(workstation);
            setIsStateInitialized(true);
        },
    });

    // Unfortunate hack to prevent infinite loading issue for initial render when a staleTime
    // is set: https://github.com/tannerlinsley/react-query/issues/1657
    useTimeoutRender();

    useEffect(() => {
        if (isStateInitialized || isLoadingFiles) {
            return;
        }

        if (matchPath(Sitemap.root.newProject, location.pathname) == null) {
            return;
        }

        setIsStateInitialized(true);
        const workstation =
            user == null
                ? WorkstationStateRecord.demo(files)
                : new WorkstationStateRecord();
        setState(workstation);
    }, [
        files,
        isLoadingFiles,
        isStateInitialized,
        location.pathname,
        setState,
        user,
    ]);

    useEffect(() => {
        // If projectId is empty, it means we're on a new project. Don't attempt to reset the initialization
        // state which can cause an infinite setState loop
        if (isEmpty(projectId) || project.id === projectId) {
            return;
        }

        setIsStateInitialized(false);
    }, [project.id, projectId]);

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
        isLoadingFiles || isLoadingWorkstation || isLoadingInstruments;
    const renderNotFoundError =
        isNotFoundError(error) || isInvalidUuidError(error);
    const renderGenericError = error != null && !renderNotFoundError;
    const renderControls = !renderNotFoundError && !renderSpinner;

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
                                        marginTop={-majorScale(2)}
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
            {renderGenericError && (
                <EmptyState
                    description="There was an error retrieving the requested Project."
                    icon={<ProjectsIcon />}
                    primaryCta={
                        <EmptyState.PrimaryButton onClick={refetch}>
                            Retry
                        </EmptyState.PrimaryButton>
                    }
                    title="Error Retrieving Project"
                />
            )}
            {renderNotFoundError && (
                <EmptyState
                    description={
                        <Text>
                            {"The requested Project with id "}
                            <Strong>{projectId}</Strong>
                            {" was not found."}
                        </Text>
                    }
                    icon={<ProjectsIcon />}
                    primaryCta={
                        <EmptyState.PrimaryButton
                            is={Link}
                            to={Sitemap.root.newProject}>
                            New Project
                        </EmptyState.PrimaryButton>
                    }
                    title="Project Not Found"
                />
            )}
        </Pane>
    );
};

export { WorkstationPage };
