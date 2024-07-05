import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import Container from "./components/container/Container";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import { itemsSelector, state } from "./models/items";
import SortableColumn from "./components/column/SortableColumn";
import { useRecoilState, useRecoilValue } from "recoil";
import { toSwapped } from "./util/util";
import { createPortal } from "react-dom";
import Item from "./components/item/Item";
import Column from "./components/column/Column";
import { activeIdState, overIdState } from "./models/dragTarget";

const ColumnDragOverlay = ({ header }: { header: string }): JSX.Element => {
    const items = useRecoilValue(itemsSelector(header));
    return (
        <Column header={header}>
            {items.map((item) => (
                <Item key={item} label={item} />
            ))}
        </Column>
    );
};

const App = (): JSX.Element => {
    const [columns, setColumns] = useRecoilState(state);
    const [activeId, setActiveId] = useRecoilState(activeIdState);
    const [, setOverId] = useRecoilState(overIdState);

    const handleDragStart = (e: DragStartEvent): void => {
        setActiveId(e.active.id.toString());
    };

    const handleDragOver = (e: DragOverEvent): void => {
        setOverId(e.over?.id?.toString() ?? null);
    };

    const handleDragCancel = (): void => {
        setActiveId(null);
        setOverId(null);
    };

    const handleDragEnd = (e: DragEndEvent): void => {
        const currentActiveId = e.active.id.toString();
        const currentOverId = e.over?.id?.toString();
        if (currentOverId == null) {
            setActiveId(null);
            setOverId(null);
            return;
        }

        // 試しにA1とB1のみ入れ替えを禁じてみる
        if (
            (currentActiveId === "A1" && currentOverId === "B1") ||
            (currentActiveId === "B1" && currentOverId === "A1")
        ) {
            setActiveId(null);
            setOverId(null);
            return;
        }

        // Columnどうしの入れ替え
        const activeHeaderIndex = columns.findIndex(({ header }) => header === currentActiveId);
        const overHeaderIndex = columns.findIndex(({ header }) => header === currentOverId);
        if (activeHeaderIndex >= 0 && overHeaderIndex >= 0) {
            setColumns((prev) => toSwapped(prev, activeHeaderIndex, overHeaderIndex));
            setActiveId(null);
            setOverId(null);
            return;
        }

        // Itemどうしの入れ替え
        const activeParentColumn = columns.find((column) => column.items.includes(currentActiveId));
        const overParentColumn = columns.find((column) => column.items.includes(currentOverId));
        if (activeParentColumn != null && overParentColumn != null) {
            if (activeParentColumn == overParentColumn) {
                // 同じColumn内でのItemの入れ替え
                setColumns((prev) =>
                    prev.map((column) =>
                        column == activeParentColumn
                            ? {
                                  ...column,
                                  items: toSwapped(
                                      column.items,
                                      column.items.indexOf(currentActiveId),
                                      column.items.indexOf(currentOverId),
                                  ),
                              }
                            : column,
                    ),
                );
            } else {
                // 異なるColumn間でのItemの入れ替え
                setColumns((prev) =>
                    prev.map((column) =>
                        column == activeParentColumn
                            ? {
                                  ...column,
                                  items: column.items.map((item) => (item === currentActiveId ? currentOverId : item)),
                              }
                            : column == overParentColumn
                              ? {
                                    ...column,
                                    items: column.items.map((item) =>
                                        item === currentOverId ? currentActiveId : item,
                                    ),
                                }
                              : column,
                    ),
                );
            }
        }
        setActiveId(null);
        setOverId(null);
    };

    return (
        <div className="w-full p-5">
            <DndContext
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragCancel={handleDragCancel}
                onDragEnd={handleDragEnd}
            >
                <Container>
                    <SortableContext items={columns.map(({ header }) => header)} strategy={rectSwappingStrategy}>
                        {columns.map(({ header }) => (
                            <SortableColumn key={header} header={header} />
                        ))}
                    </SortableContext>
                    {createPortal(
                        <DragOverlay dropAnimation={{ duration: 0 }}>
                            {activeId &&
                                (columns.some(({ header }) => header === activeId) ? (
                                    <ColumnDragOverlay header={activeId} />
                                ) : (
                                    <Item label={activeId} />
                                ))}
                        </DragOverlay>,
                        document.body,
                    )}
                </Container>
            </DndContext>
        </div>
    );
};

export default App;
