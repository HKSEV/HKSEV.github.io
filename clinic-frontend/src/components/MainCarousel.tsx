"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import * as S from "@/assets/css/Style.style";

const MAIN_SLIDES = [
  {id: 1, imageUrl: "/images/main-banner1.jpg", title: "예쁘면 다야!"},
  {id: 2, imageUrl: "/images/main-banner2.jpg", title: "레이어핏 울쎄라"},
  {id: 3, imageUrl: "/images/main-banner3.jpg", title: "여름시즌 한정이벤트"}
];

export default function MainCarousel() {
  // loop: 무한반복
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
  
  // 좌우 화살표 핸들러
  const scrollPrev = useCallback(() => {
    if (emblaApi)
      emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi)
      emblaApi.scrollNext();
  }, [emblaApi]);

  // 3초마다 자동 슬라이드 넘어가는 기능(옵션)
  useEffect(() => {
    if (!emblaApi)
      return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <S.CarouselSection>
      <S.EmblaViewport ref={emblaRef}>
        <S.EmblaContainer>
          {MAIN_SLIDES.map((slide) => (
            <S.EmblaSlide key={slide.id}>
              <S.SlideImage src={slide.imageUrl} alt={slide.title}/>
            </S.EmblaSlide>
          ))}
        </S.EmblaContainer>
      </S.EmblaViewport>
      <S.NavButton $direction="left" onClick={scrollPrev}>
          &lt;
      </S.NavButton>
      <S.NavButton $direction="right" onClick={scrollNext}>
          &gt;
      </S.NavButton>
    </S.CarouselSection>
  );
};