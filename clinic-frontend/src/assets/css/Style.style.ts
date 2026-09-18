import styled, { createGlobalStyle, keyframes } from "styled-components";
import Link from "next/link";

export const MAIN_COLOR = "#FFE6F0";
export const POINT_COLOR = "#FF1493";
export const TEXT_COLOR = "#111";

// GlobalStyle
export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  // 모든 요소에 테두리까지 포함해서 크기 계산 (가장 중요!)
  *, *::before, *::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

// Header
// 헤더 그룹
export const  HeaderWrapper = styled.header`
  width: 100%;
  background-color: #FFF;
  border-bottom: 1px solid #F0F0F0;
  position: fixed;
  z-index: 9999;
`;
export const HeaderInner = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;

  @media (max-width: 1024px) {
    height: 60px;
    padding: 0 20px;
  }
`;
// 로고 그룹
export const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
export const Logo = styled.h1`
  font-family: "Times New Roman", serif;
  font-size: 34px;
  color: #3E2723;
  margin: 0;
  cursor: pointer;
`;
// 중앙 내비게이션 그룹
export const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex: 2;

  @media (max-width: 1024px) {
    display: none;
  }
`;
export const NavItem = styled.span<{$active?: boolean}>`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#0056B3" : TEXT_COLOR)};
  border-bottom: ${(props) => (
    props.$active? "2px solid #0056B3" : "2px solid transparent"
  )};
  padding-bottom: 5px;
  transition: all 0.2s ease-in-out;
  &:hover { color: #0056B3; }
`;
export const UtilGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex: 1;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`;
export const PhoneButton = styled(Link)`
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid #D1D5DB;
  border-radius: 20px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: bold;
  color: ${TEXT_COLOR};
  text-decoration: none;
  background-color: #FFF;
  
  span {
    color: #0056B3;
    margin-left: 6px;
  }
`;
export const CtaButton = styled.button`
  height: 40px;
  background-color: ${TEXT_COLOR};
  color: #FFF;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #D1D5DB;
  background-color: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: background-color .2s;
  &:hover { background-color: #F9FAFB; }

  svg {
    width: 20px;
    height: 20px;
  }
`;
// add
export const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1024px) {
    display: none;
  }
`;
// 모바일 전용 둥근 라인버튼
export const MobilePillButton = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: inline-block;
    height: 32px;
    border: 1px solid ${TEXT_COLOR};
    border-radius: 16px;
    padding: 0 12px;
    font-size: 13px;
    font-weight: bold;
    color: ${TEXT_COLOR};
    background-color: #FFF;
    cursor: pointer;
  }
`;
// 아디다스 버튼
export const HamburgerButton = styled.button`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin-left: 8px;
  }

  span {
    display: block;
    width: 22px;
    height: 2px;
    background-color: ${TEXT_COLOR};
    border-radius: 1px;
  }
`;

// Footer
export const FooterWrapper = styled.footer`
  background-color: #000;
  padding: 20px 15px 120px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #EEE;

  @media (max-width: 1024px) {
    padding-bottom: 20px;
  }
`;
export const FooterInner = styled.div`
  max-width: 1860px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;
export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 40px;
  border-bottom: 1px solid #333;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 30px;
  }
`;
export const FooterCs = styled.div`
  flex: 1;
`;
export const FooterPhone = styled.div`
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;
export const FooterCsTitle = styled.div`
  font-size: 14px;
  color: #FFF;
  font-weight: bold;
`;
export const FooterScheduleWrap = styled.div`
  flex: 2;
  display: flex;
  gap: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const FooterScheduleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const FooterScheduleTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #FFF;
  margin-bottom: 4px;
`;
export const FooterScheduleText = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #999;
  letter-spacing: -0.5px;
`;
export const FooterLocationBtn = styled.button`
  flex: 0.5;
  height: 48px;
  padding: 5px 30px;
  border: 1px solid #999;
  background-color: transparent;
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: #333;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }
`;
export const FooterCompany = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const FooterCompanyName = styled.h2`
  font-size: 24px;
  font-weight: 900;
  margin: 0 0 15px 0;
  color: #FFF;
