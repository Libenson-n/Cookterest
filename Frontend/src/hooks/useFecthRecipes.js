import { useQuery } from "@tanstack/react-query";

const useFetchRecipes = () => {
  const { data, isPending } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetch("/api/recipes").then((res) => res.json()),
  });
  const recipes = data?.recipes;

  return { recipes, isPending };
};

export default useFetchRecipes;
