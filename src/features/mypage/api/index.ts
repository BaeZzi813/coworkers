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

interface DeleteUserParameters {
  teamId: string;
}

interface DeleteUserResponse {
  message: string;
}

export async function deleteUser(
  params: DeleteUserParameters
): Promise<DeleteUserResponse> {
  const response = await clientProxyInstance.delete<DeleteUserResponse>(
    `/${params.teamId}/user/membershipwithdrawal`
  );
  return response.data;
}
