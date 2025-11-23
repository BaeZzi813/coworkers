import { clientProxyInstance } from "@/services/instance/client";

export async function postSignOut() {
  await clientProxyInstance.post("/auth/signOut");
}
