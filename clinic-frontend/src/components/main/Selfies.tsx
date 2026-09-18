"use client";

import React, { useRef } from "react";
import * as S from "@/assets/css/Style.style";

//슬라이더에 들어갈 임시 데이터 배열
const SELFIE_DATA = [
  {
    id: 1,
    img: "/images/main/selfie/selfie1.png",
    likes: "892",
    views: "7,921"
  },
  {
    id: 2,
    img: "/images/main/selfie/selfie2.png",
    likes: "892",
    views: "7,921"
  },
  {
    id: 3,
    img: "/images/main/selfie/selfie3.png",
    likes: "892",
    views: "7,921"
  },
  {
    id: 4,
    img: "/images/main/selfie/selfie4.png",
    likes: "892",
    views: "7,921"
  },
  {
    id: 5,
    img: "/images/main/selfie/selfie5.png",
    likes: "892",
    views: "7,921"
  },
  {
    id: 6,
    img: "/images/main/selfie/selfie6.png",
    likes: "892",
    views: "7,921"
  },
];

export default function Selfies() {
  // 🎯 가로 스크롤 영역을 조작하기 위한 훅
  const sliderRef = useRef<HTMLDivElement>(null);
  // 화살표 클릭 시 좌우로 300px씩 스크롤하는 함수
  const scroll = (direction: "left" | "right") => {
    if(sliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy(
        {left: scrollAmount, behavior: "smooth"}
      );
    };
  };

  return (
    <S.SliderSection>
      <S.SliderInner>
        <S.SliderHeader>
          <S.SliderTitleGroup>
            <S.SliderMainTitle>셀피</S.SliderMainTitle>
            <S.SliderSubTitle>SELFIES</S.SliderSubTitle>            
          </S.SliderTitleGroup>
          <S.SliderControls>
            <S.SliderViewMoreBtn>view more</S.SliderViewMoreBtn>
            <S.SliderArrowBtn
            onClick={() => scroll("left")}>
              &lt;
            </S.SliderArrowBtn>
            <S.SliderArrowBtn
            onClick={() => scroll("right")}>
              &gt;
            </S.SliderArrowBtn>
          </S.SliderControls>
        </S.SliderHeader>

        {/*🎯 사진 슬라이더 영역 */}
        <S.SelfieSliderWrapper ref={sliderRef}>
          {SELFIE_DATA.map((item) => (
            <S.SelfieCard key={item.id}>
              <img src={item.img} alt={`selfie${item.id}`}/>
              <S.SelfieCardOverlay>
                <S.SelfieLikeBadge>
                  <span>♥</span>{item.likes}
                </S.SelfieLikeBadge>
                <S.SelfieViewCount>
                  {item.views}명이 보고 있어요
                  <span>SELFIES</span>
                </S.SelfieViewCount>
              </S.SelfieCardOverlay>
            </S.SelfieCard>       
          ))}
        </S.SelfieSliderWrapper>
      </S.SliderInner>
    </S.SliderSection>    
  );
};