`;
export const FooterInfoText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  letter-spacing: -0.3px;

  span {
    margin: 0 8px;
    color: #555;
  }
`;
export const FooterBottomRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;

  @media (max-width: 1024px) {
    align-items: flex-start;
    width: 100%;
  }
`;
export const FooterPolicyWrap = styled.div`
  display: flex;
  gap: 10px;
`;
export const FooterPolicyBtn = styled.button`
  background-color: rgba(255, 255, 255, 0.5);
  color: #FFF;
  border: 1px solid #FFF;
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;

  &:hover {
    background-color: #333;
    color: #999;
  }
`;
export const FooterFamilyTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #FFF;
  margin-bottom: 60px;
`;
export const FooterFamilyLogos = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: nowrap;

  .logo-placeholder {
    font-size: 11px;
    color: #999;
    border: 1px solid #999;
    padding: 4px 8px;
    border-radius: 15px;
  }
`;
// floating
export const FloatingMenu = styled.div`
  position: fixed;
  right: 30px;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 999999;

  @media (max-width: 768px) {
    right: 15px;
    bottom: 20px;
    transform: scale(0.85);
  }
`;
export const FabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
export const FabIcon = styled.div<{$bgColor: string}>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => (props.$bgColor)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 900;
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  &:hover { transform: translateY(-5px); }

  svg {
    width: 30px;
    height: 30px;
    color: #FFF;
  }
`;
export const FabText = styled.span`
  background-color: ${TEXT_COLOR};
  color: #FFF;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 10px;
  letter-spacing: -0.5px;
`;

// MainCarousel
export const CarouselSection = styled.section`
  position: relative;
  width: 100%;
  max-width: 2440px;
  margin: 0 auto;
  overflow: hidden;
`;
export const EmblaViewport = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const EmblaContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  width: 100%;
  position: relative;
`;
export const SlideImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    height: 400px;
  }
`;
export const FormOverlay = styled.div`
  
`;
export const FormTitle = styled.h3`
  
`;
export const InputGroup = styled.div`
  
`;
export const SubmitBtn = styled.button`
  
`;
export const PrivacyWrapper = styled.div`
  
`;
export const NavButton = styled.button<{$direction: "left" | "right"}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$direction === "left" ? "left: 20px" : "right: 20px")};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  color: #FFF;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, .7);
    color: #000;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
    ${(props) => (props.$direction === "left" ? "left: 10px" : "right: 10px")};
  }
`;

// QuickConsultBar
export const BarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(17, 17, 17, 0.95);
  border-top: 1px solid #333;
  backdrop-filter: blur(5px);
  z-index: 99999;

  @media (max-width: 1024px) {
    display: none;
  }
`;
export const BarInner = styled.div`
  max-width: 1860px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 20px;
`;
export const ConsultTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #FFF;
  margin-right: 10px;
