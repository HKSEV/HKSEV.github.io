import styled from "styled-components";
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

// dashboard
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
  font-size: 1rem;
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

// consult
export const SetConsultContainer = styled.div`
  width: 100%;
`;
export const SetConsultHeader = styled.header`
  ${C.FlexBetween}
  margin-bottom: 1.5rem;
`;
export const SetConsultTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const SetConsultFilterCard = styled.div`
  margin-bottom: 2rem;
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const SetConsultInputGroup = styled.div`
  ${C.FlexRight}
  gap: 0.5rem;
  padding: 0.8rem;
`;
export const SetConsultInput = styled.input`
  padding: 0.66rem 1rem;
  font-size: 0.9rem;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  ${C.TransitionAll}
  &:focus { border-color: #4E73DF; }
`;
export const SetConsultSearchButton = styled.button`
  ${C.FlexCenter}
  ${C.BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  border: 1px solid #E3E6F0;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${C.BoxShadow}
  ${C.TransitionAll}
`;
export const SetConsultTableCard = styled.div`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const SetConsultCardHeader = styled.header`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const SetConsultCardTitle = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const SetConsultTableWrapper = styled.div`
  width: 100%;
`;
export const SetConsultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  thead {
    background-color: #EAECF4;
    color: #202020;
  }

  tbody {
    color: #5A5C69;
    font-size: 0.9rem;
  }

  th, td {
    text-align: center;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #D1D3E2;
  }
`;
export const SetConsultStatusBadge = styled.span<{$status: string}>`
  width: 100%;
  padding: 0.4rem 0.7rem;
  border-radius: 10rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  ${C.TransitionAll}
  ${({$status}) => ($status === "대기중" ? (`
    color: #B45309;
    background-color: #FEF3C7;
    &:hover { background-color: #FDE68A; }
  `) : (`
    color: #15803D;
    background-color: #DCFCE7;
    &:hover { background-color: #BBF7D0; }
  `))}
`;
export const SetConsultDeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #E74A3B;
  cursor: pointer;
  padding: 0.5rem;
  ${C.TransitionAll}
  &:hover { background-color: #FDEAEA; }
`;

// tone
export const ToneContainer = styled.div`
  width: 100%;
`;
export const ToneHeader = styled.header`
  ${C.FlexBetween}
  margin-bottom: 1.5rem;
`;
export const ToneTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const ToneSaveButton = styled.button`
  ${C.FlexCenter}
  ${C.BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${C.BoxShadow}
  ${C.TransitionAll}
`;
export const ToneCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
export const ToneSettingsCard = styled.div`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const ToneCardHeader = styled.header`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const ToneCardTitle = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const ToneCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;
export const ToneColorOptionWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;
export const ToneColorBox = styled.div<{$color: string; $isActive: boolean}>`
  ${C.FlexCenter}
  width: 5rem;
  height: 5rem;
  background-color: ${({$color}) => $color};
  cursor: pointer;
  ${C.BoxShadow}
  box-shadow: ${(props) => (
    props.$isActive ? `0 0 0 4px #FFF, 0 0 0 7px ${props.$color}`
    : "0 0.15rem 0.5rem 0 rgba(0, 0, 0, 0.1)"
  )};
`;
export const ToneToggleWrapper = styled.div`
  display: flex;
  background-color: #EAECF4;
  border-radius: 0.5rem;
  padding: 0.3rem;
  width: fit-content;
  margin-bottom: 1.5rem;
`;
export const ToneModeButton = styled.button<{$isActive: boolean; $isDark?: boolean}>`
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 0.35rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${C.TransitionAll}
  background-color: ${(props) => (
    props.$isActive ? (props.$isDark ? "#202020" : "#FFF")
    : "transparent"
  )};
  color: ${(props) => (
    props.$isActive ? (props.$isDark ? "#FFF" : "#4E73DF")
    : "#858796"
  )};
`;
export const ToneSelectedText = styled.div`
  font-size: 0.9rem;
  border-top: 1px solid #EAECF4;
  padding-top: 1rem;
  strong { color: #5A5C69; }
`;

// nav
export const SetNavContainer = styled.div`
  width: 100%;
`;
export const SetNavHeader = styled.header`
  ${C.FlexBetween}
  margin-bottom: 1.5rem;
`;
export const SetNavTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const SetNavSaveButton = styled.button`
  ${C.FlexCenter}
  ${C.BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${C.BoxShadow}
  ${C.TransitionAll}
`;
export const SetNavGrid = styled.div`
  ${C.FlexColumn}
  gap: 1.5rem;
`;
export const SetNavCard = styled.div`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const SetNavCardHeader = styled.header`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const SetNavCardTitle = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const SetNavCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;
export const SetNavRadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;
export const SetNavRadioLabel = styled.label<{$isActive: boolean}>`
  ${C.FlexCenter}
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 0.35rem;
  ${({$isActive}) => ($isActive ? (`
    border: 1px solid #4E73DF;
    background-color: #EAECF4;
    color: #4E73DF;
  `) : (`
    border: 1px solid #D1D3E2;
    background-color: #FFF;
    color: #858796;
  `))}
  font-weight: 600;
  cursor: pointer;
  ${C.TransitionAll}
  &:hover { background-color: #F8F9FC; }
`;
export const SetNavInputWrapper = styled.div`
  ${C.FlexColumn}
  gap: 1rem;
  background-color: #F8F9FC;
  padding: 1.5rem;
  border-radius: 0.35rem;
  border: 1px solid #E3E6F0;
`;
export const SetNavLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #5A5C69;
  white-space: nowrap;
  flex-shrink: 0;
`;
export const SetNavInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  ${C.TransitionAll}
  &:focus { border-color: #4E73DF; }
`;
export const SetNavFileGroup = styled.div`
  ${C.FlexColumn}
  gap: 0.5rem;
`;
export const SetNavFileInputWrapper = styled.div`
  margin-top: 0.5rem;
  
  .file-name {
    font-size: 0.9rem;
    color: #858796;
  }
`;
export const SetNavFileInput = styled.input`
  display: none;
`;
export const SetNavFileLabel = styled.label`
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5A5C69;
  cursor: pointer;
  &:hover { background-color: #EAECF4; }
`;
export const SetNavPreview = styled.div`
  margin-top: 1rem;
  
  img {
    width: 200px;
    max-width: 200px;
    height: auto;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SetNavMenuList = styled.ul`
  flex-wrap: wrap;
  ${C.FlexCenter}
  gap: 1rem;
  background-color: #F8F9FC;
  padding: 1rem;
  border-radius: 0.35rem;
  border: 1px solid #E3E6F0;

  .menu-number {
    font-weight: 900;
    color: #B7B9CC;
    width: 20px;
  }
`;
export const SetNavMenuItem = styled.li`
  ${C.FlexCenter}
  gap: 1rem;
  background-color: #F8F9FC;
  border-radius: 0.35rem;
  border: 1px solid #E3E6F0;
  padding: 1rem;
  box-sizing: border-box;
`;
export const SetNavDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #E74A3B;
  cursor: pointer;
  ${C.FlexCenter}
  padding: 0.5rem;
  ${C.TransitionAll}
  &:hover { background-color: #FDEAEA; }
`;
export const SetNavAddButton = styled.button`
  ${C.FlexCenter}
  width: 100%;
  border: 1px dashed #B7B9CC;
  color: #5A5C69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  gap: 0.5rem;
  ${C.TransitionAll}
  cursor: pointer;

  &:hover {
    background-color: #EAECF4;
    border-color: #858796;
  }
`;

// pop
export const PopContainer = styled.div`
  width: 100%;
`;
export const PopHeader = styled.header`
  ${C.FlexBetween}
  margin-bottom: 1.5rem;
`;
export const PopTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const PopSaveButton = styled.button`
  ${C.FlexCenter}
  ${C.BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${C.BoxShadow}
  ${C.TransitionAll}
`;
export const PopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export const PopLeftColumn = styled.div`
  
`;
export const PopCard = styled.div`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const PopCardHeader = styled.header`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const PopCardTitle = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const PopCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;
export const PopFormGroup = styled.div`
  ${C.FlexColumn}
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
export const PopLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #5A5C69;
`;
export const PopInput = styled.input`
  width: 100%;
  padding: 0.66rem 1rem;
  font-size: 0.9rem;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  ${C.TransitionAll}
  &:focus { border-color: #4E73DF; }
`;
export const PopFileInputWrapper = styled.div`
  margin-top: 0.5rem;
  
  .file-name {
    font-size: 0.9rem;
    color: #858796;
  }
`;
export const PopFileInput = styled.input`
  display: none;
`;
export const PopFileLabel = styled.label`
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5A5C69;
  cursor: pointer;
  &:hover { background-color: #EAECF4; }
`;
export const PopPreview = styled.div`
  margin-top: 1rem;
  
  img {
    width: 200px;
    max-width: 200px;
    height: auto;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const PopCheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;
export const PopCheckboxInput = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;
export const PopCheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #858796;
  cursor: pointer;
`;
export const PopAddButton = styled.button`
  ${C.FlexCenter}
  width: 100%;
  border: 1px dashed #B7B9CC;
  color: #5A5C69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  gap: 0.5rem;
  ${C.TransitionAll}
  cursor: pointer;

  &:hover {
    background-color: #EAECF4;
    border-color: #858796;
  }
`;
export const PopRightColumn = styled.div`
  
`;
export const PopTableWrapper = styled.div`
  width: 100%;
`;
export const PopTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  thead {
    background-color: #EAECF4;
    color: #202020;
  }

  tbody {
    color: #5A5C69;
    font-size: 0.9rem;
  }

  th, td {
    text-align: center;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #D1D3E2;
  }
`;
export const PopBadge = styled.span<{
  $color: string, $bgColor: string, $hoverColor: string
}>`
  padding: 0.4rem 0.6rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: ${({$color}) => $color};
  background-color: ${({$bgColor}) => $bgColor};
  &:hover { background-color: ${({$hoverColor}) => $hoverColor}; }
  ${C.TransitionAll}
`;
export const PopDeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #E74A3B;
  cursor: pointer;
  padding: 0.5rem;
  ${C.TransitionAll}
  &:hover { background-color: #FDEAEA; }
`;

// news
export const NewsContainer = styled.div`
  width: 100%;
`;
export const NewsHeader = styled.header`
  ${C.FlexBetween}
  margin-bottom: 1.5rem;
`;
export const NewsTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const NewsSaveButton = styled.button`
  ${C.FlexCenter}
  ${C.BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${C.BoxShadow}
  ${C.TransitionAll}
`;
export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export const NewsLeftColumn = styled.div`
  
`;
export const NewsCard = styled.div`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const NewsCardHeader = styled.header`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const NewsCardTitle = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const NewsCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;
export const NewsFormGroup = styled.div`
  ${C.FlexColumn}
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
export const NewsLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #5A5C69;
`;
export const NewsInput = styled.input`
  width: 100%;
  padding: 0.66rem 1rem;
  font-size: 0.9rem;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  ${C.TransitionAll}
  &:focus { border-color: #4E73DF; }
`;
export const NewsFileInputWrapper = styled.div`
  margin-top: 0.5rem;
  
  .file-name {
    font-size: 0.9rem;
    color: #858796;
  }
`;
export const NewsFileInput = styled.input`
  display: none;
`;
export const NewsFileLabel = styled.label`
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5A5C69;
  cursor: pointer;
  &:hover { background-color: #EAECF4; }
`;
export const NewsPreviewCircle = styled.div`
  margin-top: 1rem;
  
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const NewsAddButton = styled.button`
  ${C.FlexCenter}
  width: 100%;
  border: 1px dashed #B7B9CC;
  color: #5A5C69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  gap: 0.5rem;
  ${C.TransitionAll}
  cursor: pointer;

  &:hover {
    background-color: #EAECF4;
    border-color: #858796;
  }
`;
export const NewsRightColumn = styled.div`
  
`;
export const NewsTableWrapper = styled.div`
  width: 100%;
`;
export const NewsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  thead {
    background-color: #EAECF4;
    color: #202020;
  }

  tbody {
    color: #5A5C69;
    font-size: 0.9rem;
  }

  th, td {
    text-align: center;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #D1D3E2;
  }
`;
export const NewsActionButton = styled.button`
  ${C.FlexCenter}
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 0.35rem;
  ${C.TransitionAll}
  
  &:not(:disabled) {
    color: #202020;
    cursor: pointer;
  }
  &:not(:disabled):hover { background-color: #E3E6F0; }
`;
export const NewsThumbnail = styled.div`
  ${C.FlexCenter}
  
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
export const NewsDeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #E74A3B;
  cursor: pointer;
  padding: 0.5rem;
  ${C.TransitionAll}
  &:hover { background-color: #FDEAEA; }
`;

// self
export const SelfContainer = styled.div`
  width: 100%;
`;
export const SelfHeader = styled.header`
  ${C.FlexBetween}
  margin-bottom: 1.5rem;
`;
export const SelfTitle = styled.h1`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const SelfSaveButton = styled.button`
  ${C.FlexCenter}
  ${C.BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${C.BoxShadow}
  ${C.TransitionAll}
`;
export const SelfGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export const SelfLeftColumn = styled.div`
  
`;
export const SelfCard = styled.div`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  overflow: hidden;
`;
export const SelfCardHeader = styled.header`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const SelfCardTitle = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const SelfCardBody = styled.div`
  padding: 1.5rem;
  color: #858796;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;
export const SelfFormGroup = styled.div`
  ${C.FlexColumn}
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
export const SelfLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 700;
  color: #5A5C69;
`;
export const SelfFileInputWrapper = styled.div`
  margin-top: 0.5rem;
  
  .file-name {
    font-size: 0.9rem;
    color: #858796;
  }
`;
export const SelfFileInput = styled.input`
  display: none;
`;
export const SelfFileLabel = styled.label`
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #5A5C69;
  cursor: pointer;
  &:hover { background-color: #EAECF4; }
`;
export const SelfPreviewRect = styled.div`
  margin-top: 1rem;
  
  img {
    width: 150px;
    height: 200px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SelfInput = styled.input`
  width: 100%;
  padding: 0.66rem 1rem;
  font-size: 0.9rem;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  ${C.TransitionAll}
  &:focus { border-color: #4E73DF; }
`;
export const SelfAddButton = styled.button`
  ${C.FlexCenter}
  width: 100%;
  border: 1px dashed #B7B9CC;
  color: #5A5C69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  gap: 0.5rem;
  ${C.TransitionAll}
  cursor: pointer;

  &:hover {
    background-color: #EAECF4;
    border-color: #858796;
  }
`;
export const SelfRightColumn = styled.div`
  
`;
export const SelfTableWrapper = styled.div`
  width: 100%;
`;
export const SelfTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  thead {
    background-color: #EAECF4;
    color: #202020;
  }

  tbody {
    color: #5A5C69;
    font-size: 0.9rem;
  }

  th, td {
    text-align: center;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid #D1D3E2;
  }
`;
export const SelfThumbnail = styled.div`
  ${C.FlexCenter}
  
  img {
    width: 75px;
    height: 100px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SelfStatusBadge = styled.span<{$isActive: boolean}>`
  width: 100%;
  padding: 0.4rem 0.7rem;
  border-radius: 10rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  ${C.TransitionAll}
  ${({$isActive}) => (!$isActive ? (`
    color: #B91C1C;
    background-color: #FEE2E2;
    &:hover { background-color: #FCA5A5; }
  `) : (`
    color: #15803D;
    background-color: #DCFCE7;
    &:hover { background-color: #BBF7D0; }
  `))}
`;
export const SelfDeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: #E74A3B;
  cursor: pointer;
  padding: 0.5rem;
  ${C.TransitionAll}
  &:hover { background-color: #FDEAEA; }
`;