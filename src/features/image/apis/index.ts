import { clientApiInstance } from "@/services/instance/client";

export async function uploadImage(params: { imageFile: File }) {
  const formData = new FormData();
  formData.append("image", params.imageFile);
  const response = await clientApiInstance.post<{ url: string }>(
    "/images/upload",
    formData
  );
  return response.data;
}
