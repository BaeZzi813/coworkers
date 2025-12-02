import landing1small from "@/assets/images/landing-1-small.png";
import landing2small from "@/assets/images/landing-2-small.png";
import landing3small from "@/assets/images/landing-3-small.png";
import landing4small from "@/assets/images/landing-4-small.png";
import Icon from "@/components/icon";
import { motion } from "framer-motion";
import Image from "next/image";
import StartButton from "./StartButton";
import {
  defaultMotion,
  fadeInLeft,
  fadeInRight,
  fadeInScale,
  fadeInUp,
} from "./landing-motion";

export default function MobileLanding() {
  return (
    <>
      <section className="mb-[30px]">
        <div className="relative min-h-[730px] bg-background-secondary">
          <motion.div
            variants={fadeInLeft}
            {...defaultMotion}
            className="min-h-36"
          >
            <div className="absolute top-9 left-5">
              <Icon name="union" size="small" />
            </div>
            <div className="pt-[70px] pb-[19px] pl-[39px]">
              <p className="text-md-m text-state-400">
                함께 만들어가는 To do list
              </p>
              <p className="text-[28px] font-bold text-brand-primary">
                Coworkers
              </p>
            </div>
          </motion.div>
          <motion.div variants={fadeInScale} {...defaultMotion}>
            <div className="relative h-[586px]">
              <Image
                src={landing1small}
                alt="랜딩이미지1 모바일"
                fill
                className="object-contain object-right"
              />
            </div>
            <div className="absolute right-10 bottom-13 w-40">
              <StartButton />
            </div>
          </motion.div>
        </div>
      </section>
      <section>
        <div className="min-h-[494px] bg-state-50 pl-[35px]">
          <motion.div
            variants={fadeInUp}
            {...defaultMotion}
            className="min-h-[181px]"
          >
            <div className="flex flex-col gap-3 pt-[43px] pb-[19px]">
              <Icon name="folder" size="small" />
              <p className="text-lg-b text-brand-primary">
                칸반보드로 함께
                <br /> 할 일 목록을 관리해요
              </p>
              <p className="text-xs-r text-state-400">
                팀원과 함께 실시간으로 할 일을 추가하고
                <br /> 지금 무엇을 해야 하는지 한눈에 볼 수 있어요
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            {...defaultMotion}
            className="relative h-[269px] pb-11"
          >
            <Image
              src={landing2small}
              alt="랜딩이미지2 모바일"
              fill
              className="object-contain object-right"
            />
          </motion.div>
        </div>
      </section>
      <section>
        <div className="min-h-[494px] overflow-hidden bg-brand-primary pl-[18px]">
          <motion.div
            variants={fadeInLeft}
            {...defaultMotion}
            className="min-h-[186px]"
          >
            <div className="flex flex-col gap-3 pt-[43px] pb-[29px] pl-[17px]">
              <Icon name="doneShadow" size="small" />
              <p className="text-[16px] font-bold text-text-inverse">
                세부적으로 할 일들을
                <br /> 간편하게 체크해요
              </p>
              <p className="text-xs-r text-[#c9dafd]">
                일정에 맞춰 해야 할 세부 항목을 정리하고,
                <br /> 하나씩 빠르게 완료해보세요
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInScale}
            {...defaultMotion}
            className="relative h-[331px]"
          >
            <Image
              src={landing3small}
              alt="랜딩이미지3 모바일"
              fill
              className="object-contain object-bottom-right"
            />
          </motion.div>
        </div>
      </section>
      <section>
        <div className="min-h-[494px] overflow-hidden bg-state-50 pl-[18px]">
          <motion.div
            variants={fadeInUp}
            {...defaultMotion}
            className="min-h-[207px]"
          >
            <div className="flex flex-col gap-3 pt-[43px] pb-[50px] pl-[17px]">
              <Icon name="commentShadow" size="small" />
              <p className="text-lg-b text-brand-primary">
                할 일 공유를 넘어
                <br /> 의견을 나누고 함께 결정해요
              </p>
              <p className="text-md-r text-state-400">
                댓글로 진행상황을 기록하고 피드백을 주고받으며
                <br /> 함께 결정을 내릴 수 있어요
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            {...defaultMotion}
            className="relative mx-auto h-[287px] w-[340px]"
          >
            <Image
              src={landing4small}
              alt="랜딩이미지4 모바일"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </section>
      <div className="flex h-[275px] flex-col items-center">
        <div className="mt-[61px] mb-24 flex h-[119px] flex-col items-center gap-7">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-2lg-b text-brand-primary">
              지금 바로 시작해보세요
            </p>
            <p className="text-xs-r text-text-default">
              팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
            </p>
          </div>
          <div className="w-40">
            <StartButton />
          </div>
        </div>
      </div>
    </>
  );
}
