type ItemProps = {
    readonly label: string;
};

const Item = ({ label }: ItemProps): JSX.Element => {
    const bgColor = label.startsWith("A") ? "bg-red-200" : label.startsWith("B") ? "bg-green-200" : "bg-blue-200";
    return <div className={`w-full flex items-center p-2 ${bgColor}`}>{label}</div>;
};

export default Item;
