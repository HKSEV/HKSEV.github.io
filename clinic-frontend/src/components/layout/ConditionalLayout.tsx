"use client";

import { usePathname } from "next/navigation";
import styled from 'styled-components';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickConsultBar from "@/components/QuickConsultBar";
import EventPopup from "@/components/EventPopup";
import { GlobalStyle } from "@/assets/css/Style.style";
import { PopupProvider } from "../contexts/PopupContext";

//헤더에 크기때문에 픽스했을때 잘리는 크기만큼..패딩 or 마진
const MainWrapper = styled.main`
  padding-top: 91px;
  min-height: 100vh;
  
  @media (max-width: 1024px) {
    padding-top: 61px;
  }
`;

export default function ConditionalLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const paths = ["/register", "/login", "/find", "/admin"];
  const isOff = paths.some((path) => pathname.startsWith(path));

  return (
    <PopupProvider>
      <GlobalStyle/>
      {!isOff ? (
        <>
          <Header/>
          <MainWrapper>
            {children}
          </MainWrapper>
          <Footer/>
          <QuickConsultBar/>
          <EventPopup/>
        </>
      ) : (
        <>{children}</>
      )}
    </PopupProvider>
  );
};
