import { bearer } from "@/features/auth/utils/token";
import { uploadImage } from "@/features/image/apis";
import { apiRequest, type APIRequestOptions } from "@/services/api-request";
import {
  clientApiInstance,
  clientProxyInstance,
} from "@/services/instance/client";
import { Group } from "@/types/group";

interface GetGroupsOptions {
  accessToken: string;
}

export async function getGroups({ accessToken }: GetGroupsOptions) {
  const instance = clientProxyInstance;

  try {
    instance.defaults.headers.common.Authorization = bearer(accessToken);
    const response = await instance.get<Group[]>("/groups");
    return response.data;
  } finally {
    delete instance.defaults.headers.common.Authorization;
  }
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

interface PostGroupParams {
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

interface PatchGroupsParams {
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

interface DeleteGroupParams {
  groupId: number;
}

export async function deleteGroup({ groupId }: DeleteGroupParams) {
  await clientApiInstance.delete(`/groups/${groupId}`);
}

interface GetInvitationLinkParams {
  groupId: number;
}

export async function getInvitationLink({ groupId }: GetInvitationLinkParams) {
  const response = await clientApiInstance.get<string>(
    `/groups/${groupId}/invitation`
  );
  return response.data;
}

interface PostInvitationParams {
  userEmail: string;
  token: string;
}

export async function postInvitation({
  userEmail,
  token,
}: PostInvitationParams) {
  const response = await clientApiInstance.post<{ groupId: number }>(
    "/groups/accept-invitation",
    {
      userEmail,
      token,
    }
  );
  return response.data;
}
