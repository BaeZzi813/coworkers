import { proxyClient } from "@/services/client";

export async function postSignOut() {
  await proxyClient.post("/auth/signOut");
}
