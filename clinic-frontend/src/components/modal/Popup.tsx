"use client";

import React from "react";
import * as S from "@/assets/css/Style.style";

// 공용 인터페이스
interface PopupProps {
  isOpen: boolean;
  isOn: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode; 
};

export default function Popup(
  {isOpen, isOn, title, onClose, onConfirm, children}: PopupProps
) {
  return (
    <S.PopupOveray onClick={onClose} $isOpen={isOpen}>
      <S.PopupBox
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      $top="0"
      $left="0">
        <S.PopupHeader>
          <S.PopupTitle>{title}</S.PopupTitle>
          <S.PopupCloseIcon onClick={onClose}>
            &times;
          </S.PopupCloseIcon>
        </S.PopupHeader>

        <S.PopupBody>
          {children}
        </S.PopupBody>

        <S.PopupFooter>
          {isOn && (
            <S.PopupCancelButton onClick={onClose}>
              취소
            </S.PopupCancelButton>
          )}
          <S.PopupConfirmButton onClick={onConfirm ? onConfirm : onClose}>
            확인
          </S.PopupConfirmButton>
        </S.PopupFooter>
      </S.PopupBox>
    </S.PopupOveray>
  );
};
