import { clientProxyInstance } from "@/services/instance/client";

interface ChangePasswordParameters {
  teamId: string;
  password: string;
  passwordConfirmation: string;
}

interface ChangePasswordResponse {
  message: string;
}

export async function patchChangePassword(
  params: ChangePasswordParameters
): Promise<ChangePasswordResponse> {
  const response = await clientProxyInstance.patch<ChangePasswordResponse>(
    `/${params.teamId}/user/password`,
    {
      password: params.password,
      passwordConfirmation: params.passwordConfirmation,
    }
  );
  return response.data;
}
