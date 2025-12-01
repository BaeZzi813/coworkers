import EditDropdown from "@/components/dropdown/EditDropdown";
import { openDeleteAlert } from "@/components/modal/DeleteAlert";
import { openErrorAlert } from "@/components/modal/ErrorAlert";
import { useResponsive } from "@/hooks/use-responsive";
import { Group } from "@/types/group";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useGroupMutation } from "../query/use-group-mutation";

interface Props {
  group: Group;
  anchor: ReactNode;
}

export default function GroupEditDropdown({ group, anchor }: Props) {
  const { isDesktop } = useResponsive();
  const { deleteMutation } = useGroupMutation();
  const router = useRouter();

  const handleEdit = () => {
    const { teamId, id } = router.query;
    const returnTo = `/${teamId}` + (id ? `/tasklist?id=${id}` : "");
    router.push(`/${group.id}/edit?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleDeleteSuccess = () => router.replace("/dashboard");

  const handleDeleteError = (error: Error) => {
    openErrorAlert({ title: "팀 삭제 실패", error });
  };

  const handleGroupDelete = () => {
    const handleDelete = async () => {
      deleteMutation.mutate(group.id, {
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError,
      });
      close();
    };

    openDeleteAlert({
      title: `‘${group.name}' 팀을\n정말 삭제하시겠어요?`,
      onDelete: handleDelete,
    });
  };

  return (
    <EditDropdown
      anchor={anchor}
      gap={20}
      alignment={isDesktop ? "left" : "right"}
      alignmentOffset={isDesktop ? -18 : -10}
      onEdit={handleEdit}
      onDelete={handleGroupDelete}
    />
  );
}
