"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

type RecruitMode = "student" | "teacher";

export function RecruitExperience() {
  const [mode, setMode] = useState<RecruitMode>("student");
  const [isFirstParagraphVisible, setIsFirstParagraphVisible] = useState(false);
  const [isSecondParagraphVisible, setIsSecondParagraphVisible] =
    useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setIsFirstParagraphVisible(true), 100),
      window.setTimeout(() => {
        setIsSecondParagraphVisible(true);
        setIsBottomVisible(true);
      }, 2900),
      window.setTimeout(() => {
        setIsFirstParagraphVisible(false);
        setIsSecondParagraphVisible(false);
        setIsBottomVisible(false);
      }, 8600),
      window.setTimeout(() => setMode("teacher"), 11300),
      window.setTimeout(() => setIsFirstParagraphVisible(true), 11400),
      window.setTimeout(() => {
        setIsSecondParagraphVisible(true);
        setIsBottomVisible(true);
      }, 14200),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [sequence]);

  function restartSequence() {
    setMode("student");
    setIsFirstParagraphVisible(false);
    setIsSecondParagraphVisible(false);
    setIsBottomVisible(false);
    setSequence((value) => value + 1);
  }

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-black text-white [font-family:var(--font-gowun-batang)] pc:overflow-hidden">
      <SiteHeader onRecruitClick={restartSequence} />

      {/*
        ≤1024: bold right/bottom crop via oversized graphic + overflow-x-hidden
        CTA in flex mt-auto (not clipped by absolute bottom)
      */}
      <div
        aria-live="polite"
        className="relative flex min-h-[100svh] flex-col overflow-x-hidden pc:hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/*
            right-anchored: only right + pillar-bottom crop.
            mask left-top keeps shade bottom + right chain inside the box.
          */}
          <div className="recruit-stand-graphic fluid-gradient-motion absolute aspect-[1080/1920] bg-[linear-gradient(125deg,#d9e6ca_0%,#9dc9ff_48%,#d9e6ca_100%)] [mask-image:url('/graphics/stand.svg')] [mask-position:left_top] [mask-repeat:no-repeat] [mask-size:100%_100%]" />
        </div>

        <div className="relative z-20 flex min-h-[100svh] flex-col px-[17px] pb-[max(16px,env(safe-area-inset-bottom))] pt-[136px] tab:px-[clamp(24px,3.5vw,40px)] tab:pt-[clamp(120px,15vh,168px)]">
          <div className="w-full max-w-[340px] shrink-0 tab:max-w-[min(52vw,520px)]">
            <RecruitBody
              mode={mode}
              isFirstParagraphVisible={isFirstParagraphVisible}
              isSecondParagraphVisible={isSecondParagraphVisible}
              variant="mobile"
            />
          </div>

          <div
            className={`recruit-cta-mobile z-20 mt-auto min-h-fit max-w-full shrink-0 bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text pt-6 text-left text-[30px] leading-[1.2] text-transparent transition-opacity duration-[2700ms] ease-in-out tab:text-[clamp(30px,3.9vw,40px)] ${
              isBottomVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <RecruitCta mode={mode} />
          </div>
        </div>
      </div>

      {/* ≥1025: existing PC absolute layout */}
      <div
        aria-hidden="true"
        className="crop-locked-graphic crop-locked-graphic--stand fluid-gradient-motion absolute aspect-[1080/1920] bg-[linear-gradient(125deg,#d9e6ca_0%,#9dc9ff_48%,#d9e6ca_100%)] [mask-image:url('/graphics/stand.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] hidden pc:block pc:right-[6%] pc:top-[15.2%] pc:w-[min(42vw,820px)]"
      />

      <section
        aria-live="polite"
        className="absolute inset-0 z-10 hidden pc:block"
      >
        <div className="absolute left-[1.9vw] top-[17.5%] z-10 w-[min(36vw,560px)]">
          <RecruitBody
            mode={mode}
            isFirstParagraphVisible={isFirstParagraphVisible}
            isSecondParagraphVisible={isSecondParagraphVisible}
            variant="pc"
          />
        </div>

        <div
          className={`absolute bottom-[2.8%] left-[1.9vw] z-10 max-w-[min(36vw,560px)] bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-left text-[clamp(29px,3.65vw,92px)] leading-[1.15] text-transparent transition-opacity duration-[2700ms] ease-in-out ${
            isBottomVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <RecruitCta mode={mode} />
        </div>
      </section>

      <SocialIcons />
    </main>
  );
}

