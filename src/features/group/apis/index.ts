import { uploadImage } from "@/features/image/apis";
import { apiRequest, type APIRequestOptions } from "@/services/api-request";
import { clientApiInstance } from "@/services/instance/client";
import { Group, UserGroup } from "@/types/group";

export async function getUserGroups(options?: APIRequestOptions) {
  return apiRequest<UserGroup[]>(async (instance) => {
    const response = await instance.get<UserGroup[]>("/user/groups");
    return response.data;
  }, options);
}

interface GetGroupParams {
  groupId: number;
}

export async function getGroup(
  params: GetGroupParams,
  options?: APIRequestOptions
) {
  return apiRequest<Group>(async (instance) => {
    const response = await instance.get(`/groups/${params.groupId}`);
    return response.data;
  }, options);
}

export interface PostGroupParams {
  imageFile?: File;
  name: string;
}

export async function postGroup({ imageFile, name }: PostGroupParams) {
  const params: {
    image?: string;
    name: string;
  } = { name };

  if (imageFile) {
    const { url } = await uploadImage({ imageFile });
    params.image = url;
  }

  const response = await clientApiInstance.post<Group>("/groups", params);
  return response.data;
}

export interface PatchGroupsParams {
  groupId: number;
  imageFile?: File;
  name?: string;
}

export async function patchGroup({
  groupId,
  imageFile,
  name,
}: PatchGroupsParams) {
  const params: {
    image?: string;
    name?: string;
  } = { name };

  if (imageFile) {
    const { url } = await uploadImage({ imageFile });
    params.image = url;
  }

  const response = await clientApiInstance.patch<Group>(
    `/groups/${groupId}`,
    params
  );
  return response.data;
}

export interface DeleteGroupParams {
  groupId: number;
}

export async function deleteGroup({ groupId }: DeleteGroupParams) {
  await clientApiInstance.delete(`/groups/${groupId}`);
}
