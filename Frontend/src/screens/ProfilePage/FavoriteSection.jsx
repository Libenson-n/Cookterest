import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import useFecthRecipes from "../../hooks/useFecthRecipes";

const FavoriteSection = ({ _id }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const { favorites } = useFetchFavorites(_id);
  const { recipes } = useFecthRecipes();

  useEffect(() => {
    recipes &&
      setSavedRecipes(
        recipes?.filter((recipe) => favorites?.includes(recipe._id))
      );
  }, []);
  return (
    <FaveWrapper>
      {savedRecipes.map((recipe) => (
        <FaveRecipes key={recipe._id}>
          <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
          <Link to={`/recipe/${recipe._id}`}>
            <img src={recipe.imageURL} />
          </Link>
        </FaveRecipes>
      ))}
    </FaveWrapper>
  );
};

export default FavoriteSection;

const FaveWrapper = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto;
`;
const FaveRecipes = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;

  a {
    width: fit-content;
    text-decoration: none;
  }
  a:visited {
    color: inherit;
  }
`;
