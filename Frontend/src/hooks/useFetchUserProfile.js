import { useQuery } from "@tanstack/react-query";

const useFetchUserProfile = (_id) => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetch(`/api/users/${_id}`).then((res) => res.json()),
  });
  const user = data?.user;

  return { user, isPending, isLoading };
};

export default useFetchUserProfile;
