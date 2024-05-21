import { useQuery } from "@tanstack/react-query";

const useFetchComments = (_id) => {
  const { data, isPending } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      fetch(`/api/comments/recipe/${_id}`).then((res) => res.json()),
  });
  const comments = data?.commentsByRecipe;

  return { comments, isPending };
};

export default useFetchComments;
