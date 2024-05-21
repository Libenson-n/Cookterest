import { useQuery } from "@tanstack/react-query";

const useFetchRecipesByUser = (_id) => {
  const { data, isPending } = useQuery({
    queryKey: ["userRecipes"],
    queryFn: () => fetch(`/api/recipes/user/${_id}`).then((res) => res.json()),
  });
  const userRecipes = data?.usersRecipes;

  return { userRecipes, isPending };
};

export default useFetchRecipesByUser;
