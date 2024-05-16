import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Comments from "./Comments";
import Favorites from "./Favorites";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const RecipeDetails = () => {
  const { _id } = useParams();

  const { loggedInUser } = useContext(LoggedInUserContext);

  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetch(`/api/recipes/${_id}`).then((res) => res.json()),
  });

  if (isLoading) return null;

  return (
    <RecipeArticle>
      {data.recipe ? (
        <RecipeSection>
          <Title>
            <div>
              <h1>{data.recipe.title}</h1>
              <p>{data.recipe.subtitle}</p>
            </div>
            {loggedInUser && (
              <Favorites recipe={data.recipe} userId={loggedInUser._id} />
            )}
          </Title>
          <ImgIngredients>
            <img src={data.recipe.imageURL} alt={data.recipe.title} />
            <ul>
              <h2>What you need.</h2>
              {data.recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </ImgIngredients>
        </RecipeSection>
      ) : (
        <h1>Loading...</h1>
      )}
      {data.recipe && <Comments recipe={data.recipe} />}
    </RecipeArticle>
  );
};

export default RecipeDetails;

const RecipeArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10vw;
`;

const Title = styled.div`
  display: flex;
  gap: 5rem;
`;

const ImgIngredients = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  ul {
    margin-top: 1rem;
    list-style-type: none;
    line-height: 1.8rem;
  }
  img {
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
