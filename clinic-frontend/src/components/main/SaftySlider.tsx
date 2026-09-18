"use client";

import React, { useRef } from "react";
import * as S from "@/assets/css/Style.style";

// 💡 안전마취 임시 데이터
const SAFETY_DATA = [
  { 
    id: 1, 
    title: "EtCO2 모니터링", 
    desc: "마취통증의학과 전문의가 수술 전부터 수술 후 의식을 회복할 때까지 환자의 호흡과 맥박 등 상태 체크", 
    img: "/images/main/safety/s01.png" 
  },
  { 
    id: 2, 
    title: "악성 고열증 대비\n특수치료제 단트롤렌 보유", 
    desc: "단트롤렌 보유로 마취통증의학과 전문의의 신속한 치료가 가능하게 합니다.", 
    img: "/images/main/safety/s02.png" 
  },
  { 
    id: 3, 
    title: "심장충격기 및\n응급키트 구비", 
    desc: "응급의료에 관한 법률에 의거하여 심장충격기와 응급키트를 구비해 응급 상황 발생 시 신속히 대처 가능", 
    img: "/images/main/safety/s03.png" 
  },
  { 
    id: 4, 
    title: "무정전 전원장치\nUPS 시스템", 
    desc: "갑작스러운 정전에도 수술 장비가 멈추지 않도록 무정전 전원 공급 장치 완비", 
    img: "/images/main/safety/s04.png" 
  },
];

export default function SaftySlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      sliderRef.current.scrollBy({left: scrollAmount, behavior: "smooth"});
    }
  };

  return (
    <S.SafetySection>
      <S.SafetyInner>
        <S.SafetyHeader>
          <S.SafetyTitleGroup>
            <S.SafetyMainTitle>Ahn's 안전마취</S.SafetyMainTitle>
          </S.SafetyTitleGroup>
          <S.SafetyControls>
            <S.SafetyViewMoreBtn>view more +</S.SafetyViewMoreBtn>
            <S.SafetyArrowBtn onClick={() => scroll("left")}>
              &lt;
            </S.SafetyArrowBtn>
            <S.SafetyArrowBtn onClick={() => scroll("right")}>
              &gt;
            </S.SafetyArrowBtn>
          </S.SafetyControls>
        </S.SafetyHeader>

        <S.SafetySliderWrapper ref={sliderRef}>
          {SAFETY_DATA.map((item) => (
            <S.SafetyCard key={item.id}>
              <S.SafetyImage
              src={item.img}
              alt={item.title.replace("\n", "")}/>
              <S.SafetyTextOverlay>
                <S.SafetyCardTitle>
                  {item.title.split("\n").map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}<br/>
                    </React.Fragment>
                  ))}
                </S.SafetyCardTitle>
                <S.SafetyCardDesc>{item.desc}</S.SafetyCardDesc>
              </S.SafetyTextOverlay>
            </S.SafetyCard>
          ))}
        </S.SafetySliderWrapper>
      </S.SafetyInner>
    </S.SafetySection>
  );
};
