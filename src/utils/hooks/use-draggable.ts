import { List } from "immutable";
import { OrderableEntity } from "interfaces/orderable-entity";
import { SetStateAction, useAtom } from "jotai";
import { useCallback } from "react";
import { DragStart, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { DraggableAtom } from "utils/atoms/draggable-atom";
import { rebaseIndexes, reorder } from "utils/collection-utils";

interface UseDraggableOptions<T extends OrderableEntity> {
    setState?: (update: SetStateAction<List<T>>) => void;
}

interface UseDraggableResult {
    /** Id of the element being dragged, if there is one */
    draggableId?: string;
    onDragEnd: (result: DropResult) => void;
    onDragStart: (start: DragStart, provided: ResponderProvided) => void;
}

const useDraggable = <T extends OrderableEntity>(
    options?: UseDraggableOptions<T>
): UseDraggableResult => {
    const { setState } = options ?? {};
    const [draggableId, setDraggableId] = useAtom(DraggableAtom);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { source, destination } = result;
            setDraggableId(undefined);

            if (destination == null) {
                return;
            }

            setState?.((prev) =>
                rebaseIndexes(reorder(prev, source.index, destination.index))
            );
        },
        [setDraggableId, setState]
    );

    const onDragStart = useCallback(
        (start: DragStart, _provided: ResponderProvided) =>
            setDraggableId(start.draggableId),
        [setDraggableId]
    );

    return { draggableId, onDragEnd, onDragStart };
};

export { useDraggable };
