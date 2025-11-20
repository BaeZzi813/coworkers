import { proxyClient } from "@/services/client";
import { User } from "@/types/user";

interface SignUpParameters {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  accessToken: string;
  user: User;
}

export async function postSignUp(
  params: SignUpParameters
): Promise<SignUpResponse> {
  const response = await proxyClient.post<SignUpResponse>(
    "/auth/signUp",
    params
  );
  return response.data;
}
