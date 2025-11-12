import BgTeamPattern from "@/assets/images/bg-team-pattern.png";
import Dropdown, { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";
import Image from "next/image";

export default function TeamHeader() {
  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleSelect = (option: DropdownOption | string) => {
    if (typeof option === "string") return;
    switch (option.value) {
      case "edit":
        console.log("팀 정보 수정");
        break;
      case "delete":
        console.log("팀 삭제");
        break;
    }
  };

  return (
    <>
      <header className="flex h-7 w-full max-w-[1120px] items-center justify-start rounded-xl bg-none shadow-[0px_15px_50px_-12px_rgba(0,0,0,0.05)] outline-border-primary desktop:h-16 desktop:justify-between desktop:bg-background-primary desktop:px-7 desktop:py-4 desktop:outline">
        <h1 className="text-lg-b text-text-primary tablet:text-2xl-b">
          {"경영관리팀"}
        </h1>

        <Image
          src={BgTeamPattern}
          alt=""
          aria-hidden
          width={326}
          height={102}
          className="mr-2.5 ml-auto hidden desktop:block"
        />

        <Dropdown
          anchor={
            <button
              aria-label="팀 설정 열기"
              className="ml-2 cursor-pointer py-1"
            >
              <Icon name="gear" size="large" />
            </button>
          }
          options={options}
          alignment="left"
          onSelect={handleSelect}
        />
      </header>
    </>
  );
}
