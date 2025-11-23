import { useQuery } from "@tanstack/react-query";
import { getUser } from "../apis";

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user: data };
}
