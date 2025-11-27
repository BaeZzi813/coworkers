import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";
import { Member } from "@/types/member";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { overlay } from "overlay-kit";
import { useContext } from "react";
import { getInvitationLink } from "../apis";
import { TeamContext } from "./TeamProvider";

interface Props {
  members: Member[];
}

export default function TeamPageMembersList({ members }: Props) {
  const groupId = useContext(TeamContext)!.group.id;
  const [, setInvitationLink] = useCopyToClipboard();

  const handleInviteClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => {
        const handleClick = async () => {
          const invitationLink = await getInvitationLink({ groupId });
          setInvitationLink(invitationLink);
          close();
        };

        return (
          <Alert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title="멤버 초대"
            message="그룹에 참여할 수 있는 링크를 복사합니다."
            actions={[
              <Button
                key="member-invite-alert-action"
                title="링크 복사하기"
                onClick={handleClick}
              />,
            ]}
          />
        );
      },
      { overlayId: "member-invite-alert" }
    );
  };

  return (
    <div className="w-60 shrink-0 rounded-xl border border-border-primary bg-background-primary px-5 py-6">
      <header className="flex items-center justify-between">
        <div className="text-lg-m">
          <span className="text-text-primary">멤버 </span>
          <span className="text-text-default">{`(${members.length}명)`}</span>
        </div>
        <button
          className="cursor-pointer text-lg-s text-brand-primary"
          onClick={handleInviteClick}
        >
          초대하기 +
        </button>
      </header>
      <ul className="mt-6 flex flex-col gap-4">
        {members.map((member) => (
          <li key={member.userId}>
            <MemberListItem member={member} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MemberListItem({ member }: { member: Member }) {
  const [, setEmail] = useCopyToClipboard();

  const handleClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => {
        const handleClick = () => {
          setEmail(member.userEmail);
          close();
        };

        return (
          <Alert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            header={<Avatar source={member.userImage} size="large" />}
            title={member.userName}
            message={member.userEmail}
            actions={[
              <Button
                key="member-detail-alert-action"
                title="이메일 복사하기"
                onClick={handleClick}
              />,
            ]}
          />
        );
      },
      { overlayId: "member-detail-alert" }
    );
  };

  const handleMemberDelete = () => {
    // TODO: 멤버 삭제 API 연동
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center gap-3"
      onClick={handleClick}
    >
      <Avatar source={member.userImage} size="medium" />
      <div className="min-w-0 grow text-left">
        <div className="overflow-hidden text-sm-s text-ellipsis whitespace-nowrap text-text-primary">
          {member.userName}
        </div>
        <div className="overflow-hidden text-xs-r text-ellipsis whitespace-nowrap text-text-secondary">
          {member.userEmail}
        </div>
      </div>
      <EditDropdown
        anchor={<Icon name="dots" size="small" />}
        onDelete={handleMemberDelete}
      />
    </button>
  );
}
