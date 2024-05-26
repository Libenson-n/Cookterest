import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Comments from "./Comments";
import Favorites from "../../components/Favorites";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import useFetchRecipe from "../../hooks/useFetchRecipe";
import useFetchComments from "../../hooks/useFetchComments";
import useCalculateRating from "../../hooks/useCalculateRating";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecipeDetails = () => {
  const { _id } = useParams();

  const { loggedInUser } = useContext(LoggedInUserContext);

  const { recipe, isPending } = useFetchRecipe(_id);
  const { comments } = useFetchComments(_id);
  const { rating } = useCalculateRating(recipe);

  if (isPending) return <h1> Loading...</h1>;

  return (
    <RecipeArticle>
      {recipe ? (
        <RecipeSection>
          <Title>
            <div>
              <h1>{recipe.title}</h1>
              <Rating>
                {rating &&
                  [...Array(rating)].map((star, index) => (
                    <FontAwesomeIcon icon={faStar} key={index} />
                  ))}
              </Rating>
              <p>{recipe.subtitle}</p>
            </div>
            {loggedInUser && (
              <Favorites recipe={recipe} userId={loggedInUser._id} />
            )}
          </Title>
          <ImgIngredients>
            <img src={recipe.imageURL} alt={recipe.title} />
            <ul>
              <h2>What you need.</h2>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </ImgIngredients>
          <Instructions>
            <h2>How to make it.</h2>
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>
                <p>
                  {idx + 1}. {step}
                </p>
                <br />
              </li>
            ))}
          </Instructions>
        </RecipeSection>
      ) : (
        <h1>Loading...</h1>
      )}
      {recipe && <Comments recipe={recipe} comments={comments} />}
    </RecipeArticle>
  );
};

export default RecipeDetails;

const RecipeArticle = styled.article`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 10vw;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 1rem;

  h1 {
    font-size: 4rem;
    font-family: "Arizonia", cursive;
  }
`;

const ImgIngredients = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  max-height: 500px;
  gap: 2rem;

  ul {
    margin-top: 1rem;
    list-style-type: none;
    line-height: 1.8rem;
  }
  img {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    box-shadow: var(--primary-shadow);
  }
`;

const RecipeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 10vw;
`;
const Instructions = styled.ul`
  list-style-type: none;
`;
const Rating = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: gold;
`;
