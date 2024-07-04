import Column from "./components/column/Column";
import Container from "./components/container/Container";
import Item from "./components/item/Item";

const items = {
    A: ["A1", "A2", "A3", "A4"],
    B: ["B1", "B2"],
    C: ["C1", "C2", "C3"],
};

const App = (): JSX.Element => {
    return (
        <div className="w-full p-5">
            <Container>
                {Object.entries(items).map(([key, value]) => (
                    <Column key={key} label={key}>
                        {value.map((item) => (
                            <Item key={item} label={item} />
                        ))}
                    </Column>
                ))}
            </Container>
        </div>
    );
};

export default App;
