import styled from "styled-components";
import RecipeCard from "./RecipeCard";

const RecipeLayout = ({ recipes }) => {
  if (!recipes) return <p>Loadin...</p>;

  return (
    <RecipeGrid>
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe._id} recipe={recipe} />;
      })}
    </RecipeGrid>
  );
};

export default RecipeLayout;

const RecipeGrid = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  margin-inline: 10vw;
  margin-bottom: 60px;
`;
