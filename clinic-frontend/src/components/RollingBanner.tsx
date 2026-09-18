"use client";

import React from "react";
import * as S from "@/assets/css/Style.style";

export default function RollingBanner(){
  //반복할 문구 설정
  const text = "IF IT'S PRETTY, IT'S OO!";
  const repeatedTextArray = Array(10).fill(text);

  return (
    <S.BannerWrapper>
      <S.Track>
        <S.TextGroup>
          {repeatedTextArray.map((txt, index) => (
            <S.TextItem key={`orginal-${index}`}>
              {txt}
            </S.TextItem>
          ))}                    
        </S.TextGroup>
        {/*복제본 텍스트 그룹(원본이 다 지나가기 전에 뒤에서 자연스럽게 이어짐) */}
        <S.TextGroup aria-hidden="true">
          {repeatedTextArray.map((txt, index) => (
            <S.TextItem key={`orginal-${index}`}>
              {txt}
            </S.TextItem>
          ))}    
        </S.TextGroup>
      </S.Track>
    </S.BannerWrapper>
  );
};
