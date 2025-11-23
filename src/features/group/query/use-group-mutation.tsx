import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup, patchGroup, postGroup } from "../apis";

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

  return { postMutation, patchMutation, deleteMutation };
}
