import { useQuery } from "@tanstack/react-query";

const useFetchRecipe = (_id) => {
  const { data, isPending } = useQuery({
    queryKey: ["recipe"],
    queryFn: () => fetch(`/api/recipes/${_id}`).then((res) => res.json()),
  });
  const recipe = data?.recipe;

  return { recipe, isPending };
};

export default useFetchRecipe;
