import styled from "styled-components";
import Link from "next/link";

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
  color: ${(props) => (props.$active ? "#0056B3" : "#111")};
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
  color: #111;
  text-decoration: none;
  background-color: #FFF;
  
  span {
    color: #0056B3;
    margin-left: 6px;
  }
`;
export const CtaButton = styled.button`
  height: 40px;
  background-color: #111;
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
    border: 1px solid #111;
    border-radius: 16px;
    padding: 0 12px;
    font-size: 13px;
    font-weight: bold;
    color: #111;
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
    background-color: #111;
    border-radius: 1px;
  }
`;