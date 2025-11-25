import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import { Alert } from "@/components/modal";
import { Member } from "@/types/member";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { overlay } from "overlay-kit";

interface Props {
  members: Member[];
}

export default function TeamPageMembersList({ members }: Props) {
  const handleInviteClick = () => {
    // TODO: Invite modal
  };

  return (
    <div className="w-60 rounded-xl border border-border-primary bg-background-primary px-5 py-6">
      <header className="flex items-center justify-between">
        <div className="text-lg-m">
          <span className="text-text-primary">멤버 </span>
          <span className="text-text-default">{`(${members.length}명)`}</span>
        </div>
        <button
          className="text-lg-s text-brand-primary"
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
    overlay.open(({ isOpen, close, unmount }) => {
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
    });
  };

  return (
    <button
      className="flex cursor-pointer items-center gap-3"
      onClick={handleClick}
    >
      <Avatar source={member.userImage} size="medium" />
      <div className="text-left">
        <div className="text-sm-s text-text-primary">{member.userName}</div>
        <div className="text-xs-r text-text-secondary">{member.userEmail}</div>
      </div>
    </button>
  );
}
