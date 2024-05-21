import styled from "styled-components";
import Hero from "./Hero";
import RecipeLayout from "../RecipePage/RecipeLayout";
import useFetchRecipes from "../../hooks/useFecthRecipes";

const HomePage = () => {

  const {recipes, isPending} = useFetchRecipes();

  if (isPending) return <h1>Loading...</h1>
  
  return (
    <HomePageMain>
      <Hero />
      <h2>The community recipe book</h2>
      <RecipeLayout recipes={recipes} />
    </HomePageMain>
  );
};

export default HomePage;

const HomePageMain = styled.main`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2rem;

`
