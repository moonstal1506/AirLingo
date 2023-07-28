import Dropdown from "./components/common/dropdown";

const data = [
    { id: 0, label: "한국어" },
    { id: 1, label: "English" },
];

function App() {
    return (
        <div>
            <Dropdown data={data} />
        </div>
    );
}

export default App;
