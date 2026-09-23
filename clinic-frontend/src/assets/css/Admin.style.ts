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

// -----------------------------------------
// 🎯 dashboard
// -----------------------------------------
export const DashContainer = styled.div`
  ${C.Container}
`;
export const DashTitle = styled.h1`
  ${C.Title}
  margin-bottom: 1.5rem;
`;
export const DashCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const DashSummaryCard = styled.div<{$borderColor: string}>`
  ${C.FlexTopBetween}
  background-color: #FFF;
  border-radius: 0.35rem;
  border-left: 0.25rem solid ${({$borderColor}) => $borderColor};
  ${C.BoxShadow}
  padding: 1.25rem;
`;
export const DashCardInfo = styled.div`
  ${C.FlexColumn}
  gap: 0.2rem;
  flex: 1;
`;
export const DashCardLabel = styled.span<{$textColor: string}>`
  font-size: 1rem;
  font-weight: 800;
  color: ${({$textColor}) => $textColor};
  text-transform: uppercase;
  margin-bottom: 0.2rem;
`;
export const DashCardMainValue = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #5A5C69;
  margin-bottom: 0.8rem;
`;
export const DashCardSubGrid = styled.div`
  ${C.FlexWrap}
  gap: 0.8rem;
  font-size: 0.8rem;
  color: #858796;
  border-top: 1px solid #EAECF4;
  padding-top: 0.8rem;
  width: 100%;
