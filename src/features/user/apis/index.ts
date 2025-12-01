import { uploadImage } from "@/features/image/apis";
import { apiRequest, APIRequestOptions } from "@/services/api-request";
import { clientApiInstance } from "@/services/instance/client";
import { UserGroup } from "@/types/group";
import { TaskHistory } from "@/types/task";
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

export async function getUserHistory(options?: APIRequestOptions) {
  return apiRequest<TaskHistory[]>(async (instance) => {
    const response = await instance.get<{ tasksDone: TaskHistory[] }>(
      "/user/history"
    );
    return response.data.tasksDone;
  }, options);
}

interface PasswordResponse {
  message: string;
}

interface PostResetPasswordParams {
  email: string;
}

export async function postResetPassword({ email }: PostResetPasswordParams) {
  const redirectUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL
      : "http://localhost:3000";

  try {
    const response = await clientApiInstance.post<PasswordResponse>(
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
    const response = await clientApiInstance.patch<PasswordResponse>(
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

interface ChangePasswordParams {
  password: string;
  passwordConfirmation: string;
}

export async function patchPassword({
  password,
  passwordConfirmation,
}: ChangePasswordParams) {
  const response = await clientApiInstance.patch<PasswordResponse>(
    `/user/password`,
    {
      password,
      passwordConfirmation,
    }
  );
  return response.data.message;
}

export async function deleteUser() {
  await clientApiInstance.delete("/user");
}

interface PatchProfileParams {
  nickname?: string;
  imageFile?: File;
}

export async function patchProfile({
  nickname,
  imageFile,
}: PatchProfileParams) {
  const params: {
    nickname?: string;
    image?: string;
  } = {};

  if (nickname !== undefined && nickname.trim() !== "") {
    params.nickname = nickname.trim();
  }

  if (imageFile) {
    const { url } = await uploadImage({ imageFile });
    params.image = url;
  }

  const response = await clientApiInstance.patch<User>("/user", params);
  return response.data;
}
