import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col bg-black text-[#020202] [font-family:var(--font-gowun-batang)] [--light-w:clamp(248px,calc(248px+(100vw-360px)*0.08),280px)] [--beam-inset:42px] [--page-gutter:16px] [--title-buffer:16px] [--page-edge:37px] tab:[--light-w:clamp(280px,36vw,420px)] pc:[--light-w:min(31.25vw,600px)] pc:[--beam-inset:90px]">
      <header className="absolute inset-x-0 top-0 z-20">
        <Link
          href="/"
          aria-label="성 이냐시오 학교 메인"
          className="absolute left-[18px] top-[14px] pc:left-[var(--page-edge)] pc:top-[3.2vh]"
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
          className="absolute right-[17px] top-[22px] flex items-center gap-[14px] text-[16px] leading-none text-white pc:right-[var(--page-edge)] pc:top-[calc(3.8vh+5px)] pc:gap-[clamp(14px,1.45vw,28px)] pc:text-[clamp(16px,2vw,48px)]"
        >
          <Link href="/activity">활동</Link>
          <Link href="/recruit">모집</Link>
          <Link href="/donate">후원</Link>
        </nav>
      </header>

      {/* PC (>=1025px): 헤더·슬로건·푸터 공통 --page-edge(37px) */}
      <section className="absolute inset-x-0 top-[19%] z-10 hidden items-center justify-between break-keep bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text px-[var(--page-edge)] text-[clamp(51px,3.4vw,92px)] leading-none tracking-[-0.04em] text-transparent pc:flex">
        <h1 className="break-keep whitespace-nowrap">만학의 꿈이 이뤄지는 곳,</h1>
        <p className="break-keep whitespace-nowrap">성 이냐시오 학교입니다.</p>
      </section>

      <div className="relative z-[1] flex w-full flex-1 flex-col items-center">
        <div
          aria-hidden="true"
          className="fluid-gradient-motion relative z-[2] -mt-2 aspect-[891.34/760.93] w-[var(--light-w)] shrink-0 bg-[linear-gradient(135deg,#DDEDD7_0%,#ACD5F1_48%,#DDEDD7_100%)] [mask-image:url('/graphics/light.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] pc:-mt-1.5"
        />

        <div className="fluid-light-back relative z-[1] -mt-[calc(var(--light-w)*760.93/891.34*0.18)] flex w-full flex-1 flex-col">
          <section className="relative z-10 break-keep px-4 pt-[calc(var(--flare-depth)+var(--title-buffer))] tab:max-w-[min(72vw,640px)] tab:px-[clamp(24px,3.5vw,40px)] pc:hidden">
            <h1 className="text-[clamp(28px,7.6vw,30px)] leading-[1.55] tracking-[-0.04em] tab:text-[clamp(30px,3.8vw,42px)]">
              만학의 꿈이 이뤄지는 곳,
              <br />
              성 이냐시오 학교입니다.
            </h1>
          </section>

          <section className="relative z-10 mt-[13px] break-keep px-4 text-[clamp(15px,4.1vw,16px)] leading-[1.55] tracking-[-0.025em] tab:mt-[clamp(13px,2vh,20px)] tab:max-w-[min(72vw,640px)] tab:px-[clamp(24px,3.5vw,40px)] tab:text-[clamp(16px,2.1vw,20px)] pc:mx-auto pc:mt-[clamp(64px,10vh,140px)] pc:max-w-[min(52vw,920px)] pc:px-0 pc:text-center pc:text-[clamp(21px,1.7vw,40px)]">
            <p>
              성 이냐시오 학교는 1977년부터
              <br className="pc:hidden" />
              이어져 온 야간학교입니다.
              <br />
              마포구 서강대학교에서 중·고등
              <br className="pc:hidden" />
              검정고시 수업을 제공합니다.
              <br />
              서강대학교의 지원을 받아 운영되며,
              <br className="pc:hidden" />
              종교와 무관합니다.
            </p>

            <p className="mt-6 pc:mt-[clamp(16px,1.46vw,28px)]">
              매주 월요일부터 금요일, 저녁 7시부터 9시 40분까지
              <br />
              무료로 총 7개의 과목에 대한 수업을 진행합니다.
            </p>
          </section>

          <footer className="relative z-10 mt-auto w-full pb-3 pt-8 [font-family:var(--font-noto-sans-kr)] pc:pb-[2.4vh] pc:pt-10">
            <div className="hidden w-full items-end px-[var(--page-edge)] pc:flex">
              <div className="flex w-[7.55vw] max-w-[145px] flex-col items-start">
                <Image
                  src="/logos/logo_black.svg"
                  alt=""
                  width={200}
                  height={134}
                  className="h-auto w-[3.95vw] max-w-[76px]"
                />
                <span className="mt-1 text-[clamp(12px,1.05vw,24px)] font-medium">
                  성 이냐시오
                </span>
              </div>

              <address className="ml-[0.5vw] flex items-end gap-[3.3vw] not-italic">
                <div className="text-[clamp(12px,1.05vw,24px)] font-medium leading-[1.65]">
                  <a href="tel:02-717-8248">02-717-8248</a>
                  <br />
                  <a href="mailto:ignatius_school@nate.com">
                    ignatius_school@nate.com
                  </a>
                </div>
                <p className="text-[clamp(12px,1.05vw,24px)] font-medium leading-[1.65]">
                  서울특별시 마포구 백범로 35
                  <br />
                  (교무실) 곤자가 플라자 B 102호
                </p>
              </address>

              <SocialIcons
                className="ml-auto"
                iconClassName="w-[clamp(23px,2.2vw,42px)]"
              />
            </div>

            <div className="flex w-full items-end justify-between px-4 tab:px-[clamp(24px,3.5vw,40px)] pc:hidden">
              <address className="not-italic text-[13px] font-normal leading-[1.45]">
                <p>
                  <a href="tel:02-717-8248">02-717-8248</a>
                  <br />
                  <a href="mailto:ignatius_school@nate.com">
                    ignatius_school@nate.com
                  </a>
                </p>
                <p className="mt-3.5">
                  서울특별시 마포구 백범로 35
                  <br />
                  (교무실) 곤자가 플라자 B 102호
                </p>
              </address>

              <SocialIcons iconClassName="w-[27px]" />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}

function SocialIcons({
  className = "",
  iconClassName,
}: {
  className?: string;
  iconClassName: string;
}) {
  return (
    <div
      className={`flex items-center gap-[14px] pc:gap-[clamp(14px,1.45vw,28px)] ${className}`}
    >
      <a
        href="https://www.instagram.com/ignatius__school/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="인스타그램"
        className="cursor-pointer"
      >
        <Image
          src="/icons/insta_black.svg"
          alt="인스타그램"
          width={80}
          height={80}
          className={`h-auto ${iconClassName}`}
        />
      </a>
      <a
        href="https://blog.naver.com/ignatius__school"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="네이버 블로그"
        className="cursor-pointer"
      >
        <Image
          src="/icons/blog_dark.svg"
          alt="블로그"
          width={80}
          height={80}
          className={`h-auto ${iconClassName}`}
        />
      </a>
      <a
        href="https://cafe.naver.com/ignatius8248"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="네이버 카페"
        className="cursor-pointer"
      >
        <Image
          src="/icons/naver_dark.svg"
          alt="네이버 카페"
          width={80}
          height={80}
          className={`h-auto ${iconClassName}`}
        />
      </a>
    </div>
  );
}
