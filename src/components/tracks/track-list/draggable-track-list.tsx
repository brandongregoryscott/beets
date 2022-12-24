import type { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import React from "react";
import { TrackList } from "components/tracks/track-list/track-list";
import { Flex } from "components/flex";
import { useDraggable } from "hooks/use-draggable";
import { useProjectState } from "hooks/use-project-state";
import { useTracksState } from "hooks/use-tracks-state";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface DraggableTrackListProps {
    tracks?: List<TrackRecord>;
}

const DraggableTrackList: React.FC<DraggableTrackListProps> = (
    props: DraggableTrackListProps
) => {
    const { tracks } = props;
    const { state: project } = useProjectState();
    const { setState: setTracks } = useTracksState();
    const { onDragEnd, onDragStart } = useDraggable({ setState: setTracks });
    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable direction="vertical" droppableId={project.id}>
                {(provided, snapshot) => (
                    <Flex.Column
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <TrackList
                            isDragging={snapshot.isDraggingOver}
                            tracks={tracks}
                        />
                        {provided.placeholder}
                    </Flex.Column>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export { DraggableTrackList };
