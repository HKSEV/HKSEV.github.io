"use client";

import React, { useState } from "react";
import axios from "axios";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "../assets/css/Style.style"

export default function QuickConsultBar() {
  const {openPopup, closePopup} = usePopup();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !department) {
      openPopup("오류", "이름, 연락처, 상담 분야를 모두 입력해주세요.");
      return;
    };
    if (!isAgreed) {
      openPopup("오류", "개인정보처리방침에 동의해 주세요.");
      return;
    };

    try {
      const response = await axios.post("/api/consult/quick", {
        name, phone, department
      });
      if (response.data.success)
        openPopup("성공", "상담 신청이 성공적으로 완료되었습니다. 곧 연락 드리겠습니다.", () => {
          setName("");
          setPhone("");
          setDepartment("");
          setIsAgreed(false);
        });
    } catch (err) {
      console.error("상담 신청 실패: ", err);
      openPopup("오류", "상담 신청 중 문제가 발생했습니다. 다시 시도해주세요.");
    };
  };

  return (
    <S.BarWrapper>
      <S.BarInner>
        <S.ConsultTitle>빠른 상담 신청</S.ConsultTitle>
        <S.ConsultInput
        type="text"
        placeholder="이름을 작성해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}/>
        <S.ConsultInput
        type="tel"
        placeholder="연락처를 작성해주세요"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}/>
        <S.ConsultSelect
        value={department}
        onChange={(e) => setDepartment(e.target.value)}>
          <option value="" disabled hidden>상담분야를 선택해주세요</option>
          <option value="눈 성형">눈 성형</option>
          <option value="코 성형">코 성형</option>
          <option value="동안 성형">동안 성형</option>
          <option value="쁘띠 시술">쁘띠 시술</option>
        </S.ConsultSelect>
        <S.ConsultCheckboxGroup>
          <S.ConsultCheckboxLabel>
            <S.ConsultCheckbox
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}/>
            <S.ConsultAgreeText>개인정보처리방침 동의</S.ConsultAgreeText>
          </S.ConsultCheckboxLabel>
          <S.DetailLink>자세히</S.DetailLink>
        </S.ConsultCheckboxGroup>
        <S.ConsultSubmitBtn onClick={handleSubmit}>
          빠른상담 신청하기
        </S.ConsultSubmitBtn>
      </S.BarInner>
    </S.BarWrapper>
  );
};