import React from "react";
import { useQuery } from "@tanstack/react-query";

const useFecthRecipes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetch("/api/recipes").then((res) => res.json()),
  });
  const recipes = data?.recipes;
  return { recipes };
};

export default useFecthRecipes;
