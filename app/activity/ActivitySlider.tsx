"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";

import {urlFor} from "@/sanity/image";
import type {ActivityImage} from "@/sanity/queries";

type ActivitySliderProps = {
  images: ActivityImage[];
};

export function ActivitySlider({images}: ActivitySliderProps) {
  const sliderImages = images;
  const hasMultipleImages = sliderImages.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isTrackAnimated, setIsTrackAnimated] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMobileGalleryVisible, setIsMobileGalleryVisible] = useState(false);
  const [isCaptionVisible, setIsCaptionVisible] = useState(true);
  const [introSequence, setIntroSequence] = useState(0);
  const captionSwapTimer = useRef<number | null>(null);
  const captionRevealTimer = useRef<number | null>(null);

  useEffect(() => {
    const contentTimer = window.setTimeout(() => {
      setIsContentVisible(true);
    }, 3000);
    const galleryTimer = window.setTimeout(() => {
      setIsMobileGalleryVisible(true);
    }, 3000);

    return () => {
      window.clearTimeout(contentTimer);
      window.clearTimeout(galleryTimer);
    };
  }, [introSequence]);

  useEffect(() => {
    return () => {
      if (captionSwapTimer.current !== null) {
        window.clearTimeout(captionSwapTimer.current);
      }
      if (captionRevealTimer.current !== null) {
        window.clearTimeout(captionRevealTimer.current);
      }
    };
  }, []);

  const currentImage = sliderImages[currentIndex];

  function goTo(direction: "prev" | "next") {
    if (!hasMultipleImages || isSliding) {
      return;
    }

    setIsSliding(true);
    setIsCaptionVisible(false);

    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % sliderImages.length
        : (currentIndex - 1 + sliderImages.length) % sliderImages.length;

    setTrackIndex(trackIndex + (direction === "next" ? 1 : -1));

    if (captionSwapTimer.current !== null) {
      window.clearTimeout(captionSwapTimer.current);
    }
    if (captionRevealTimer.current !== null) {
      window.clearTimeout(captionRevealTimer.current);
    }

    captionSwapTimer.current = window.setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, 250);

    captionRevealTimer.current = window.setTimeout(() => {
      setIsCaptionVisible(true);
      finishSlide(direction === "next" ? trackIndex + 1 : trackIndex - 1);
    }, 500);
  }

  function finishSlide(activeTrackIndex: number) {
    const resetIndex =
      ((activeTrackIndex % sliderImages.length) + sliderImages.length) %
        sliderImages.length || sliderImages.length;

    setIsTrackAnimated(false);
    setTrackIndex(resetIndex);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTrackAnimated(true);
        setIsSliding(false);
      });
    });
  }

  function restartIntro() {
    window.scrollTo({top: 0, behavior: "smooth"});
    setIsContentVisible(false);
    setIsMobileGalleryVisible(false);
    setIntroSequence((sequence) => sequence + 1);
  }

  const loopedImages =
    sliderImages.length > 0
      ? [
          sliderImages[sliderImages.length - 1],
          ...sliderImages,
          sliderImages[0],
        ]
      : [];

  return (
    <main
      className={`relative bg-black [font-family:var(--font-gowun-batang)] pc:min-h-[100svh] pc:overflow-hidden ${
        isMobileGalleryVisible
          ? "h-[100svh] overflow-hidden"
          : "h-[100svh] overflow-hidden"
      }`}
    >
      <div
        aria-hidden="true"
        className={`fluid-gradient-motion pointer-events-none absolute left-0 top-[33.5%] z-0 hidden aspect-[1920.26/1115.99] w-full bg-[linear-gradient(120deg,#9bc8ff_0%,#dcebd5_42%,#acd5f1_68%,#9bc8ff_100%)] transition-all duration-1000 ease-in-out [mask-image:url('/graphics/book_pc.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] pc:block ${
          isContentVisible ? "opacity-36" : "opacity-100"
        }`}
      />
      <div
        aria-hidden="true"
        className={`crop-locked-graphic crop-locked-graphic--book fluid-gradient-motion pointer-events-none fixed top-[100px] z-0 aspect-[3/5] bg-[linear-gradient(120deg,#9bc8ff_0%,#dcebd5_42%,#acd5f1_68%,#9bc8ff_100%)] transition-all duration-1000 ease-in-out [mask-image:url('/graphics/book_mobile.svg')] [mask-repeat:no-repeat] [mask-size:100%_100%] pc:hidden ${
          isContentVisible
            ? "translate-y-[min(410px,48svh)] opacity-36"
            : "translate-y-0 opacity-100"
        }`}
      />

      <SiteHeader onActivityClick={restartIntro} />
      <SiteFooter />

      <section
        aria-label="활동 사진 슬라이더"
        aria-hidden={!isContentVisible}
        inert={!isContentVisible}
        className={`absolute inset-0 z-20 hidden transition-all duration-1000 ease-in-out pc:block ${
          isContentVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <h1 className="absolute left-[3.44vw] top-[16.4%] z-10 bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[clamp(38px,3.65vw,92px)] leading-none text-transparent">
          활동 사진
        </h1>

        {hasMultipleImages && (
          <div className="absolute right-[2vw] top-[17.9%] z-10 flex gap-5 bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[clamp(20px,1.98vw,48px)] text-transparent">
            <button
              type="button"
              onClick={() => goTo("prev")}
              className="cursor-pointer"
            >
              이전
            </button>
            <button
              type="button"
              onClick={() => goTo("next")}
              className="cursor-pointer"
            >
              다음
            </button>
          </div>
        )}

        <div className="absolute left-[3.44vw] right-[3.44vw] top-[24.08%]">
          <div className="activity-slider-viewport overflow-hidden rounded-[20px] pr-6 [transform:translateZ(0)]">
            {loopedImages.length > 0 ? (
              <div
                className={`flex overflow-visible ${
                  isTrackAnimated
                    ? "transition-transform duration-500 ease-in-out"
                    : ""
                }`}
                style={{
                  gap: "min(1.25vw, 24px)",
                  transform: `translate3d(calc(-${trackIndex} * (min(63.75vw, 1224px) + min(1.25vw, 24px))), 0, 0)`,
                }}
              >
                {loopedImages.map((image, index) => (
                  <div
                    key={`${image._key}-${index}`}
                    className="w-[min(63.75vw,1224px)] shrink-0"
                  >
                    <SliderImage
                      image={image}
                      priority={index === trackIndex}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="absolute inset-x-[3.44vw] bottom-[11%]">
          {currentImage ? (
            <p
              className={`bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[clamp(16px,1.55vw,36px)] text-transparent transition-opacity duration-300 ${
                isCaptionVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {currentImage.caption ?? ""}
            </p>
          ) : (
            <p className="text-white">등록된 활동 사진이 없습니다.</p>
          )}
        </div>
      </section>

      {isMobileGalleryVisible && (
        <MobileActivityGallery images={sliderImages} />
      )}
    </main>
  );
}

