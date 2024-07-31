import styled from "@emotion/styled";
import { useContext } from "react";
import { Context } from "../context/Context";
import StarInput from "./StarInput";

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1rem;
  line-height: 100%;
  margin-top: 10px;
`;

const RatingValue = styled.span`
  font-size: 1rem;
  line-height: 100%;
  margin-top: 10px;
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;

const StarRating = (props) => {
  const { rating, setRating } = useContext(Context);

  const handleClickRating = (value) => {
    setRating(value);
  };

  return (
    <Base>
      <Name>{props.id.slice(2)} 브랜드 평점</Name>
      <RatingField>
        <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />
        <StarInput
          onClickRating={handleClickRating}
          value={4.5}
          isHalf={true}
        />
        <StarInput onClickRating={handleClickRating} value={4} isHalf={false} />
        <StarInput
          onClickRating={handleClickRating}
          value={3.5}
          isHalf={true}
        />
        <StarInput onClickRating={handleClickRating} value={3} isHalf={false} />
        <StarInput
          onClickRating={handleClickRating}
          value={2.5}
          isHalf={true}
        />
        <StarInput onClickRating={handleClickRating} value={2} isHalf={false} />
        <StarInput
          onClickRating={handleClickRating}
          value={1.5}
          isHalf={true}
        />
        <StarInput onClickRating={handleClickRating} value={1} isHalf={false} />
        <StarInput
          onClickRating={handleClickRating}
          value={0.5}
          isHalf={true}
        />
      </RatingField>
      <RatingValue>{rating}</RatingValue>
    </Base>
  );
};

export default StarRating;
