import React, { createContext, useState, useContext, ReactNode } from "react";
import Popup from "../modal/Popup";

// 1. 타입 정의
interface PopupConfig {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
};

interface PopupContextType {
  popupConfig: PopupConfig;
  openPopup: (title: string, message: string, onConfirm?: () => void) => void;
  closePopup: () => void;
};

// 2. Context 생성
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// 3. Provider 컴포넌트 생성
export function PopupProvider({children}: {children: ReactNode}) {
  // 커스텀 팝업 관리 상태
  const [popupConfig, setPopupConfig] = useState<PopupConfig>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: undefined as (() => void) | undefined,
  });

  // 팝업 열기 함수
  const openPopup = (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    setPopupConfig({isOpen: true, title, message, onConfirm});
  };

  // 팝업 닫기 함수
  const closePopup = () => {
    setPopupConfig((prev) => ({...prev, isOpen: false}));
  };

  return (
    <PopupContext.Provider value={{popupConfig, openPopup, closePopup}}>
      {children}
      {/* 커스텀 팝업 렌더링 */}
      <Popup
      isOpen={popupConfig.isOpen}
      isOn={popupConfig.message.endsWith("?") ? true : false}
      title={popupConfig.title}
      onClose={closePopup}
      onConfirm={popupConfig.onConfirm ? () => {
        popupConfig.onConfirm!();
        closePopup();
      } : undefined}>
        {popupConfig.message}
      </Popup>
    </PopupContext.Provider>
  );
};

// 4. Custom Hook 생성 (사용을 편하게 하기 위함)
export default function usePopup() {
  const context = useContext(PopupContext);
  if (!context)
    throw new Error("usePopup must be used within a PopupProvider");
  return context;
};
