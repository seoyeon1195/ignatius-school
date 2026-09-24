"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";

export function DonateExperience() {
  const [isBodyVisible, setIsBodyVisible] = useState(false);
  const [isAccountVisible, setIsAccountVisible] = useState(false);

  useEffect(() => {
    const bodyTimer = window.setTimeout(() => setIsBodyVisible(true), 100);
    const accountTimer = window.setTimeout(
      () => setIsAccountVisible(true),
      2900,
    );

    return () => {
      window.clearTimeout(bodyTimer);
      window.clearTimeout(accountTimer);
    };
  }, []);

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-black text-white [font-family:var(--font-gowun-batang)] pc:overflow-hidden">
      <SiteHeader />

      {/*
        ≤1024 Flex column (시안 3):
        1) body  2) pencil frame (below body, right crop)  3) account below graphic
      */}
      <div className="relative z-10 flex min-h-[100svh] flex-col overflow-x-hidden px-[17px] pb-8 pt-[136px] tab:px-[clamp(24px,3.5vw,40px)] tab:pt-[clamp(120px,15vh,168px)] pc:hidden">
        <section className="relative z-20 w-full max-w-[340px] shrink-0 tab:max-w-[min(52vw,520px)]">
          <h1 className="bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[30px] leading-none text-transparent tab:text-[clamp(30px,3.9vw,40px)]">
            후원 안내
          </h1>

          <div
            className={`mt-[18px] break-keep text-[16px] leading-[1.6] tracking-[-0.02em] transition-opacity duration-[2700ms] ease-in-out tab:mt-[clamp(18px,2.2vh,24px)] tab:text-[clamp(16px,2.05vw,20px)] ${
              isBodyVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p>
              재정 지원: 금액 제한 없음
              <br />
              물품 지원: 학용품, 교재 등
              <br />
              문의 : 02-717-8248
            </p>
            <p className="mt-0">
              우리 학교는 자금 사용 내역을
              <br />
              투명하게 공개합니다.
            </p>
          </div>
        </section>

        {/* Fixed-height clip frame — pencil cannot climb into body */}
        <div
          aria-hidden="true"
          className="relative z-0 mt-6 h-[min(46svh,420px)] w-full shrink-0 overflow-hidden tab:mt-8 tab:h-[min(48svh,480px)]"
        >
          <div className="donate-pencil-graphic fluid-gradient-motion absolute bg-[linear-gradient(135deg,#d9e6ca_0%,#9fcaff_32%,#eff7b8_58%,#b7def0_78%,#d9e6ca_100%)] [mask-image:url('/graphics/pencil%20holder.svg')] [mask-position:left_top] [mask-repeat:no-repeat] [mask-size:100%_100%]" />
        </div>

        <div
          className={`donate-account-mobile relative z-20 mt-8 min-h-fit shrink-0 bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[30px] leading-[1.3] text-transparent transition-opacity duration-[2700ms] ease-in-out tab:mt-10 tab:text-[clamp(30px,3.9vw,40px)] ${
            isAccountVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>
            <span className="cta-line">우리 / 성이냐시오학교</span>
          </p>
          <p>
            <span className="cta-account">
              <span className="cta-account-seg">1005-</span>
              <span className="cta-account-seg">801-</span>
              <span className="cta-account-seg">898245</span>
            </span>
          </p>
        </div>
      </div>

      {/* ≥1025: existing PC absolute layout */}
      <div
        aria-hidden="true"
        className="crop-locked-graphic crop-locked-graphic--donate fluid-gradient-motion absolute aspect-[1059.16/1856.12] bg-[linear-gradient(135deg,#d9e6ca_0%,#9fcaff_32%,#eff7b8_58%,#b7def0_78%,#d9e6ca_100%)] [mask-image:url('/graphics/pencil%20holder.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] hidden pc:block pc:right-[10%] pc:top-[16.3%] pc:w-[min(40vw,780px)]"
      />

      <section className="absolute left-[1.9vw] top-[17.5%] z-10 hidden w-[min(34vw,520px)] pc:block">
        <h1 className="bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[clamp(34px,3.5vw,88px)] leading-none text-transparent">
          후원 안내
        </h1>

        <div
          className={`mt-[18px] break-keep text-[clamp(20px,1.95vw,48px)] leading-[1.65] tracking-[-0.02em] transition-opacity duration-[2700ms] ease-in-out ${
            isBodyVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>
            재정 지원: 금액 제한 없음
            <br />
            물품 지원: 학용품, 교재 등
            <br />
            문의 : 02-717-8248
          </p>
          <p className="mt-[20px]">
            우리 학교는 자금 사용 내역을
            <br />
            투명하게 공개합니다.
          </p>
        </div>
      </section>

      <div
        className={`absolute bottom-[2.5%] left-[1.9vw] z-10 hidden max-w-[min(34vw,520px)] bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-left text-[clamp(37px,3.61vw,90px)] leading-[1.15] text-transparent transition-opacity duration-[2700ms] ease-in-out pc:block ${
          isAccountVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p>우리은행</p>
        <p>성이냐시오학교</p>
        <p>1005-801-898245</p>
      </div>

      <SocialIcons />
    </main>
  );
}

function SiteHeader() {
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
        <Link href="/recruit">모집</Link>
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
