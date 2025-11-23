import { useQuery } from "@tanstack/react-query";
import { getUser } from "../apis";

export function useUserQuery() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user: data };
}
