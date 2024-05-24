import styled from "styled-components";
import { Link } from "react-router-dom";
import useFetchRecipesByUser from "../../hooks/useFetchRecipesByUser";

const CreatedRecipes = ({ _id }) => {
  const { userRecipes, isPending } = useFetchRecipesByUser(_id);

  if (isPending) return <p>Loading...</p>;

  return (
    <CreatedRecipesWrapper>
      {userRecipes
        ? userRecipes?.map((recipe) => (
            <Recipe key={recipe._id}>
              <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
              <Link to={`/recipe/${recipe._id}`}>
                <img src={recipe.imageURL} />
              </Link>
            </Recipe>
          ))
        : null}
    </CreatedRecipesWrapper>
  );
};

export default CreatedRecipes;

const CreatedRecipesWrapper = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const Recipe = styled.li`
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
