import { userGroupsQueryKey } from "@/features/user/query/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, patchGroup, postGroup, postInvitation } from "../apis";
import { groupsQueryKey } from "./query-key";

export function useGroupMutation() {
  const queryClient = useQueryClient();

  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["user", "groups"] });
  };

  const postMutation = useMutation({
    mutationFn: postGroup,
    onSuccess: handleMutationSuccess,
  });

  const patchMutation = useMutation({
    mutationFn: patchGroup,
    onSuccess: handleMutationSuccess,
  });

  const deleteMutation = useMutation<void, Error, number, unknown>({
    mutationFn: (groupId) => deleteGroup({ groupId }),
    onSuccess: handleMutationSuccess,
  });

  const postInvitationMutation = useMutation({
    mutationFn: postInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupsQueryKey() });
      queryClient.invalidateQueries({ queryKey: userGroupsQueryKey });
    },
  });

  return {
    postMutation,
    patchMutation,
    deleteMutation,
    postInvitationMutation,
  };
}
