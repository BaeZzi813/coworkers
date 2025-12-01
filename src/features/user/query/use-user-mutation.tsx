import { useMutation } from "@tanstack/react-query";
import { patchPassword, patchResetPassword, postResetPassword } from "../apis";

export function useResetPasswordMutation() {
  const postMutation = useMutation({
    mutationFn: postResetPassword,
  });

  const patchMutation = useMutation({
    mutationFn: patchResetPassword,
  });

  return { postMutation, patchMutation };
}

export function useChangePasswordMutation() {
  const mutation = useMutation({
    mutationFn: patchPassword,
  });

  return { mutation };
}
