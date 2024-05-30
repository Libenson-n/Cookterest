import { useParams, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import RecipeLayout from "../RecipePage/RecipeLayout";
import styled from "styled-components";
import { useEffect, useState } from "react";

const RecipeByTagPage = () => {
  const { query } = useParams();

  const [recipes, setRecipes] = useState([])
  const [fetching, setFetching] = useState(false)

  const { pathname } = useLocation();

  useEffect(() => {
    setFetching(true)
    const tag = query
    try {
      fetch(`/api/recipes/tags/${tag}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipeByTag))
    } catch (error) {
      console.error(error)
    } finally {
      setFetching(false)
    }
  }, [pathname]);

  if (fetching) return <ClipLoader />

  return (
    <RecipeByTagPageArticle>
      <h1>{query}</h1>
      <RecipeLayout recipes={recipes} />;
    </RecipeByTagPageArticle>
  );
};

export default RecipeByTagPage;

const RecipeByTagPageArticle = styled.article`
  min-height: 100vh;

  h1 {
    margin: 2rem;
  }
`;
