import { useMutation } from "@tanstack/react-query";
import { postResetPassword } from "../apis";

export function useResetPasswordMutation() {
  const postResetPasswordMutation = useMutation({
    mutationFn: postResetPassword,
  });

  return { postResetPasswordMutation };
}
