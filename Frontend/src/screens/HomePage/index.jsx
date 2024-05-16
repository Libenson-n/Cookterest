import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Hero from "./Hero";
import RecipeLayout from "../RecipePage/RecipeLayout";

const HomePage = () => {

  const {data, isLoading} = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetch("/api/recipes").then((res) => res.json())
  })

  if (isLoading) return <h1>Loading...</h1>
  
  return (
    <main>
      <Hero />
      <RecipeLayout recipes={data.recipes} />
    </main>
  );
};

export default HomePage;
