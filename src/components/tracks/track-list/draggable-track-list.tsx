import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { useDraggable } from "hooks/use-draggable";
import { useTracksState } from "hooks/use-tracks-state";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useProjectState } from "hooks/use-project-state";
import { useTheme } from "hooks/use-theme";
import { Pane } from "evergreen-ui";
import { TrackList } from "components/tracks/track-list/track-list";

interface DraggableTrackListProps {
    tracks?: List<TrackRecord>;
}

const DraggableTrackList: React.FC<DraggableTrackListProps> = (
    props: DraggableTrackListProps
) => {
    const { tracks } = props;
    const { state: project } = useProjectState();
    const { setState: setTracks } = useTracksState();
    const { onDragEnd, onDragStart } = useDraggable({
        setState: setTracks,
    });

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable direction="vertical" droppableId={project.id}>
                {(provided) => (
                    <Pane
                        display="flex"
                        flexDirection="column"
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <TrackList tracks={tracks} />
                        {provided.placeholder}
                    </Pane>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export { DraggableTrackList };
