import { useRecoilValue } from "recoil";
import SortableHolder from "../sortableHolder/SortableHolder";
import { useSortableHolder } from "../sortableHolder/useSortableHolder";
import Item from "./Item";
import { activeIdState, overIdState } from "../../models/dragTarget";
import { parentHeaderSelector } from "../../models/items";

const SortableItem = ({ label }: { label: string }): JSX.Element => {
    const activeId = useRecoilValue(activeIdState);
    const overId = useRecoilValue(overIdState);
    const isDragActive = activeId === label;
    const isDragOver =
        useRecoilValue(parentHeaderSelector(activeId ?? "")) !== useRecoilValue(parentHeaderSelector(overId ?? "")) &&
        overId === label;
    const holderProps = useSortableHolder(label);
    return (
        <SortableHolder {...holderProps} className={`${isDragActive ? "opacity-0" : isDragOver ? "opacity-50" : ""}`}>
            <Item label={label} />
        </SortableHolder>
    );
};

export default SortableItem;
