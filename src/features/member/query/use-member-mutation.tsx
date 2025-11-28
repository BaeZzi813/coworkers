import { useMutation } from "@tanstack/react-query";
import { deleteMember } from "../apis";

export function useMemberMutation() {
  const deleteMutation = useMutation({
    mutationFn: deleteMember,
  });

  return { deleteMutation };
}
