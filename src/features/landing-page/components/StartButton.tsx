import { Button } from "@/components/button";
import { useRouter } from "next/router";

export default function StartButton() {
  const router = useRouter();

  return <Button title="지금 시작하기" onClick={() => router.push("/login")} />;
}
