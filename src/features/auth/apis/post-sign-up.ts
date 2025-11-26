import { clientProxyInstance } from "@/services/instance/client";
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
  const response = await clientProxyInstance.post<SignUpResponse>(
    "/auth/signUp",
    params
  );
  return response.data;
}
