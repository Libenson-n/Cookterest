import { useQuery } from "@tanstack/react-query";

const useFetchComments = (_id) => {
  const { data, isPending, isFetching, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      fetch(`/api/comments/recipe/${_id}`).then((res) => res.json()),
  });
  const comments = data?.commentsByRecipe;

  return { comments, isPending, isFetching, isLoading };
};

export default useFetchComments;
