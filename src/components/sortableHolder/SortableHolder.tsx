import { type DraggableAttributes } from "@dnd-kit/core";
import { type SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { type CSSProperties, type ReactNode } from "react";

export type SortableHolderProps = {
    readonly children: ReactNode;
    readonly sortableProps: {
        readonly attributes: DraggableAttributes;
        readonly listeners: SyntheticListenerMap | undefined;
        readonly setNodeRef: (node: HTMLElement | null) => void;
        readonly style: CSSProperties;
    };
    readonly className?: string;
};

const SortableHolder = ({
    children,
    sortableProps: { attributes, listeners, setNodeRef, style },
    className,
}: SortableHolderProps): JSX.Element => {
    return (
        <div ref={setNodeRef} className={className} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

export default SortableHolder;
