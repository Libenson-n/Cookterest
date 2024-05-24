import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useFetchUser = (_id) => {
  const { data, isPending, isLoading, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch(`/api/users/${_id}`).then((res) => res.json()),
  });

  const user = data?.user;

  return { user, isPending, isLoading, isFetching };
};

export default useFetchUser;
