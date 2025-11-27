import { clientApiInstance } from "@/services/instance/client";

interface DeleteMemberParams {
  groupId: number;
  memberUserId: number;
}

export async function deleteMember({
  groupId,
  memberUserId,
}: DeleteMemberParams) {
  await clientApiInstance.delete(`/groups/${groupId}/member/${memberUserId}`);
}
