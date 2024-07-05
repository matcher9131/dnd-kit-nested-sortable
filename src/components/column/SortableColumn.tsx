import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import SortableHolder from "../sortableHolder/SortableHolder";
import { useSortableHolder } from "../sortableHolder/useSortableHolder";
import SortableItem from "../item/SortableItem";
import { itemsSelector } from "../../models/items";
import Column from "./Column";
import { useRecoilValue } from "recoil";
import { activeIdState } from "../../models/dragTarget";

const SortableColumn = ({ header }: { header: string }): JSX.Element => {
    const isDragActive = useRecoilValue(activeIdState) === header;
    const holderProps = useSortableHolder(header);
    const items = useRecoilValue(itemsSelector(header));
    return (
        <SortableHolder {...holderProps} className={`flex-1 ${isDragActive ? "opacity-0" : ""}`}>
            <Column header={header}>
                <SortableContext items={items} strategy={rectSwappingStrategy}>
                    {items.map((label) => (
                        <SortableItem key={label} label={label} />
                    ))}
                </SortableContext>
            </Column>
        </SortableHolder>
    );
};

export default SortableColumn;
