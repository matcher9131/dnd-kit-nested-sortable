import { type ReactNode } from "react";

type ContainerProps = {
    readonly children: ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => {
    return <div className="flex gap-x-3">{children}</div>;
};

export default Container;
