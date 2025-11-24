import { serverApiInstance } from "@/services/instance/server";
import { withAxiosErrorResponse } from "@/services/with-axios-error-response";
import { Group, UserGroup } from "@/types/group";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  serverApiInstance.defaults.headers.common.Authorization =
    req.headers.authorization;

  withAxiosErrorResponse(
    res,
    async () => {
      const userGroupsResponse =
        await serverApiInstance.get<UserGroup[]>("/user/groups");
      const userGroups = userGroupsResponse.data;

      const groupsResponses = await Promise.all(
        userGroups.map((group) =>
          serverApiInstance.get<Group>(`/groups/${group.id}`)
        )
      );
      const groups = groupsResponses.flatMap((response) => response.data);

      res.status(200).json(groups);
    },
    () => {
      delete serverApiInstance.defaults.headers.common.Authorization;
    }
  );
}
