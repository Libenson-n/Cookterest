import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const StarRating = ({ recipeId }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [rated, setRated] = useState(false);

  const handleRating = (event) => {
    setRating(event.target.value);
    const updateRating = async () => {
      await fetch(`/api/recipes/rating/${recipeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });
    };
    updateRating();
  };

  return (
    <>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Stars key={index}>
            <RadioBtn
              type="radio"
              name="star"
              value={ratingValue}
              onClick={(event) => handleRating(event)}
            />
            <FontAwesomeIcon
              icon={faStar}
              className="starIcon"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              style={{
                color: ratingValue <= (hover || rating) ? "orange" : "grey",
              }}
            />
          </Stars>
        );
      })}
    </>
  );
};

export default StarRating;

const Stars = styled.label`
  font-size: 1.7rem;

  .starIcon {
    cursor: pointer;
  }
`;

const RadioBtn = styled.input`
  display: none;
`;
