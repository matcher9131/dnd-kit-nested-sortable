import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type SortableHolderProps } from "./SortableHolder";

export const useSortableHolder = (id: string): Omit<SortableHolderProps, "children" | "className"> => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: `${id}`,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return {
        sortableProps: { attributes, listeners, setNodeRef, style },
    };
};
