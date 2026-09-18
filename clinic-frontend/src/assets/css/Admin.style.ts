import styled, { keyframes } from "styled-components";
import Link from "next/link";
import * as C from "./Common.style";

export const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;
export const AdminSideBar = styled.ul<{$isCollapsed: boolean}>`
  width: ${({$isCollapsed}) => ($isCollapsed ? "5.5rem" : "14rem")};
  ${C.FlexColumn}
  ${C.BoxShadow}
  ${C.TransitionAll}
  min-height: 100vh;
  ${C.LinearGradient}
  margin: 0;
  padding: 0;
  list-style: none;
  color: #FFF;
  z-index: 100;
`;
export const AdminSideBarBrand = styled.div<{$isCollapsed: boolean}>`
  height: 4.375rem;
  ${C.FlexCenter}
  font-size: ${({$isCollapsed}) => ($isCollapsed ? "1rem" : "1.2rem")};
  font-weight: 800;
  letter-spacing: 0.05rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
`;
export const AdminNavItem = styled.li<{$isCollapsed: boolean}>`
  padding: 1rem 1.5rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  ${C.TransitionAll}
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: ${({$isCollapsed}) => ($isCollapsed ? "center" : "flex-start")};
  align-items: center;
  gap: 0.8rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #FFF;
  }
`;
export const AdminSideBarTogglerWrapper = styled.div`
  ${C.FlexCenter}
  padding: 1rem;
  margin-top: auto;
`;
export const AdminSideBarToggler = styled.button`
  ${C.CircleBtn}
  background-color: rgba(255, 255, 255, 0.2);
  ${C.FlexCenter}
  ${C.TransitionAll}
  &:hover { background-color: rgba(255, 255, 255, 0.3); }
`;
export const AdminContentWrapper = styled.div`
  ${C.FlexColumn}
  flex: 1;
  background-color: #F8F9FC;
  overflow-x: hidden;
`;
export const AdminTopBar = styled.nav`
  height: 4.375rem;
  background-color: #FFF;
  ${C.FlexBetween}
  padding: 0 1.5rem;
  z-index: 10;
`;
export const AdminMain = styled.main`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;
export const AdminTopBarBrand = styled.div`
  font-size: 1.25rem;
  color: #4E73DF;
  font-weight: 800;
  letter-spacing: 0.05rem;
`;
export const AdminTopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
export const AdminTopBarUser = styled.span`
  font-size: 0.9rem;
  color: #858796;
  font-weight: 600;
`;
export const AdminLogoutBtn = styled.button`
  ${C.Transparent}
  color: #858796;
  border: 1px solid #D1D3E2;
  ${C.FlexCenter}
  gap: 0.4rem;
  ${C.TransitionAll}
  cursor: pointer;

  &:hover {
    background-color: #EAECF4;
    color: #3A3B45;
    border-color: #B7B9CC;
  }
`;

export const DashboardContainer = styled.div`
  width: 100%;
`;
export const DashboardPageTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;
export const DashboardCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const DashboardSummaryCard = styled.div<{$borderColor: string}>`
  ${C.FlexTopBetween}
  background-color: #FFF;
  border-radius: 0.35rem;
  border-left: 0.25rem solid ${({$borderColor}) => $borderColor};
  ${C.BoxShadow}
  padding: 1.25rem;
`;
export const DashboardCardInfo = styled.div`
${C.FlexColumn}
  gap: 0.2rem;
  flex: 1;
`;
export const DashboardCardLabel = styled.span<{$textColor: string}>`
  font-size: 0.75rem;
  font-weight: 800;
  color: ${({$textColor}) => $textColor};
  text-transform: uppercase;
  margin-bottom: 0.2rem;
`;
export const DashboardCardMainValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #5A5C69;
  margin-bottom: 0.8rem;
`;
export const DashboardCardSubGrid = styled.div`
  ${C.FlexWrap}
  gap: 0.8rem;
  font-size: 0.8rem;
  color: #858796;
  border-top: 1px solid #EAECF4;
  padding-top: 0.8rem;
  width: 100%;
`;
export const DashboardCardSubItem = styled.div`
  display: flex;
  gap: 0.3rem;
  strong { color: #5A5C69; }
`;
export const DashboardCardIconWrapper = styled.div`
  opacity: 0.6;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;
export const DashboardBottomSection = styled.section`
  background-color: #FFF;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  border: 1px solid #E3E6F0;
  min-height: 300px;
  ${C.FlexCenter}

  div {
    padding: 2rem;
    color: #858796;
  }
`;