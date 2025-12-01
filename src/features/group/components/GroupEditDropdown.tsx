import EditDropdown from "@/components/dropdown/EditDropdown";
import { DeleteAlert, ErrorAlert } from "@/components/modal";
import { useResponsive } from "@/hooks/use-responsive";
import { Group } from "@/types/group";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
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
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <ErrorAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="팀 삭제 실패"
          error={error}
        />
      ),
      { overlayId: "group-delete-error-alert" }
    );
  };

  const handleDelete = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => {
        const handleDelete = async () => {
          deleteMutation.mutate(group.id, {
            onSuccess: handleDeleteSuccess,
            onError: handleDeleteError,
          });
          close();
        };

        return (
          <DeleteAlert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title={`‘${group.name}' 팀을\n정말 삭제하시겠어요?`}
            onDelete={handleDelete}
          />
        );
      },
      { overlayId: "group-delete-alert" }
    );
  };

  return (
    <EditDropdown
      anchor={anchor}
      gap={20}
      alignment={isDesktop ? "left" : "right"}
      alignmentOffset={isDesktop ? -18 : -10}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
