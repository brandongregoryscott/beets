import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { useDraggable } from "utils/hooks/use-draggable";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useProjectState } from "utils/hooks/use-project-state";
import { useTheme } from "utils/hooks/use-theme";
import { minorScale, Pane } from "evergreen-ui";
import { TrackList } from "components/tracks/track-list/track-list";

interface DraggableTrackListProps {
    tracks?: List<TrackRecord>;
}

const DraggableTrackList: React.FC<DraggableTrackListProps> = (
    props: DraggableTrackListProps
) => {
    const { tracks } = props;
    const { colors } = useTheme();
    const { state: project } = useProjectState();
    const { setState: setTracks } = useTracksState();
    const { onDragEnd, onDragStart } = useDraggable({ setState: setTracks });

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable direction="vertical" droppableId={project.id}>
                {(provided, snapshot) => (
                    <Pane
                        border={`2px dashed ${
                            snapshot.isDraggingOver
                                ? colors.blue300
                                : "transparent"
                        }`}
                        borderRadius={minorScale(1)}
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
