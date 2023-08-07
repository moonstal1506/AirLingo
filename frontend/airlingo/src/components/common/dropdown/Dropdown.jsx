/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import PropTypes from "prop-types";
import theme from "@/assets/styles/Theme";
import { ReactComponent as DropdownIcon } from "@/assets/icons/right-full-arrow-icon.svg";
import iconConfig from "@/config";
import combineShape from "@/utils/style";

// ----------------------------------------------------------------------------------------------------

const { primary1, primary4 } = theme.colors;
const shapeStyle = {
    positive: `
        background-color: ${primary4};
        border: none;
        color: white;
    `,
    negative: `
        background-color: ${primary1};
        border: 3px solid ${primary4};
        color: ${primary4};
    `,
};
const dropdownOpenAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// ----------------------------------------------------------------------------------------------------

function Dropdown({ width, data, iconColor, shape, selectedOption, placeholder, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [iconRotation, setIconRotation] = useState(0);
    const dropdownRef = useRef();
    console.log(data);
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setIconRotation(0);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleOptionClick = (id) => {
        const selected = data.find((option) => option.id === id);
        onChange({ ...selected });
        setIsOpen(false);
        setIconRotation(0);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setIconRotation(isOpen ? 0 : 90);
    };

    return (
        <DropdownWrapper ref={dropdownRef} width={width}>
            <DropdownButton onClick={toggleDropdown} shape={shape}>
                {selectedOption.label ? (
                    <>
                        <div>
                            {selectedOption.img && typeof selectedOption.img === "string" ? (
                                <DropdownItemImg src={selectedOption.img} alt="dropdownIcon" />
                            ) : (
                                selectedOption.img && (
                                    <div>
                                        <selectedOption.img />
                                    </div>
                                )
                            )}
                        </div>
                        <div>{selectedOption.label}</div>
                    </>
                ) : (
                    <div>{placeholder}</div>
                )}
                <DropdownIconWrapper iconColor={iconColor} iconRotation={iconRotation}>
                    <DropdownIcon width="25" height="25" />
                </DropdownIconWrapper>
            </DropdownButton>
            {data.length > 0 && (
                <DropdownContent open={isOpen} width={width}>
                    {data.map((option) => (
                        <DropdownOption
                            key={option.id}
                            onClick={() => handleOptionClick(option.id)}
                        >
                            <div>
                                {option.img &&
                                    (typeof option.img === "string" ? (
                                        <DropdownItemImg src={option.img} alt="dropdownIcon" />
                                    ) : (
                                        <option.img />
                                    ))}
                            </div>
                            <div>{option.label}</div>
                        </DropdownOption>
                    ))}
                </DropdownContent>
            )}
        </DropdownWrapper>
    );
}

Dropdown.propTypes = {
    width: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            img: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired,
        }),
    ),
    iconColor: PropTypes.string,
    shape: PropTypes.oneOf(["positive", "negative"]),
    selectedOption: PropTypes.shape({
        id: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        img: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]).isRequired,
    }),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

Dropdown.defaultProps = {
    width: "200px",
    data: [],
    iconColor: "black",
    shape: "positive",
    selectedOption: { id: 0, label: "", img: "" },
    placeholder: "",
    onChange: () => {},
};

// ----------------------------------------------------------------------------------------------------

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 120px;
    width: ${({ width }) => width};
    border: none;
    font-size: 20px;
    font-weight: 700;
    gap: 5px;
`;

const DropdownButton = styled.div`
    position: relative;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    align-items: center;
    padding: 0 15px;
    cursor: pointer;
    ${(props) => combineShape(shapeStyle, props.shape)}
    div {
        font-size: 20px;
    }
`;

const DropdownContent = styled.div`
    min-width: ${(props) => props.width};
    position: absolute;
    top: 110%;
    overflow: hidden;
    display: ${(props) => (props.open ? "block" : "none")};
    background-color: #ffffff;
    border: 2px solid ${primary4};
    border-radius: 10px;
    animation: ${dropdownOpenAnimation} 0.3s ease-in-out;
`;

const DropdownOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-weight: 400;
    padding: 15px;
    color: ${primary4};
    &:hover {
        background-color: ${primary1};
        cursor: pointer;
    }
    div {
        font-size: 20px;
    }
`;

const DropdownIconWrapper = styled.div`
    display: block;
    width: 25px;
    height: 25px;
    transform: rotate(${({ iconRotation }) => iconRotation}deg);
    transition: all 0.2s ease-in-out;
    svg path {
        stroke: ${({ iconColor }) => iconConfig.color[iconColor]};
    }
`;

const DropdownItemImg = styled.img`
    width: 25px;
    height: 25px;
`;

// ----------------------------------------------------------------------------------------------------

export default Dropdown;
