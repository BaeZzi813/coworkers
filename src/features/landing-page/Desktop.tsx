import landing1large from "@/assets/images/landing-1-large.png";
import landing2large from "@/assets/images/landing-2-large.png";
import landing3large from "@/assets/images/landing-3-large.png";
import landing4large from "@/assets/images/landing-4-large.png";
import { Button } from "@/components/button";
import Icon from "@/components/icon";

import Image from "next/image";
import Link from "next/link";

export default function Desktop() {
  return (
    <>
      <section>
        <div className="flex h-[1080px] bg-background-secondary">
          <div className="relative h-[1080px] w-[518px]">
            <div className="absolute top-52 left-[76px]">
              <Icon name="union" size="large" />
            </div>
            <div className="pt-[262px] pb-[18px] pl-[105px]">
              <p className="text-xl-m text-state-400">
                함께 만들어가는 To do list
              </p>
              <p className="text-[48px] font-bold text-brand-primary">
                Coworkers
              </p>
            </div>
            <Link
              href="/"
              className="absolute bottom-[228px] left-[106px] w-40"
            >
              <Button title="지금 시작하기" />
            </Link>
          </div>
          <div className="relative h-[1080px] w-[1330px]">
            <Image src={landing1large} alt="랜딩이미지1 모바일" fill />
          </div>
        </div>
      </section>

      <section>
        <div className="flex h-[800px] bg-state-50">
          <div className="h-[202px] w-[563px] pt-48 pl-[180px]">
            <div className="flex flex-col gap-3">
              <Icon name="folder" size="large" />
              <p className="text-3xl-b text-brand-primary">
                칸반보드로 함께
                <br /> 할 일 목록을 관리해요
              </p>
              <p className="text-lg-r text-state-400">
                팀원과 함께 실시간으로 할 일을 추가하고
                <br /> 지금 무엇을 해야 하는지 한눈에 볼 수 있어요
              </p>
            </div>
          </div>
          <div className="relative mt-[114px] h-[600px] w-5xl">
            <Image src={landing2large} alt="랜딩이미지2 모바일" fill />
          </div>
        </div>
      </section>

      <section>
        <div className="flex h-[750px] overflow-hidden bg-brand-primary">
          <div className="relative mt-[83px] ml-[165px] h-[667px] w-[982px]">
            <Image src={landing3large} alt="랜딩이미지3 모바일" fill />
          </div>
          <div className="h-[202px] w-[702px] pt-[266px] pl-[117px]">
            <div className="flex flex-col gap-3 pt-[49px] pb-[41px] pl-[26px]">
              <Icon name="doneShadow" size="large" />
              <p className="text-3xl-b text-text-inverse">
                세부적으로 할 일들을
                <br /> 간편하게 체크해요
              </p>
              <p className="text-lg-r text-[#c9dafd]">
                일정에 맞춰 해야 할 세부 항목을 정리하고,
                <br /> 하나씩 빠르게 완료해보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex h-[800px] overflow-hidden bg-state-50">
          <div className="h-[800px] w-[705px]">
            <div className="mt-48 ml-[180px] flex h-[202px] flex-col gap-3">
              <Icon name="commentShadow" size="large" />
              <p className="text-3xl-b text-brand-primary">
                할 일 공유를 넘어
                <br /> 의견을 나누고 함께 결정해요
              </p>
              <p className="text-lg-r text-state-400">
                댓글로 진행상황을 기록하고 피드백을 주고받으며
                <br /> 함께 결정을 내릴 수 있어요
              </p>
            </div>
          </div>
          <div className="relative h-[800px] w-[940px]">
            <Image src={landing4large} alt="랜딩이미지4 모바일" fill />
          </div>
        </div>
      </section>

      <div className="flex h-[328px] flex-col items-center">
        <div className="mt-[76px] mb-28 flex h-[119px] flex-col items-center gap-7">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-2xl-b text-brand-primary">
              지금 바로 시작해보세요
            </p>
            <p className="text-lg-r text-text-default">
              팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
            </p>
          </div>
          <Link href="/" className="w-40">
            <Button title="지금 시작하기" />
          </Link>
        </div>
      </div>
    </>
  );
}
