import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Container from "./components/container/Container";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import { headersSelector, state } from "./models/items";
import SortableColumn from "./components/column/SortableColumn";
import { useRecoilState, useRecoilValue } from "recoil";
import { toSwapped } from "./util/util";

const App = (): JSX.Element => {
    const [columns, setColumns] = useRecoilState(state);
    const headers = useRecoilValue(headersSelector);

    const handleDragEnd = (e: DragEndEvent): void => {
        const activeId = e.active?.id?.toString();
        const overId = e.over?.id?.toString();
        if (activeId == null || overId == null) return;

        // Columnどうしの入れ替え
        const activeHeaderIndex = headers.indexOf(activeId);
        const overHeaderIndex = headers.indexOf(overId);
        if (activeHeaderIndex >= 0 && overHeaderIndex >= 0) {
            setColumns((prev) => toSwapped(prev, activeHeaderIndex, overHeaderIndex));
            return;
        }

        // Itemどうしの入れ替え
        const activeParentColumn = columns.find((column) => column.items.includes(activeId));
        const overParentColumn = columns.find((column) => column.items.includes(overId));
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
                                      column.items.indexOf(activeId),
                                      column.items.indexOf(overId),
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
                            ? { ...column, items: column.items.map((item) => (item === activeId ? overId : item)) }
                            : column == overParentColumn
                              ? { ...column, items: column.items.map((item) => (item === overId ? activeId : item)) }
                              : column,
                    ),
                );
            }
        }
    };

    return (
        <div className="w-full p-5">
            <DndContext onDragEnd={handleDragEnd}>
                <Container>
                    <SortableContext items={headers} strategy={rectSwappingStrategy}>
                        {headers.map((header) => (
                            <SortableColumn key={header} header={header} />
                        ))}
                    </SortableContext>
                </Container>
            </DndContext>
        </div>
    );
};

export default App;
