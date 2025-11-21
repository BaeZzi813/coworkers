import { getGroup } from "@/features/group/apis";
import { getUser } from "@/features/user/apis/get-user";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { Group } from "@/types/group";
import { Member } from "@/types/member";
import { Task, TaskList } from "@/types/task";

interface PageProps {
  isAdmin: boolean;
  group: Group;
  members: Member[];
  taskLists: TaskList[];
  tasks: Task[];
}

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const params = context.params;
  const teamId = Number(params?.teamId);
  if (isNaN(teamId)) {
    return GSSP_NOT_FOUND_RETURN;
  }

  const group = await getGroup({ groupId: teamId }, { accessToken });
  const currentUser = await getUser({ accessToken });
  const adminMember = group.members.find((member) => member.role === "ADMIN");
  const isAdmin = adminMember?.userId === currentUser.id;

  return gsspPropsWithTokenReturn(
    {
      isAdmin,
      group,
      members: group.members,
      taskLists: group.taskLists,
      tasks: group.taskLists.flatMap((taskList) => taskList.tasks),
    },
    accessToken
  );
});

export default serverSideComponentWithAuth<PageProps>(
  ({ isAdmin, group, members, taskLists, tasks }) => {
    return (
      <div>
        <div>{isAdmin ? "You are an admin" : "You are not an admin"}</div>
        <div>Group Name : {group.name}</div>
        <div>
          <div>Members</div>
          {members.map((member) => member.userName)}
        </div>
        <div>
          <div>Task Lists</div>
          {taskLists.map((taskList) => taskList.name)}
        </div>
        <div>
          <div>Tasks</div>
          {tasks.map((task) => task.name)}
        </div>
      </div>
    );
  }
);
