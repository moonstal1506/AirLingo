import styled from "@emotion/styled";
import { ScriptSliderMenu } from "@/components/sliderMenu";
import { ReactComponent as AIcon } from "@/assets/imgs/icons/dictionary-icon.svg";
import { ReactComponent as BIcon } from "@/assets/imgs/icons/script-icon.svg";
import { ReactComponent as CIcon } from "@/assets/imgs/icons/translator-icon.svg";

const ScriptSliderContent = [
    { Icon: AIcon, Content: () => <div>첫 번째 박스에요</div> },
    { Icon: BIcon, Content: () => <div>두 번째 박스에요</div> },
    { Icon: CIcon, Content: () => <div>세 번째 박스에요</div> },
];

function App() {
    return (
        <TestContainer>
            <button type="button">123</button>
            <ScriptSliderMenu contentGroup={ScriptSliderContent} />
        </TestContainer>
    );
}

const TestContainer = styled.div`
    background-color: gray;
    height: 100vh;
    width: 100vw;
`;

export default App;
