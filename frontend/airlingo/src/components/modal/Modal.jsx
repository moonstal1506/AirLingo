import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Overlay from "../common/overlay";
import { iconConfig } from "@/config";

function Modal({ zIdx, Icon, title, titleColor, iconColor, children, width, gap }) {
    return createPortal(
        <Overlay zIdx={zIdx}>
            <ModalContainer>
                <ModalBox iconColor={iconColor} width={width} gap={gap}>
                    {Icon && <Icon id="modalIcon" />}
                    <ModalTitle titleColor={titleColor}>{title}</ModalTitle>
                    {children}
                </ModalBox>
            </ModalContainer>
        </Overlay>,
        document.body.querySelector("#modal"),
    );
}

Modal.propTypes = {
    Icon: PropTypes.elementType,
    title: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    titleColor: PropTypes.string,
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
    gap: PropTypes.string,
};

Modal.defaultProps = {
    zIdx: 1000,
    iconColor: "black",
    titleColor: "black",
    width: "650px",
    gap: "15px",
};

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Pretendard";
`;

const ModalBox = styled.div`
    display: flex;
    width: ${({ width }) => width};
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    padding: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${({ gap }) => gap};

    #modalIcon path {
        fill: ${({ iconColor }) => iconConfig.color[iconColor]};
    }
`;

const ModalTitle = styled.div`
    color: ${({ titleColor }) => iconConfig.color[titleColor]};
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    line-height: 44px; /* 110% */
`;

export default Modal;