`;
export const ConsultInput = styled.input`
  width: 180px;
  height: 44px;
  background-color: #333;
  border: 1px solid #444;
  color: #FFF;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  &::placeholder { color: #888; }
  &:focus { border-color: #6A6446; }
`;
export const ConsultSelect = styled.select`
  width: 200px;
  height: 44px;
  background-color: #333;
  border: 1px solid #444;
  color: #888;
  padding: 0 15px;
  font-size: 14px;
  outline: none;
  appearance: none; /* 브라우저 기본 화살표 숨김 */
  /* 커스텀 화살표 아이콘 삽입 */
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23888888" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;
  &:focus { border-color: #6A6446; }
`;
export const ConsultCheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;
export const ConsultCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;
export const ConsultCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #333;
  border: 1px solid #555;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: #6A6446;
    border-color: #6A6446;
  }

  /* 체크마크 생성 */
  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${TEXT_COLOR};
    font-size: 10px;
  }
`;
export const ConsultAgreeText = styled.span`
  color: #AAA;
  font-size: 13px;
`;
export const DetailLink = styled.span`
  color: #888;
  font-size: 12px;
  text-decoration: underline;
  margin-left: 6px;
  cursor: pointer;
  &:hover { color: #FFF; }
`;
export const ConsultSubmitBtn = styled.button`
  height: 44px;
  background-color: #6A6446;
  color: #1D1D1D;
  border: none;
  padding: 0 24px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: #85805E; }
`;

// EventPopup
export const PopupContainer = styled.div<{$top: number; $left: number}>`
  position: fixed;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
  width: 380px;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 10000;
  display: flex;
  flex-direction: column;
`;
export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
export const FormWrapper = styled.div`
  background-color: #000;
  padding: 15px 15px 20px 15px;
`;

export const PopupInputGroup = styled.div`
  display: flex;
  margin-bottom: 12px;
  width: 100%;
`;
export const PopupInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 36px;
  padding: 0 8px;
  margin: 0 2px;
  font-size: 13px;
  border: 1px solid #CCC;
  outline: none;
  background-color: #FFF;
  &::placeholder { color: #999; }
  &:focus { border-color: #000; }
`;
export const PopupSubmitBtn = styled.button`
  flex-shrink: 0;
  width: 80px;
  height: 38px;
  margin-left: 5px;
  background-color: #FFF176;
  color: #000;
  font-weight: bold;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover { background-color: #FCE83A; }
`;
export const PrivacyLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;
export const PrivacyCheckbox = styled.input`
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: #FFF;
  border: 1px solid #DDD;
  cursor: pointer;
  position: relative;
  
  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 10px;
  }
`;
export const PrivacyText = styled.span`
  color: #FFF;
  font-size: 11px;
  letter-spacing: -0.5px;

  span {
    color: #AAA;
    text-decoration: underline;
    margin-left: 4px;
    cursor: pointer;
  }
`;
export const PopupFooterWrapper = styled.div`
  background-color: #FFF;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const CloseLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #000;
`;
export const CloseCheckbox = styled.input`
  appearance: none;
  width: 14px;
  height: 14px;
  border: 1px solid #CCC;
  background-color: #FFF;
  cursor: pointer;
  position: relative;

  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 10px;
  }
`;
export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

// CircularOverlay
// 원형 텍스트 회전 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const EventSection = styled.section`
  background-color: #000;
  padding: 80px 21px;
  overflow: hidden;
`;
export const EventInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
`;
export const EventTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
export const EventMainTitle = styled.h2`
  font-size: 32px;
  font-weight: 900;
  color: #FFF;
  margin: 0;
`;
export const EventSubTitle = styled.p`
  font-size: 18px;
  color: #888;
  margin: 5px 0 0 0;
`;
export const EventControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const EventViewMoreBtn = styled.button`
  border: 1px solid #FFF;
  background: transparent;
  color: #FFF;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #FFF;
    color: #000;
  }
`;
export const EventArrowBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #222;
  border: none;
  font-size: 16px;
  color: #FFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #444;
  }
`;
export const EventSliderWrapper = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 30px 10px 20px 20px;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const HoverSvg = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%;
  height: 85%;
  margin-top: -42.5%;
  margin-left: -42.5%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  transform-origin: center center;
`;
// 🎯 평상시엔 직사각형이다가, 마우스를 올리면 위가 둥글게 변하는 애니메이션 추가
export const EventImageWrapper = styled.div`
  width: 100%;
  height: 340px;
  position: relative;
  overflow: hidden;
  
  /* 🎯 핵심 1: 평상시엔 모서리가 뾰족한 직사각형 */
  border-radius: 0px; 
  /* 🎯 핵심 2: 모양이 부드럽게 변하도록 트랜지션 추가 */
  transition: border-radius 0.3s ease-in-out;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;
export const EventCard = styled.div`
  min-width: 280px;
  width: 280px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  /* 🎯 핵심 3: 마우스 오버 시 이미지 윗부분 양쪽 모서리를 둥글게 깎음 (가로 280px의 절반인 140px로 완벽한 반원 생성) */
  &:hover ${EventImageWrapper} {
    border-top-left-radius: 140px;
    border-top-right-radius: 140px;
  }

  &:hover ${HoverSvg} {
    opacity: 1;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;
export const RankBadge = styled.div<{$bgColor: string; $radius?: string}>`
  position: absolute;
  top: -15px;
  left: -15px;
  width: 54px;
  height: 54px;
  background-color: ${(props) => (props.$bgColor)};
  z-index: 10;
  color: #000;
  font-size: 26px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.$radius || "50%")};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;
export const EventInfo = styled.div<{$bgColor: string}>`
  background-color: ${(props) => (props.$bgColor)};
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items:center;
`;
export const SurgeryLabel = styled.div`
  background: #000;
  color: #FFF;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 700;
`;
export const EventPrice = styled.div`
  color: #000;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -1px;

  span {
    font-size: 16px;
    font-weight: 700;
    margin-left: 2px;
    color: #666;
  }
`;

// 회원가입 step 1
export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;
export const StepContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;
export const Step = styled.div<{$active?: boolean}>`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const StepNumber = styled.div<{$active?: boolean}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#000" : "#F0F0F0")};
  color: ${(props) => (props.$active ? "#FFF" : "#999")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
`;
export const StepText = styled.span<{$active?: boolean}>`
  font-size: 16px;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  color: ${(props) => (props.$active ? "#000" : "#999")};
  text-decoration: ${(props) => (props.$active ? "underline" : "none")};
  text-underline-offset: 4px;
`;
export const StepDivider = styled.div`
  width: 40px;
  height: 1px;
  border-bottom: 1px dashed #CCC;
  margin: 0 15px;
`;
export const CheckAllWrapper = styled.div`
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  padding: 20px 0;
  margin-bottom: 30px;
`;
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
// 커스텀 사각 체크박스 디자인
export const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #D1D5DB;
  border-radius: 2px;
  background-color: #FFF;
  cursor: pointer;
  position: relative;
  &:checked { border-color: #000; }
  /* 체크 시 나타나는 v마크 */
  &:checked::after {
    content: "✔";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 14px;
  }
`;
export const CheckAllText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;
export const TermSection = styled.div`
  margin-bottom: 30px;
`;
export const TermHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
export const TermTitle = styled.span`
  font-size: 15px;
  color: #444;
`;
export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const TermContentBox = styled.div<{$isOpen?: boolean}>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  width: 100%;
  height: 140px;
  overflow-y: auto;
  border: 1px solid #E5E5E5;
  padding: 20px;
  font-size: 14px;
  color: #666;
  background-color: #FFF;
  line-height: 1.6;
  white-space: pre-wrap;
  /*
  페이지에서 글자의 띄어쓰기, 들여쓰기, 줄바꿈을 코드에 적은
  그대로 유지하면서 글쓴 내용이 화면 상자 크기를 넘어가면
  자동으로 다음 줄로 넘겨주는 CSS 속성
  */
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 60px;
`;
export const Button = styled.button<{$variant: "outline" | "solid"}>`
  width: 180px;
  height: 54px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all .2s;
  background-color: ${(props) => (
    props.$variant === "outline" ? "#FFF" : "#000"
  )};
  border: 1px solid;
  color: ${(props) => (
    props.$variant === "outline" ? "#000" : "#FFF"
  )};

  &:hover {
    background-color: ${(props) => (
      props.$variant === "outline" ? "#F9F9F9" : "#333"
    )};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

//회원가입 폼(step 2)
export const PageTitle= styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 40px;
`;
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Label = styled.label`
  font-size: 15px;
  font-weight: bold;
  color: ${TEXT_COLOR};
`;
export const FormInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid #E5E5E5;
  font-size: 15px;
  outline: none;
  &::placeholder { color: #AAA; }
  &:focus { border-color: ${TEXT_COLOR}; }
`;
export const EmailWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
export const FormSelect = styled.select`
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid #E5E5E5;
  font-size: 15px;
  color: #555;
  outline: none;
  background-color: #FFF;
`;
export const SubCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  margin-top: 5px;
`;
export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height:50px;
`;
export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;
export const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  &:checked { border-color: ${TEXT_COLOR}; }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${TEXT_COLOR};
  }
`;

export const Container = styled.div`

`;
export const Title = styled.h2`

`;
export const Section = styled.div<{$marginBottom: string}>`

`;
export const SectionTitle = styled.h3`

`;
export const TermsBox = styled.div<{$bg: string}>`

`;
export const Checkbox = styled.input<{$isLarge?: boolean}>`

`;
export const TotalAgreeText = styled.span`

`;
export const AgreeText = styled.span`

`;
//다음 팝업
export const Dflex = styled.div`
  display: flex;
  gap: 10px; 
  margin-bottom: 10px;
`;
export const ModalBG = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  z-index: 9999999;
  background-color: #FFF;
`;
export const RightBtn = styled.div`
  display: flex; 
  justify-content: flex-end;
  padding: 5px;

  button {
    background-color: transparent;
    border: none;
  }
`;

// RollingBanner
//무한 롤링 애니메이션 (0%에서 시작해서 -100%까지 이동)
const rolling = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;
export const BannerWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background: linear-gradient(90deg, #FFE5F1 0%, #EBD4FF 100%);
  padding: 14px 0;
  display: flex;
`;
export const Track = styled.div`
  display: flex;
  white-space: nowrap;
`;
//똑같은 텍스트 그룹2개를 교대로 보여주기 위해 애니메이션 적용
export const TextGroup = styled.div`
  display: flex;
  animation: ${rolling} 23s linear infinite;
`;
export const TextItem = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #FFF;
  text-shadow: 2px 2px 10px gray;
  letter-spacing: 1px;
  margin-right: 30px;
`;

// Selfies
// 슬라이더
export const SliderSection = styled.section`
  background-color: ${MAIN_COLOR};
  padiing: 60px 20px;
  overflow: hidden;
`;
export const SliderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
`;
export const SliderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SliderMainTitle = styled.h2`
  font-size: 32px;
  font-weight: 900;
  color: ${TEXT_COLOR};
  margin: 0;
`;
export const SliderSubTitle = styled.p`
  font-size: 18px;
  color: #888;
  margin: 5px 0 0 0;
`;
export const SliderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const SliderViewMoreBtn = styled.button`
  border:1px solid ${TEXT_COLOR};
  background:transparent;
  border-radius:20px;
  padding:8px 16px;
  font-size:14px;
  font-weight:600;
  cursor:pointer;

  &:hover {
    background-color: ${TEXT_COLOR};
    color: #FFF;
  }
`;
export const SliderArrowBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${TEXT_COLOR};
  color: #FFF;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #333;
  }
`;
export const SelfieSliderWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const SelfieCard = styled.div`
  min-width: 240px;
  height: 340px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const SelfieCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.6) 100%;
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;
export const SelfieLikeBadge = styled.div`
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;

  span {
    color: ${POINT_COLOR};
    font-size: 18px;
  }
`;
export const SelfieViewCount = styled.div`
  color: #FFF;
  font-size: 15px;
  font-weight: 700;
  span {
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: #CCC;
    margin-top: 4px;
  }
`;

// CategoryNav
export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding-bottom: 15px;
  margin-top: 40px;
  border-bottom: 2px solid #FFD1DF;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto;
    padding-left: 20px;
    padding-right: 20px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
export const CategoryItem = styled.div<{$active:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  min-width: 70px;

  //선택된 상태일때 하단에서 올라오는 핑크색 삼각형 생성
  ${({$active}) => $active && `
    &::after {
      content: "";
      position: absolute;
      bottom: -17px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 0 10px 10px 10px;
      border-style: solid;
      border-color: transparent transparent #FFD1DF transparent;
    }
  `}
`;
export const ImageBox = styled.div<{$active:boolean}>`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  border: ${({$active}) => (
    $active ? "4px solid #FFD1DF" : "4px solid transparent"
  )};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  img {
    width: 100%; 
    height: 100%; 
    object-fit: cover;
  }
`;
export const ActiveOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 209, 223, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
export const CategoryText = styled.span<{$active:boolean}>`
  font-size: 15px;
  color: ${({$active}) => ($active ? TEXT_COLOR : "#666")};
  font-weight: ${({$active}) => ($active ? "700" : "400")};
  transition: all 0.2s ease-in-out;
`;

// vlogslider
export const VlogSection = styled.section`
  padding: 3.75rem 1.25rem;
  background-color: ${MAIN_COLOR};
`;
export const VlogInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const VlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.15rem;
  border-bottom: 2px solid ${TEXT_COLOR};
  padding-bottom: 1rem;
`;
export const VlogTitleGroup = styled.div`
  display: flex;
  align-items: center;
`;
export const VlogMainTitle = styled.h2`
  font-size: 2.29rem;
  font-weight: 900;
  color: ${TEXT_COLOR};
  margin: 0;
`;
export const VlogControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const VlogViewmoreBtn = styled.button`
  border: 1px solid ${TEXT_COLOR};
  background-color: transparent;
  border-radius: 1.42rem;
  padding: 0.42rem 1.14rem;
  font-size: 0.93rem;
  font-weight: 600;
  cursor: pointer;
  color: ${TEXT_COLOR};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${TEXT_COLOR};
    color: #FFF;
  }
`;
export const VlogArrowBtn = styled.button`
  width: 2.29rem;
  height: 2.29rem;
  border-radius: 50%;
  background-color: ${TEXT_COLOR};
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #FFF;
  &:hover { background-color: #333; }
`;
export const VlogSliderWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 1.43rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`; // 크로스브라우징
export const VlogCard = styled.div`
  min-width: 17.14rem;
  width: 17.14rem;
  background-color: #FFF;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  &:hover img { transform: scale(1.05); }
`;
export const VlogImageWrapper = styled.div`
  width: 100%;
  height: 10rem;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;
export const VlogInfo = styled.div`
  padding: 1.1rem;
`;
export const VlogDesc = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// safety
export const SafetySection = styled.section`
  background-color: #000;
  padding: 5.71rem 1.42rem;
`;
export const SafetyInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const SafetyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.86rem;
`;
export const SafetyTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SafetyMainTitle = styled.h2`
  font-size: 2.29rem;
  font-weight: 900;
  color: #FFF;
  margin: 0;
  display: inline-block;
  border-bottom: 2px solid #FFF;
  padding-bottom: 0.714rem;
`;
export const SafetyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.714rem;
`;
export const SafetyViewMoreBtn = styled.button`
  border: 1px solid #FFF;
  background-color: transparent;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #FFF;

  &:hover {
    background-color: #FFF;
    color: ${TEXT_COLOR};
  }
`;
export const SafetyArrowBtn = styled.button`
  width: 36px;
  height: 36px;
  background-color: #222;
  color: #FFF;
  border-radius: 50%;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover { background-color: #444; }
`;
export const SafetySliderWrapper = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const SafetyCard = styled.div`
  min-width: 300px;
  width: 300px;  
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;

  &:hover img {
    transform: scale(1.05);
  }
`;
export const SafetyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
`;
export const SafetyTextOverlay = styled.div`
  background-color: linear-gradient(
    to top, 
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.4) 60%, 
    rgba(0, 0, 0, 0) 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 40px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const SafetyCardTitle = styled.h3`
  color: #FFF;
  font-size: 1.3rem;
  line-height: 1.3;
  margin: 0 0 8px 0;
  word-break: keep-all;
`;
export const SafetyCardDesc = styled.p`
  color: #DDD;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  word-break: keep-all;
`;

export * from "./Login.style";
export * from "./Popup.style";
export * from "./Admin.style";