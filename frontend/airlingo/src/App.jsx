import { useState } from "react";
import Button from "@/components/common/button";
import { ReactComponent as Brush } from "@/assets/imgs/icons/brush-icon.svg";

function App() {
    const [num, setNum] = useState(0);

    const handleClick = () => {
        setNum(num + 1);
        console.log(num);
    };
    return (
        <div>
            <Button type="button" onClick={handleClick} icon={Brush()} />
        </div>
    );
}

export default App;
