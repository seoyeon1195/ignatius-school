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
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white [font-family:var(--font-gowun-batang)]">
      <SiteHeader />

      <div
        aria-hidden="true"
        className="crop-locked-graphic crop-locked-graphic--donate fluid-gradient-motion absolute aspect-[1059.16/1856.12] bg-[linear-gradient(135deg,#d9e6ca_0%,#9fcaff_32%,#eff7b8_58%,#b7def0_78%,#d9e6ca_100%)] [mask-image:url('/graphics/pencil%20holder.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] pc:right-[10%] pc:top-[16.3%] pc:w-[min(40vw,780px)]"
      />

      <section className="absolute left-[17px] top-[136px] z-10 w-[min(calc(100%-34px),340px)] pc:left-[1.9vw] pc:right-auto pc:top-[17.5%] pc:w-[min(34vw,520px)]">
        <h1 className="bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[30px] leading-none text-transparent pc:text-[clamp(34px,3.5vw,88px)]">
          후원 안내
        </h1>

        <div
          className={`mt-[18px] break-keep text-[16px] leading-[1.6] tracking-[-0.02em] transition-opacity duration-[2700ms] ease-in-out pc:text-[clamp(20px,1.95vw,48px)] pc:leading-[1.65] ${
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
          <p className="mt-0 pc:mt-[20px]">
            우리 학교는 자금 사용 내역을
            <br />
            투명하게 공개합니다.
          </p>
        </div>
      </section>

      <div
        className={`absolute bottom-[14px] left-[17px] z-10 bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[30px] leading-[1.3] text-transparent transition-opacity duration-[2700ms] ease-in-out pc:bottom-[2.5%] pc:left-[1.9vw] pc:max-w-[min(34vw,520px)] pc:translate-x-0 pc:text-left pc:text-[clamp(37px,3.61vw,90px)] pc:leading-[1.15] ${
          isAccountVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="pc:hidden">
          <p>우리 / 성이냐시오학교</p>
          <p>1005-801-898245</p>
        </div>
        <div className="hidden pc:block">
          <p>우리은행</p>
          <p>성이냐시오학교</p>
          <p>1005-801-898245</p>
        </div>
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
