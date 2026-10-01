"use client";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/Style.style";

interface SelfieData {
  id: number;
  img: string;
  likes: number;
  views: number;
};

export default function Selfies() {
  // 🎯 가로 스크롤 영역을 조작하기 위한 훅
  const sliderRef = useRef<HTMLDivElement>(null);
  const [selfies, setSelfies] = useState<SelfieData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/selfie");
        if (response.data.success) {
          // 관리자가 '노출중(Y)'으로 설정한 데이터만 골라내기
          const activeSelfies = response.data.data.filter(
            (s: any) => s.IS_ACTIVE === 'Y'
          );
          
          // 프론트엔드에서 쓰기 편하게 데이터 모양 다듬기
          const formatted = activeSelfies.map((s: any) => ({
            id: s.SELFIE_IDX,
            img: `/images/${s.FILE_NAME}`, // 실제 이미지 경로
            likes: s.LIKES,
            views: s.VIEWS
          }));
          setSelfies(formatted);
        };
      } catch (err) {
        console.error("셀피 데이터 로드 실패: ", err);
      };
    };
    fetchData();
  }, []);

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
          {selfies.map((item) => (
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