import { useQuery } from "@tanstack/react-query";

const useFetchFavorites = (userId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      fetch(`/api/users/favorites/${userId}`).then((res) => res.json()),
  });
  const favorites = data?.favorites;
  return { favorites, isLoading };
};

export default useFetchFavorites;
