import { type ReactNode } from "react";

type ColumnProps = {
    readonly children: ReactNode;
    readonly label: string;
};

const Column = ({ children, label }: ColumnProps): JSX.Element => {
    return (
        <div className="grow flex flex-col gap-y-3 p-3 bg-slate-400">
            <div>{label}</div>
            <div className="grow flex flex-col gap-y-3 ">{children}</div>
        </div>
    );
};

export default Column;
