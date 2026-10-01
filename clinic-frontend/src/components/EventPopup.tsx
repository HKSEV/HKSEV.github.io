"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

interface PopupData {
  id: number;
  imageUrl: string;
  link: string;
  useTodayClose: boolean;
  top: number;
  left: number;
};

const PopupCard = ({popup, handleClose}: {
  popup: PopupData, handleClose: (id: number, useTodayClose: boolean) => void
}) => {
  const {openPopup, closePopup} = usePopup();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !department) {
      openPopup("입력 오류", "이름, 연락처, 상담 분야를 모두 입력해주세요.");
      return;
    };
    if (phone.length < 9 || /(\d)\1{6}/.test(phone)) {
      openPopup("오류", "연락처를 올바르게 입력해주세요.");
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
    <S.PopupContainer $top={popup.top} $left={popup.left}>
      <S.PopupLink href={popup.link || "#"} $hasLink={!!popup.link}>
        <S.ImageWrapper>
          <S.PopupImage
          src={popup.imageUrl}
          alt={`이벤트 ${popup.id}`}/>
        </S.ImageWrapper>
      </S.PopupLink>
      <S.FormWrapper>
        <S.PopupInputGroup>
          <S.PopupInput
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}/>
          <S.PopupInput
          type="tel"
          placeholder="연락처"
          maxLength={11}
          value={phone}
          onChange={(e) => {
            const onlynumbers = e.target.value.replace(/[^0-9]/g, "");
            setPhone(onlynumbers);
          }}/>
          <S.PopupInput
          type="text"
          placeholder="상담부위"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}/>
          <S.PopupSubmitBtn onClick={handleSubmit}>
            상담신청
          </S.PopupSubmitBtn>
        </S.PopupInputGroup>
        <S.PrivacyLabel>
          <S.PrivacyCheckbox
          type="checkbox"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}/>
          <S.PrivacyText>
            개인정보 수집 · 이용에 관한 사항에 동의 [필수]
            <span>자세히보기</span>
          </S.PrivacyText>
        </S.PrivacyLabel>
      </S.FormWrapper>
      <S.PopupFooterWrapper>
        {popup.useTodayClose ? (
          <S.CloseLabel htmlFor={`today_close_${popup.id}`}>
            <S.CloseCheckbox
            type="checkbox"
            id={`today_close_${popup.id}`}/>
            오늘 하루 보지 않음
          </S.CloseLabel>
        ) : (
          <div/>
        )}
        <S.CloseBtn
        onClick={() => handleClose(popup.id, popup.useTodayClose)}>
          X
        </S.CloseBtn>
      </S.PopupFooterWrapper>
    </S.PopupContainer>
  );
};

export default function EventPopup() {
  const pathname = usePathname();
  const [popupList, setPopupList] = useState<PopupData[]>([]);
  // 현재 켜져 있는 팝업들의 ID를 배열로 관리(초기값은 모든 팝업 ID)
  const [visiblePopups, setVisiblePopups] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await axios.get("/api/admin/popup");
        if (response.data.success) {
          const { maxPopups, popups } = response.data;
          const now = new Date().getTime();

          let activePopups = popups.filter((p: any) => {
            const start = new Date(p.START_DATE).getTime();
            const end = new Date(p.END_DATE).getTime();
            return now >= start && now <= end;
          });

          activePopups = activePopups.slice(0, maxPopups);

          const filteredPopups = activePopups.filter((p: any) => {
            const hideUntil = localStorage.getItem(`hide_popup_${p.POPUP_IDX}`);
            if (hideUntil && now < parseInt(hideUntil)) return false;
            return true;
          });

          const formatted = filteredPopups.map((p: any, index: number) => ({
            id: p.POPUP_IDX,
            imageUrl: `http://localhost:4000/images/${p.FILE_NAME}`,
            link: p.LINK,
            useTodayClose: p.USE_TODAY_CLOSE === 'Y',
            top: 150 + (index * 30),
            left: 100 + (index * 420)
          }));

          setPopupList(formatted);
          setVisiblePopups(formatted.map((p: PopupData) => p.id));
        };
      } catch (err) {
        console.error("팝업 데이터 로드 에러: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopups();
  }, []);

  // 특정 팝업 닫기 핸들러
  const handleClose = (id: number) => {
    setVisiblePopups(prev => prev.filter(popupId => popupId !== id));
  };

  // 활성화된 팝업이 없으면 아무것도 렌더링하지 않음
  if (visiblePopups.length === 0 || isLoading)
    return null;

  return (
    <>
      {popupList.map((popup) => {
        //visiblePopup에 해당 ID가 있을 때만 렌더링
        if (!visiblePopups.includes(popup.id))
          return null;
        return (
          <PopupCard
          key={popup.id}
          popup={popup}
          handleClose={handleClose}/>
        );
      })}
    </>
  );
};
