"use client";

import React from "react";
import * as S from "../assets/css/Style.style"

export default function QuickConsultBar() {
  return (
    <S.BarWrapper>
      <S.BarInner>
        <S.ConsultTitle>빠른 상담 신청</S.ConsultTitle>
        <S.ConsultInput type="text" placeholder="이름을 작성해주세요"/>
        <S.ConsultInput type="tel" placeholder="연락처를 작성해주세요"/>
        <S.ConsultSelect defaultValue="">
          <option disabled hidden>상담분야를 선택해주세요</option>
          <option value="eye">눈 성형</option>
          <option value="nose">코 성형</option>
          <option value="antiaging">동안 성형</option>
          <option value="petit">쁘띠 시술</option>
        </S.ConsultSelect>
        <S.ConsultCheckboxGroup>
          <S.ConsultCheckboxLabel>
            <S.ConsultCheckbox type="checkbox"/>
            <S.ConsultAgreeText>개인정보처리방침 동의</S.ConsultAgreeText>
          </S.ConsultCheckboxLabel>
          <S.DetailLink>자세히</S.DetailLink>
        </S.ConsultCheckboxGroup>
        <S.ConsultSubmitBtn>빠른상담 신청하기</S.ConsultSubmitBtn>
      </S.BarInner>
    </S.BarWrapper>
  );
};