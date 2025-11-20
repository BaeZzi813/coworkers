import { clientApiInstance } from "@/services/instance/client";
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
  const response = await clientApiInstance.post<SignInResponse>(
    "/auth/signIn",
    params
  );
  return response.data;
}
