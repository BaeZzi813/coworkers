import { QueryClient } from "@tanstack/react-query";
import { getUser, getUserHistory } from "../apis";
import { USER_HISTORY_QUERY_KEY } from "./query-key";

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

export async function prefetchUserHistory(
  queryClient: QueryClient,
  { accessToken }: Props
) {
  await queryClient.prefetchQuery({
    queryKey: USER_HISTORY_QUERY_KEY,
    queryFn: () => getUserHistory({ accessToken }),
  });
}
