import { getGroup } from "@/features/group/apis";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { Member } from "@/types/member";
import { Task, TaskList } from "@/types/task";

interface PageProps {
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

  return gsspPropsWithTokenReturn(
    {
      members: group.members,
      taskLists: group.taskLists,
      tasks: group.taskLists.flatMap((taskList) => taskList.tasks),
    },
    accessToken
  );
});

export default serverSideComponentWithAuth<PageProps>(
  ({ members, taskLists, tasks }) => {
    return (
      <div>
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
