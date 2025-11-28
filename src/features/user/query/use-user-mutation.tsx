import { useMutation } from "@tanstack/react-query";
import { patchResetPassword, postResetPassword } from "../apis";

export function useResetPasswordMutation() {
  const postMutation = useMutation({
    mutationFn: postResetPassword,
  });

  const patchMutation = useMutation({
    mutationFn: patchResetPassword,
  });

  return { postMutation, patchMutation };
}
