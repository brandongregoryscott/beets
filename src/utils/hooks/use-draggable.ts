import { List } from "immutable";
import { OrderableEntity } from "interfaces/orderable-entity";
import { SetStateAction } from "jotai";
import { useCallback } from "react";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "utils/collection-utils";

interface UseDraggableOptions<T extends OrderableEntity> {
    setState: (update: SetStateAction<List<T>>) => void;
}

interface UseDraggableResult {
    onDragEnd: (result: DropResult) => void;
}

const useDraggable = <T extends OrderableEntity>(
    options: UseDraggableOptions<T>
): UseDraggableResult => {
    const { setState } = options;

    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { source, destination } = result;
            if (destination == null) {
                return;
            }

            if (destination.index === source.index) {
                return;
            }

            setState((prev) => reorder(prev, source.index, destination.index));
        },
        [setState]
    );

    return { onDragEnd };
};

export { useDraggable };
