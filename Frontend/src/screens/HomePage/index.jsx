import styled from "styled-components";
import Hero from "./Hero";
import RecipeLayout from "../RecipePage/RecipeLayout";
import useFetchRecipes from "../../hooks/useFecthRecipes";
import ClipLoader from "react-spinners/ClipLoader";

const HomePage = () => {

  const {recipes, isPending} = useFetchRecipes();

  if (isPending) return <ClipLoader/>
  
  return (
    <HomePageMain>
      <Hero />
      <h2>Recipes from the community</h2>
      <RecipeLayout recipes={recipes} />
    </HomePageMain>
  );
};

export default HomePage;

const HomePageMain = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2rem;

`
