"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import * as S from "@/assets/css/Style.style";

interface SlideItem {
  id: number;
  fileName: string;
  title: string;
  link: string;
};

export default function MainCarousel() {
  // loop: 무한반복
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
  const [slides, setSlides] = useState<SlideItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/visual");
        if (response.data.success) {
          const dbData = response.data.data;
          if (dbData.SLIDES && dbData.SLIDES !== "[]")
            setSlides(JSON.parse(dbData.SLIDES));
          else
            setSlides([
              {
                id: 1,
                fileName: "default-banner.jpg",
                title: "기본 배너",
                link: "/"
              }
            ]);
        };
      } catch (err) {
        console.error("캐러셀 데이터 로드 실패: ", err);
      };
    };
    fetchData();
  }, []);
  
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
          {slides.map((slide) => (
            <S.EmblaSlide key={slide.id}>
              <S.SlideImage
              src={`/images/${slide.fileName}`}
              alt={slide.title}/>
              {slide.title && (
                <S.SlideCopy>
                  {slide.title}
                </S.SlideCopy>
              )}
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