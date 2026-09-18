"use client";

import React, { useRef } from "react";
import * as S from "@/assets/css/Style.style";

// 브이로그 임시 데이터
const VLOG_DATA = [
  { id: 1, desc: "답답했던 눈매·복코·얼굴살 완벽 개선", img: "/images/main/vlog/vlog1.jpg" },
  { id: 2, desc: "광대·사각턱·이중턱 싹 지우고 여신 등극", img: "/images/main/vlog/vlog2.jpg" },
  { id: 3, desc: "\"성형 어디서 했냐고 DM 폭발\" 그 비결은?", img: "/images/main/vlog/vlog3.jpg" },
  { id: 4, desc: "광대 싹 밀고 눈·가슴까지 다 갈아엎은 썰", img: "/images/main/vlog/vlog4.jpg" },
  { id: 5, desc: "턱밑 지방이랑 광대 싹 지우고 V라인 완성", img: "/images/main/vlog/vlog5.jpg" },
];

export default function VlogSlider() {
  // 슬라이더(가로 스크롤 영역)의 실제 HTML DOM 요소에 직접 접근하기
  const sliderRef = useRef<HTMLDivElement>(null);
  // 화살표 버튼을 누를 때 실행될 스크롤 조작함수
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      sliderRef.current.scrollBy({left: scrollAmount, behavior: "smooth"});
    }
  };

  return (
    <S.VlogSection>
      <S.VlogInner>
        {/* 헤더 영역(타이틀 및 컨트롤 버튼) */}
        <S.VlogHeader>
          <S.VlogTitleGroup>
            <S.VlogMainTitle>Ahn's VLOG.</S.VlogMainTitle>
          </S.VlogTitleGroup>
          <S.VlogControls>
            <S.VlogViewmoreBtn>view more +</S.VlogViewmoreBtn>
            <S.VlogArrowBtn onClick={() => scroll("left")}>
              &lt;
            </S.VlogArrowBtn>
            <S.VlogArrowBtn onClick={() => scroll("right")}>
              &gt;
            </S.VlogArrowBtn>
          </S.VlogControls>
        </S.VlogHeader>

        {/* 슬라이더 영역 */}
        <S.VlogSliderWrapper ref={sliderRef}>
          {VLOG_DATA.map((item) => (
            <S.VlogCard key={item.id}>
              <S.VlogImageWrapper>
                <img src={item.img} alt={`브이로그 ${item.id}`}/>
              </S.VlogImageWrapper>
              <S.VlogInfo>
                <S.VlogDesc>{item.desc}</S.VlogDesc>
              </S.VlogInfo>
            </S.VlogCard>
          ))}
        </S.VlogSliderWrapper>
      </S.VlogInner>
    </S.VlogSection>
  );
};
