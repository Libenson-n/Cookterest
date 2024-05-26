import { useQuery } from "@tanstack/react-query";

const useFetchRecipesByTags = (tag) => {
  const { data, isPending } = useQuery({
    queryKey: ["recipesByTag"],
    queryFn: () => fetch(`/api/recipes/tags/${tag}`).then((res) => res.json()),
  });
  const recipeByTag = data?.recipeByTag;

  return { recipeByTag, isPending };
};

export default useFetchRecipesByTags;
