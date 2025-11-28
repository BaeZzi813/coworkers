import { apiRequest, APIRequestOptions } from "@/services/api-request";
import { clientApiInstance } from "@/services/instance/client";
import { UserGroup } from "@/types/group";
import { User } from "@/types/user";
import { isAxiosError } from "axios";

export async function getUser(options?: APIRequestOptions) {
  return apiRequest<User>(async (instance) => {
    const response = await instance.get("/user");
    return response.data;
  }, options);
}

export async function getUserGroups() {
  const response = await clientApiInstance.get<UserGroup[]>("/user/groups");
  return response.data;
}

interface PostResetPasswordParams {
  email: string;
}

interface PostResetPasswordResponse {
  message: string;
}

export async function postResetPassword({ email }: PostResetPasswordParams) {
  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL
      : "http://localhost:3000";

  try {
    const response = await clientApiInstance.post<PostResetPasswordResponse>(
      "/user/send-reset-password-email",
      { email, redirectUrl }
    );
    return response.data.message;
  } catch {
    throw Error("가입되지 않은 이메일입니다. 이메일 주소를 확인해주세요.");
  }
}

interface PatchResetPasswordParams {
  password: string;
  confirmedPassword: string;
  token: string;
}

export async function patchResetPassword({
  password,
  confirmedPassword,
  token,
}: PatchResetPasswordParams) {
  try {
    const response = await clientApiInstance.patch<PostResetPasswordResponse>(
      "/user/reset-password",
      { password, passwordConfirmation: confirmedPassword, token }
    );
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      throw Error(error.response?.data.message);
    }
  }
}
