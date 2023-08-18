import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { StarFilledIcon, StartNotFilledIcon } from "@/assets/icons";

function StarRate({ rating, setRating }) {
    return (
        <RatingContainer>
            {[1, 2, 3, 4, 5].map((arrayindex, idx) =>
                idx + 1 <= rating ? (
                    <StarFilledIcon key={arrayindex} onClick={() => setRating(arrayindex)} />
                ) : (
                    <StartNotFilledIcon key={arrayindex} onClick={() => setRating(arrayindex)} />
                ),
            )}
        </RatingContainer>
    );
}

StarRate.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
};

const RatingContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
`;

export default StarRate;
