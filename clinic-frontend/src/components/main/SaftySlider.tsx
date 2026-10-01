"use client";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/Style.style";

// 💡 안전마취 임시 데이터
interface SafetyData {
  id: number;
  title: string;
  desc: string;
  img: string;
}

export default function SaftySlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [safetyList, setSafetyList] = useState<SafetyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/safety");
        if (response.data.success) {
          const formatted = response.data.data.map((item: any) => ({
            id: item.SAFETY_IDX,
            title: item.TITLE,
            desc: item.DESCRIPTION,
            img: `/images/${item.FILE_NAME}` // 실제 파일 경로
          }));
          setSafetyList(formatted);
        };
      } catch (err) {
        console.error("안전마취 데이터 로드 실패: ", err);
      };
    };
    fetchData();
  }, []);

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
          {safetyList.map((item) => (
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
