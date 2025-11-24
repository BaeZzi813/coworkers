import { QueryClient } from "@tanstack/react-query";
import { getUser } from "../apis";

interface Props {
  accessToken: string;
}

export async function prefetchUser(
  queryClient: QueryClient,
  { accessToken }: Props
) {
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => getUser({ accessToken }),
  });
}
