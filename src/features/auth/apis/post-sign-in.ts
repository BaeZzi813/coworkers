import { proxyClient } from "@/services/client";
import { User } from "@/types/user";

interface SignInParameters {
  email: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  user: User;
}

export async function postSignIn(
  params: SignInParameters
): Promise<SignInResponse> {
  const response = await proxyClient.post<SignInResponse>(
    "/auth/signIn",
    params
  );
  return response.data;
}