function RecruitBody({
  mode,
  isFirstParagraphVisible,
  isSecondParagraphVisible,
  variant,
}: {
  mode: RecruitMode;
  isFirstParagraphVisible: boolean;
  isSecondParagraphVisible: boolean;
  variant: "mobile" | "pc";
}) {
  const isStudent = mode === "student";
  const isPc = variant === "pc";

  return (
    <>
      <h1
        className={`bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text leading-none text-transparent ${
          isPc
            ? "text-[clamp(29px,3.65vw,92px)]"
            : "text-[30px] tab:text-[clamp(30px,3.9vw,40px)]"
        }`}
      >
        {isStudent ? "학생 모집" : "교사 모집"}
      </h1>

      <div
        className={`break-keep tracking-[-0.02em] ${
          isPc
            ? "mt-[12px] text-[clamp(16px,1.6vw,36px)] leading-[1.6]"
            : "mt-[17px] text-[16px] leading-[1.6] tab:mt-[clamp(17px,2.2vh,22px)] tab:text-[clamp(16px,2.05vw,20px)]"
        }`}
      >
        <p
          className={`transition-opacity duration-[2700ms] ease-in-out ${
            isFirstParagraphVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          이냐시오 학교는 연령, 성별, 학력에 대한
          <br />
          제한 없이,{" "}
          {isStudent
            ? "학생을 상시 모집합니다."
            : "교사를 정기적으로 모집합니다."}
          <br />
          {isStudent ? (
            isPc ? (
              <>
                중등반과 고등반 2개의 반이 있으며,
                <br />
                7개의 과목에 대한 수업을 무료로 제공합니다.
              </>
            ) : (
              <>
                중등반과 고등반 2개의 반이 있으며,
                <br />
                7개의 과목에 대한 수업을 제공합니다.
              </>
            )
          ) : (
            <>
              모집 인원과 절차 등의 정보는 모집 기간에
              <br />
              공식 SNS를 통해 안내됩니다.
            </>
          )}
        </p>

        <p
          className={`transition-opacity duration-[2700ms] ease-in-out ${
            isPc ? "mt-[16px]" : "mt-[18px]"
          } ${isSecondParagraphVisible ? "opacity-100" : "opacity-0"}`}
        >
          {isStudent ? (
            isPc ? (
              <>
                더욱 구체적인 상담을 원하시는 경우,
                <br />
                02-717-8248로 전화 주시면 됩니다!
              </>
            ) : (
              <>
                개인 상담을 원하시는 경우,
                <br />
                02-717-8248로 전화 주시면 됩니다!
              </>
            )
          ) : (
            <>
              궁금한 점이 있으신 경우,
              <br />
              인스타그램 공식 계정으로 디엠 부탁드립니다!
            </>
          )}
        </p>
      </div>
    </>
  );
}

function RecruitCta({mode}: {mode: RecruitMode}) {
  if (mode === "student") {
    return (
      <>
        <p>
          <span className="cta-line">개인 상담</span>
        </p>
        <p>
          <span className="cta-phone">
            <span className="cta-phone-seg">02-</span>
            <span className="cta-phone-seg">717-</span>
            <span className="cta-phone-seg">8248</span>
          </span>
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        <span className="cta-line">Instagram</span>
      </p>
      <p>
        <span className="cta-line">@ignatius__school</span>
      </p>
    </>
  );
}

function SiteHeader({onRecruitClick}: {onRecruitClick: () => void}) {
  return (
    <header className="absolute inset-x-0 top-0 z-30 h-[64px] bg-black pc:h-0 pc:bg-transparent">
      <Link
        href="/"
        aria-label="성 이냐시오 학교 메인"
        className="absolute left-[18px] top-[14px] pc:left-[2vw] pc:top-[3.2vh]"
      >
        <Image
          src="/logos/logo_grad.svg"
          alt="성 이냐시오 학교"
          width={200}
          height={134}
          priority
          className="h-auto w-[64px] pc:w-[7.8vw] pc:max-w-[150px]"
        />
      </Link>

      <nav
        aria-label="주요 메뉴"
        className="absolute right-[17px] top-[22px] flex items-center gap-[14px] text-[16px] leading-none pc:right-[1.8vw] pc:top-[calc(3.8vh+5px)] pc:gap-[clamp(14px,1.45vw,28px)] pc:text-[clamp(16px,2vw,48px)]"
      >
        <Link href="/activity">활동</Link>
        <button type="button" onClick={onRecruitClick}>
          모집
        </button>
        <Link href="/donate">후원</Link>
      </nav>
    </header>
  );
}

function SocialIcons() {
  return (
    <div className="absolute bottom-[2%] right-[1.8vw] z-30 hidden items-center gap-[clamp(10px,1.15vw,22px)] pc:flex">
      <SocialIcon
        href="https://www.instagram.com/ignatius__school/"
        src="/icons/insta_grad.svg"
        alt="인스타그램"
      />
      <SocialIcon
        href="https://blog.naver.com/ignatius__school"
        src="/icons/blog_grad.svg"
        alt="블로그"
      />
      <SocialIcon
        href="https://cafe.naver.com/ignatius8248"
        src="/icons/naver_grad.svg"
        alt="네이버 카페"
      />
    </div>
  );
}

function SocialIcon({
  href,
  src,
  alt,
}: {
  href: string;
  src: string;
  alt: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="cursor-pointer"
    >
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="h-auto w-[25px] pc:w-[clamp(20px,2vw,38px)]"
      />
    </a>
  );
}