`;
export const DashCardSubItem = styled.div`
  display: flex;
  gap: 0.3rem;
  strong { color: #5A5C69; }
`;
export const DashCardIconWrapper = styled.div`
  opacity: 0.6;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;
export const DashBottomSection = styled.section`
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
export const DashChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
export const DashChartCard = styled.div`
  ${C.Card}
  ${C.FlexColumn}
`;
export const DashChartHeader = styled.header`
  ${C.CardHeader}
`;
export const DashChartTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const DashChartBody = styled.div`
  padding: 1.5rem;
  flex: 1;
`;
// CSS 막대 차트
export const DashBarChartContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 250px;
  padding-top: 1rem;
  border-bottom: 1px solid #eaecf4;
  border-left: 1px solid #eaecf4;
`;
export const DashBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 10%;
`;
export const DashBarValue = styled.div`
  font-size: 0.75rem;
  color: #858796;
  margin-bottom: 0.5rem;
`;
export const DashBar = styled.div<{ $height: string }>`
  width: 100%;
  height: ${(props) => props.$height};
  background-color: #4e73df;
  border-radius: 0.2rem 0.2rem 0 0;
  transition: height 0.5s ease;

  &:hover {
    background-color: #2e59d9;
  }
`;
export const DashBarLabel = styled.div`
  font-size: 0.8rem;
  color: #858796;
  margin-top: 0.5rem;
`;
// CSS 도넛 차트
export const DashDonutChart = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    #4e73df 0% 45%,
    #1cc88a 45% 75%,
    #36b9cc 75% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;

  .inner-circle {
    width: 110px;
    height: 110px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #5a5c69;
  }
`;
export const DashLegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
export const DashLegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #858796;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;
// --- 하단 시스템 현황 (나머지 메뉴 모음) ---
export const DashSystemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
export const DashSystemCard = styled(DashChartCard)``;
export const DashStatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const DashStatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed #eaecf4;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .label {
    font-size: 0.9rem;
    color: #5a5c69;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
export const DashBadge = styled.span<{ $active: boolean }>`
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: ${(props) => (props.$active ? "#1cc88a" : "#e74a3b")};
  color: white;
`;

// -----------------------------------------
// 🎯 consult
// -----------------------------------------
export const SetConsultContainer = styled.div`
  ${C.Container}
`;
export const SetConsultHeader = styled.header`
  ${C.Header}
`;
export const SetConsultTitle = styled.h1`
  ${C.Title}
`;
export const SetConsultFilterCard = styled.div`
  margin-bottom: 2rem;
  ${C.Card}
`;
export const SetConsultInputGroup = styled.div`
  ${C.FlexRight}
  gap: 0.5rem;
  padding: 0.8rem;
`;
export const SetConsultInput = styled.input`
  ${C.Input}
  width: 250px;
`;
export const SetConsultSearchButton = styled.button`
  ${C.SaveButton}
`;
export const SetConsultTableCard = styled.div`
  ${C.Card}
`;
export const SetConsultCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SetConsultCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SetConsultTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const SetConsultTable = styled.table`
  ${C.Table}
`;
export const SetConsultStatusBadge = styled.span<{$status: string}>`
  ${C.Badge}
  border-radius: 10rem;
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
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 tone
// -----------------------------------------
export const ToneContainer = styled.div`
  ${C.Container}
`;
export const ToneHeader = styled.header`
  ${C.Header}
`;
export const ToneTitle = styled.h1`
  ${C.Title}
`;
export const ToneSaveButton = styled.button`
  ${C.SaveButton}
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
  ${C.Card}
`;
export const ToneCardHeader = styled.header`
  ${C.CardHeader}
`;
export const ToneCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const ToneCardBody = styled.div`
  ${C.CardBody}
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

// -----------------------------------------
// 🎯 nav
// -----------------------------------------
export const SetNavContainer = styled.div`
  ${C.Container}
`;
export const SetNavHeader = styled.header`
  ${C.Header}
`;
export const SetNavTitle = styled.h1`
  ${C.Title}
`;
export const SetNavSaveButton = styled.button`
  ${C.SaveButton}
`;
export const SetNavGrid = styled.div`
  ${C.FlexColumn}
  gap: 1.5rem;
`;
export const SetNavCard = styled.div`
  ${C.Card}
`;
export const SetNavCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SetNavCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SetNavCardBody = styled.div`
  ${C.CardBody}
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
  ${C.Label}
`;
export const SetNavInput = styled.input`
  ${C.Input}
`;
export const SetNavFileGroup = styled.div`
  ${C.FlexColumn}
  gap: 0.5rem;
`;
export const SetNavFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;
export const SetNavFileInput = styled.input`
  display: none;
`;
export const SetNavFileLabel = styled.label`
  ${C.FileLabel}
`;
export const SetNavPreview = styled.div`
  margin-top: 1rem;
  
  img {
    width: auto;
    max-height: 300px;
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
  ${C.DeleteButton}
`;
export const SetNavAddButton = styled.button`
  ${C.AddButton}
`;

// -----------------------------------------
// 🎯 pop
// -----------------------------------------
export const PopContainer = styled.div`
  ${C.Container}
`;
export const PopHeader = styled.header`
  ${C.Header}
`;
export const PopTitle = styled.h1`
  ${C.Title}
`;
export const PopSaveButton = styled.button`
  ${C.SaveButton}
`;
export const PopGrid = styled.div`
  ${C.Grid}
`;
export const PopLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const PopRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const PopCard = styled.div`
  ${C.Card}
`;
export const PopCardHeader = styled.header`
  ${C.CardHeader}
`;
export const PopCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const PopCardBody = styled.div`
  ${C.CardBody}
`;
export const PopFormGroup = styled.div`
  ${C.FormGroup}
`;
export const PopLabel = styled.label`
  ${C.Label}
`;
export const PopInput = styled.input`
  ${C.Input}
`;
export const PopFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;
export const PopFileInput = styled.input`
  display: none;
`;
export const PopFileLabel = styled.label`
  ${C.FileLabel}
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
  ${C.AddButton}
`;
export const PopTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const PopTable = styled.table`
  ${C.Table}
`;
export const PopBadge = styled.span<{
  $color: string, $bgColor: string, $hoverColor: string
}>`
  ${C.Badge}
  cursor: pointer;
  color: ${({$color}) => $color};
  background-color: ${({$bgColor}) => $bgColor};
  &:hover { background-color: ${({$hoverColor}) => $hoverColor}; }
  ${C.TransitionAll}
`;
export const PopDeleteButton = styled.button`
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 news
// -----------------------------------------
export const NewsContainer = styled.div`
  ${C.Container}
`;
export const NewsHeader = styled.header`
  ${C.Header}
`;
export const NewsTitle = styled.h1`
  ${C.Title}
`;
export const NewsSaveButton = styled.button`
  ${C.SaveButton}
`;
export const NewsGrid = styled.div`
  ${C.Grid}
`;
export const NewsLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const NewsRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const NewsCard = styled.div`
  ${C.Card}
`;
export const NewsCardHeader = styled.header`
  ${C.CardHeader}
`;
export const NewsCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const NewsCardBody = styled.div`
  ${C.CardBody}
`;
export const NewsFormGroup = styled.div`
  ${C.FormGroup}
`;
export const NewsLabel = styled.label`
  ${C.Label}
`;
export const NewsInput = styled.input`
  ${C.Input}
`;
export const NewsFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;
export const NewsFileInput = styled.input`
  display: none;
`;
export const NewsFileLabel = styled.label`
  ${C.FileLabel}
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
  ${C.AddButton}
`;
export const NewsTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const NewsTable = styled.table`
  ${C.Table}
`;
export const NewsActionButton = styled.button`
  ${C.ActionButton}
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
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 self
// -----------------------------------------
export const SelfContainer = styled.div`
  ${C.Container}
`;
export const SelfHeader = styled.header`
  ${C.Header}
`;
export const SelfTitle = styled.h1`
  ${C.Title}
`;
export const SelfSaveButton = styled.button`
  ${C.SaveButton}
`;
export const SelfGrid = styled.div`
  ${C.Grid}
`;
export const SelfLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const SelfRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const SelfCard = styled.div`
  ${C.Card}
`;
export const SelfCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SelfCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SelfCardBody = styled.div`
  ${C.CardBody}
`;
export const SelfFormGroup = styled.div`
  ${C.FormGroup}
`;
export const SelfLabel = styled.label`
  ${C.Label}
`;
export const SelfFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;
export const SelfFileInput = styled.input`
  display: none;
`;
export const SelfFileLabel = styled.label`
  ${C.FileLabel}
`;
export const SelfPreviewRect = styled.div`
  margin-top: 1rem;
  
  img {
    aspect-ratio: 3 / 4;
    height: 200px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SelfInput = styled.input`
  ${C.Input}
`;
export const SelfAddButton = styled.button`
  ${C.AddButton}
`;
export const SelfTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const SelfTable = styled.table`
  ${C.Table}
`;
export const SelfThumbnail = styled.div`
  ${C.FlexCenter}
  
  img {
    aspect-ratio: 3 / 4;
    height: 100px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SelfStatusBadge = styled.span<{$isActive: boolean}>`
  ${C.Badge}
  border-radius: 10rem;
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
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 event
// -----------------------------------------
export const SetEventContainer = styled.div`
  ${C.Container}
`;
export const SetEventHeader = styled.header`
  ${C.Header}
`;
export const SetEventTitle = styled.h1`
  ${C.Title}
`;
export const SetEventSaveButton = styled.button`
  ${C.SaveButton}
`;
export const SetEventGrid = styled.div`
  ${C.Grid}
`;
export const SetEventLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetEventRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetEventCard = styled.div`
  ${C.Card}
`;
export const SetEventCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SetEventCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SetEventCardBody = styled.div`
  ${C.CardBody}
`;
export const SetEventFormGroup = styled.div`
  ${C.FormGroup}
`;
export const SetEventLabel = styled.label`
  ${C.Label}
`;
export const SetEventInput = styled.input`
  ${C.Input}
`;
export const SetEventFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;
export const SetEventFileInput = styled.input`
  display: none;
`;
export const SetEventFileLabel = styled.label`
  ${C.FileLabel}
`;
export const SetEventPreviewRect = styled.div`
  margin-top: 1rem;
  
  img {
    aspect-ratio: 4 / 5;
    height: 200px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SetEventAddButton = styled.button`
  ${C.AddButton}
`;
export const SetEventTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const SetEventTable = styled.table`
  ${C.Table}
`;
export const SetEventThumbnail = styled.div`
  ${C.FlexCenter}
  
  img {
    aspect-ratio: 4 / 5;
    height: 100px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SetEventRankBadge = styled.div`
  ${C.RankBadge}
  background-color: #4E73DF;
  color: #FFF;
`;
export const SetEventActionButton = styled.button`
  ${C.ActionButton}
`;
export const SetEventDeleteButton = styled.button`
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 vlog
// -----------------------------------------
export const SetVlogContainer = styled.div`
  ${C.Container}
`;
export const SetVlogHeader = styled.header`
  ${C.Header}
`;
export const SetVlogTitle = styled.h1`
  ${C.Title}
`;
export const SetVlogSaveButton = styled.button`
  ${C.SaveButton}
`;
export const SetVlogGrid = styled.div`
  ${C.Grid}
`;
export const SetVlogLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetVlogRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetVlogCard = styled.div`
  ${C.Card}
`;
export const SetVlogCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SetVlogCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SetVlogCardBody = styled.div`
  ${C.CardBody}
`;
export const SetVlogFormGroup = styled.div`
  ${C.FormGroup}
`;
export const SetVlogLabel = styled.label`
  ${C.Label}
`;

export const SetVlogInput = styled.input`
  ${C.Input}
`;

export const SetVlogFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;

export const SetVlogFileInput = styled.input`
  display: none;
`;

export const SetVlogFileLabel = styled.label`
  ${C.FileLabel}
`;
// 💡 유튜브 영상처럼 가로가 긴 16:9 비율의 미리보기 영역
export const SetVlogPreviewRect = styled.div`
  margin-top: 1rem;
  
  img {
    aspect-ratio: 16 / 9;
    width: 100px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SetVlogAddButton = styled.button`
  ${C.AddButton}
`;
export const SetVlogTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const SetVlogTable = styled.table`
  ${C.Table}
`;
// 💡 리스트 내부의 16:9 썸네일
export const SetVlogThumbnail = styled.div`
  ${C.FlexCenter}
  
  img {
    aspect-ratio: 16 / 9;
    width: 100px;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`;
export const SetVlogRankBadge = styled.div`
  ${C.RankBadge}
  background-color: #36B9CC;
  color: #FFF;
`;
export const SetVlogActionButton = styled.button`
  ${C.ActionButton}
`;
export const SetVlogDeleteButton = styled.button`
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 safety
// -----------------------------------------
export const SetSafetyContainer = styled.div`
  ${C.Container}
`;
export const SetSafetyHeader = styled.header`
  ${C.Header}
`;
export const SetSafetyTitle = styled.h1`
  ${C.Title}
`;
export const SetSafetySaveButton = styled.button`
  ${C.SaveButton}
`;
export const SetSafetyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export const SetSafetyLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetSafetyRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetSafetyCard = styled.div`
  ${C.Card}
`;
export const SetSafetyCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SetSafetyCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SetSafetyCardBody = styled.div`
  ${C.CardBody}
`;
export const SetSafetyFormGroup = styled.div`
  ${C.FormGroup}
`;
export const SetSafetyLabel = styled.label`
  ${C.Label}
`;
export const SetSafetyInput = styled.input`
  ${C.Input}
`;
// 💡 상세 설명을 위한 Textarea 컴포넌트 추가
export const SetSafetyTextarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #5A5C69;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #4e73df;
  }
`;
export const SetSafetyFileInputWrapper = styled.div`
  ${C.FileInputWrapper}
`;
export const SetSafetyFileInput = styled.input`
  display: none;
`;
export const SetSafetyFileLabel = styled.label`
  ${C.FileLabel}
`;
export const SetSafetyPreviewRect = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid #e3e6f0;
  margin-top: 1rem;
  background-color: #f8f9fc;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const SetSafetyAddButton = styled.button`
  ${C.AddButton}
`;
export const SetSafetyTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const SetSafetyTable = styled.table`
  ${C.Table}
`;
export const SetSafetyThumbnail = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 0.35rem;
  background-color: #EAECF4;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #B7B9CC;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const SetSafetyRankBadge = styled.div`
  ${C.RankBadge}
  background-color: #1CC88A;
  color: #FFF;
`;
export const SetSafetyActionButton = styled.button`
  ${C.ActionButton}
`;
export const SetSafetyDeleteButton = styled.button`
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 footer
// -----------------------------------------
export const SetFooterContainer = styled.div`
  ${C.Container}
`;
export const SetFooterHeader = styled.header`
  ${C.Header}
`;
export const SetFooterTitle = styled.h1`
  ${C.Title}
`;
export const SetFooterSaveButton = styled.button`
  ${C.SaveButton}
`;
export const SetFooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export const SetFooterLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const SetFooterRightColumn = styled.div`
  ${C.FlexColumn}
  gap: 1.5rem;
`;
export const SetFooterCard = styled.div`
  ${C.Card}
`;
export const SetFooterCardHeader = styled.header`
  ${C.CardHeader}
`;
export const SetFooterCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const SetFooterCardBody = styled.div`
  ${C.CardBody}
`;
export const SetFooterFormGroup = styled.div`
  ${C.FormGroup}
`;
export const SetFooterLabel = styled.label`
  ${C.Label}
`;
export const SetFooterInput = styled.input`
  ${C.Input}
`;
export const SetFooterFlexRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;
export const SetFooterFamilyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;
export const SetFooterDeleteButton = styled.button`
  ${C.DeleteButton}
`;
export const SetFooterAddButton = styled.button`
  ${C.AddButton}
`;

// -----------------------------------------
// 🎯 user
// -----------------------------------------
export const UserContainer = styled.div`
  ${C.Container}
`;
export const UserHeader = styled.header`
  ${C.Header}
`;
export const UserTitle = styled.h1`
  ${C.Title}
`;
export const UserFilterCard = styled.div`
  margin-bottom: 2rem;
  ${C.Card}
`;
export const UserInputGroup = styled.div`
  ${C.FlexRight}
  gap: 0.5rem;
  padding: 0.8rem;
`;
export const UserInput = styled.input`
  ${C.Input}
  width: 250px;
`;
export const UserSearchButton = styled.button`
  ${C.SaveButton}
`;
export const UserTableCard = styled.div`
  ${C.Card}
`;
export const UserCardHeader = styled.header`
  ${C.CardHeader}
`;
export const UserCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const UserTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const UserTable = styled.table`
  ${C.Table}
`;
// 상태 표시 배지 (정상: 초록색, 정지: 빨간색)
export const UserStatusBadge = styled.span<{ $status: string }>`
  background-color: ${(props) => (
    props.$status === "정상" ? "#1CC88A" : "#E74A3B"
  )};
  color: #FFF;
  ${C.Badge}
  cursor: pointer;
  ${C.TransitionAll}

  &:hover {
    opacity: 0.8;
  }
`;
export const UserDeleteButton = styled.button`
  ${C.DeleteButton}
`;

// -----------------------------------------
// 🎯 board
// -----------------------------------------
export const BoardContainer = styled.div`
  ${C.Container}
`;
export const BoardHeader = styled.header`
  ${C.Header}
`;
export const BoardTitle = styled.h1`
  ${C.Title}
`;
export const BoardSaveButton = styled.button`
  ${C.SaveButton}
`;
export const BoardGrid = styled.div`
  ${C.Grid}
`;
export const BoardLeftColumn = styled.div`
  ${C.FlexColumn}
`;
export const BoardRightColumn = styled.div`
  ${C.FlexColumn}
`;
export const BoardCard = styled.div`
  ${C.Card}
`;
export const BoardCardHeader = styled.div`
  ${C.CardHeader}
`;
export const BoardCardTitle = styled.h6`
  ${C.CardTitle}
`;
export const BoardCardBody = styled.div`
  ${C.CardBody}
`;
export const BoardFormGroup = styled.div`
  ${C.FormGroup}
`;
export const BoardLabel = styled.label`
  ${C.Label}
`;
export const BoardInput = styled.input`
  ${C.Input}
`;
// 💡 새로 추가된 Select(콤보박스) 스타일
export const BoardSelect = styled.select`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  color: #5A5C69;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    border-color: #4e73df;
  }
`;
export const BoardAddButton = styled.button`
  ${C.AddButton}
`;
export const BoardTableWrapper = styled.div`
  ${C.TableWrapper}
`;
export const BoardTable = styled.table`
  ${C.Table}
`;
// 스킨 타입별로 색상을 다르게 보여주는 배지
export const BoardTypeBadge = styled.span<{ $type: string }>`
  background-color: ${(props) => {
    if (props.$type === "갤러리형")
      return "#36B9CC";
    if (props.$type === "FAQ형")
      return "#F6C23E";
    return "#858796"; // 일반게시판
  }};
  color: #FFF;
  ${C.Badge}
`;
export const BoardActionButton = styled.button`
  ${C.ActionButton}
`;
export const BoardDeleteButton = styled.button`
  ${C.DeleteButton}
`;