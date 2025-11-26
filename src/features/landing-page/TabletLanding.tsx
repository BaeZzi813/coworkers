import landing1medium from "@/assets/images/landing-1-medium.png";
import landing2medium from "@/assets/images/landing-2-medium.png";
import landing3medium from "@/assets/images/landing-3-medium.png";
import landing4medium from "@/assets/images/landing-4-medium.png";
import { Button } from "@/components/button";
import Icon from "@/components/icon";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TabletLanding() {
  const router = useRouter();
  return (
    <>
      <section>
        <div className="relative min-h-[960px] bg-background-secondary">
          <div className="min-h-[211px]">
            <div className="absolute top-24 left-[37px]">
              <Icon name="union" size="small" />
            </div>
            <div className="pt-[131px] pb-[18px] pl-[60px]">
              <p className="text-lg-m text-state-400">
                함께 만들어가는 To do list
              </p>
              <p className="text-[36px] font-bold text-brand-primary">
                Coworkers
              </p>
            </div>
          </div>
          <div className="flex h-[749px] w-full justify-end">
            <div className="relative h-full w-[649px]">
              <Image
                src={landing1medium}
                alt="랜딩이미지1 태블릿"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute right-10 bottom-13 w-40">
            <Button
              title="지금 시작하기"
              onClick={() => router.push("/login")}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="min-h-[790px] bg-state-50 pl-[31px]">
          <div className="min-h-[249px]">
            <div className="flex flex-col gap-3 pt-[73px] pb-[19px] pl-[31px]">
              <Icon name="folder" size="medium" />
              <p className="text-2xl-b text-brand-primary">
                칸반보드로 함께
                <br /> 할 일 목록을 관리해요
              </p>
              <p className="text-md-r text-state-400">
                팀원과 함께 실시간으로 할 일을 추가하고
                <br /> 지금 무엇을 해야 하는지 한눈에 볼 수 있어요
              </p>
            </div>
          </div>
          <div className="flex h-[460px] w-full justify-end">
            <div className="relative h-full w-[641px] pb-11">
              <Image
                src={landing2medium}
                alt="랜딩이미지2 태블릿"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="min-h-[680px] overflow-hidden bg-brand-primary pl-[45px]">
          <div className="min-h-[248px]">
            <div className="flex flex-col gap-3 pt-[49px] pb-[41px] pl-[26px]">
              <Icon name="doneShadow" size="medium" />
              <p className="text-2xl-b text-text-inverse">
                세부적으로 할 일들을
                <br /> 간편하게 체크해요
              </p>
              <p className="text-md-r text-[#c9dafd]">
                일정에 맞춰 해야 할 세부 항목을 정리하고,
                <br /> 하나씩 빠르게 완료해보세요
              </p>
            </div>
          </div>
          <div className="flex h-[432px] w-full items-end justify-end">
            <div className="relative h-full w-[627px]">
              <Image
                src={landing3medium}
                alt="랜딩이미지3 태블릿"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="h-[790px] overflow-hidden bg-state-50 pl-[66px]">
          <div className="h-[333px]">
            <div className="flex flex-col gap-3 pt-24 pb-[79px] pl-[5px]">
              <Icon name="commentShadow" size="medium" />
              <p className="text-2xl-b text-brand-primary">
                할 일 공유를 넘어
                <br /> 의견을 나누고 함께 결정해요
              </p>
              <p className="text-md-r text-state-400">
                댓글로 진행상황을 기록하고 피드백을 주고받으며
                <br /> 함께 결정을 내릴 수 있어요
              </p>
            </div>
          </div>
          <div className="relative mx-auto h-[457px] w-[540px]">
            <Image
              src={landing4medium}
              alt="랜딩이미지4 태블릿"
              fill
              className="object-contain"
            />
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
          <div className="w-40">
            <Button
              title="지금 시작하기"
              onClick={() => router.push("/login")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