function SliderImage({
  image,
  priority,
}: {
  image: ActivityImage;
  priority?: boolean;
}) {
  return (
    <div
      className="activity-slide-card relative aspect-[1480/800] w-full overflow-hidden rounded-[20px]"
      style={{
        borderRadius: 20,
        overflow: "hidden",
        willChange: "transform",
        transform: "translateZ(0)",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        WebkitClipPath: "inset(0 round 20px)",
        clipPath: "inset(0 round 20px)",
        isolation: "isolate",
      }}
    >
      <Image
        src={urlFor(image).auto("format").quality(90).url()}
        alt={image.caption || "활동 사진"}
        fill
        priority={priority}
        sizes="(min-width: 1025px) min(63.75vw, 1224px), 100vw"
        className="rounded-[20px] object-cover"
        style={{
          borderRadius: 20,
          willChange: "transform",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

function MobileActivityGallery({images}: {images: ActivityImage[]}) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setHasEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      aria-label="모바일 활동 사진 목록"
      className={`relative z-20 h-[100svh] overflow-y-auto overscroll-y-contain scroll-smooth px-[17px] pt-[79px] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-opacity duration-700 ease-out pc:hidden ${
        hasEntered ? "opacity-100" : "opacity-0"
      }`}
      style={{scrollSnapType: "y mandatory"}}
    >
      <div className="flex flex-col pb-10">
        {images.length > 0 ? (
          images.map((image, index) => (
            <MobileActivityItem
              key={image._key}
              image={image}
              index={index}
            />
          ))
        ) : (
          <p className="pt-32 text-center text-white">
            등록된 활동 사진이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}

function MobileActivityItem({
  image,
  index,
}: {
  image: ActivityImage;
  index: number;
}) {
  const itemRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(index === 0);

  useEffect(() => {
    if (!itemRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting || entry.intersectionRatio > 0.35);
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={itemRef}
      className={`flex min-h-[calc(100svh-96px)] flex-col justify-center py-4 transition-all duration-700 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-40"
      }`}
      style={{scrollSnapAlign: "start", scrollSnapStop: "always"}}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] [transform:translateZ(0)] [isolation:isolate]">
        <Image
          src={urlFor(image).auto("format").quality(90).url()}
          alt={image.caption || `활동 사진 ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(max-width: 393px) calc(100vw - 34px), 393px"
          className="rounded-[10px] object-cover"
          style={{borderRadius: 10}}
        />
      </div>
      {image.caption && (
        <p
          className={`mt-3 bg-gradient-to-r from-[#d9e6ca] to-[#acd5f1] bg-clip-text text-[16px] text-transparent transition-opacity duration-700 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {image.caption}
        </p>
      )}
    </article>
  );
}

function SiteHeader({onActivityClick}: {onActivityClick: () => void}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-[64px] bg-black pc:absolute pc:h-0 pc:bg-transparent">
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
        className="absolute right-[17px] top-[22px] flex items-center gap-[14px] text-[16px] leading-none text-white pc:right-[1.8vw] pc:top-[calc(3.8vh+5px)] pc:gap-[clamp(14px,1.45vw,28px)] pc:text-[clamp(16px,2vw,48px)]"
      >
        <button type="button" onClick={onActivityClick}>
          활동
        </button>
        <Link href="/recruit">모집</Link>
        <Link href="/donate">후원</Link>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="absolute inset-x-0 bottom-[2.4vh] z-10 hidden items-end px-[2vw] [font-family:var(--font-noto-sans-kr)] pc:flex">
      <div className="flex w-[7.55vw] max-w-[145px] flex-col items-start">
        <Image
          src="/logos/logo_black.svg"
          alt=""
          width={200}
          height={134}
          className="h-auto w-[3.95vw] max-w-[76px]"
        />
        <span className="mt-1 text-[clamp(12px,1.05vw,24px)] font-medium text-white">
          성 이냐시오
        </span>
      </div>

      <address className="ml-[0.5vw] flex items-end gap-[3.3vw] not-italic text-white">
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

      <div className="ml-auto flex items-center gap-[clamp(14px,1.45vw,28px)]">
        <SocialIcon
          href="https://www.instagram.com/ignatius__school/"
          src="/icons/insta_black.svg"
          alt="인스타그램"
        />
        <SocialIcon
          href="https://blog.naver.com/ignatius__school"
          src="/icons/blog_dark.svg"
          alt="블로그"
        />
        <SocialIcon
          href="https://cafe.naver.com/ignatius8248"
          src="/icons/naver_dark.svg"
          alt="네이버 카페"
        />
      </div>
    </footer>
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
        className="h-auto w-[clamp(23px,2.2vw,42px)]"
      />
    </a>
  );
}
