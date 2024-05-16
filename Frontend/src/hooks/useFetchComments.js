import { useQuery } from "@tanstack/react-query";

const useFetchComments = (_id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      fetch(`/api/comments/recipe/${_id}`).then((res) => res.json()),
  });
  const comments = data?.commentsByRecipe;
  console.log(data);
  return { comments, isLoading };
};

export default useFetchComments;
