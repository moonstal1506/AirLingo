import { useState } from "react";
import styled from "@emotion/styled";
import theme from "@/assets/styles/Theme";

// ----------------------------------------------------------------------------------------------------

const { primary4 } = theme.colors;

// ----------------------------------------------------------------------------------------------------

const DropdownWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownButton = styled.button`
    min-width: 120px;
    background-color: ${primary4};
    color: #ffffff;
    padding: 10px;
    border: none;
    cursor: pointer;
`;

const DropdownContent = styled.div`
    display: ${(props) => (props.open ? "block" : "none")};
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const DropdownOption = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
        margin-right: 8px;
        width: 24px;
        height: 24px;
    }
`;

function Dropdown({ icon, data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (id) => {
        setSelectedOption((prevSelectedOption) => (prevSelectedOption === id ? null : id));
    };

    return (
        <DropdownWrapper>
            <DropdownButton onClick={toggleDropdown}>
                {icon && <img src={icon} alt="Icon" />}
                {data[0].label}
            </DropdownButton>
            <DropdownContent open={isOpen}>
                {data.map((option) => (
                    <DropdownOption
                        key={option.id}
                        option={option}
                        isSelected={option.id === selectedOption}
                        onOptionClick={handleOptionClick}
                    />
                ))}
            </DropdownContent>
        </DropdownWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

export default Dropdown;
