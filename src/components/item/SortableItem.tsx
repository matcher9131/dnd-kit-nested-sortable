import SortableHolder from "../sortableHolder/SortableHolder";
import { useSortableHolder } from "../sortableHolder/useSortableHolder";
import Item from "./Item";

const SortableItem = ({ label }: { label: string }): JSX.Element => {
    const holderProps = useSortableHolder(label);
    return (
        <SortableHolder {...holderProps}>
            <Item label={label} />
        </SortableHolder>
    );
};

export default SortableItem;
