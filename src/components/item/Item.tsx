type ItemProps = {
    readonly label: string;
};

const Item = ({ label }: ItemProps): JSX.Element => {
    return <div className="w-full flex items-center p-2 bg-slate-200">{label}</div>;
};

export default Item;
