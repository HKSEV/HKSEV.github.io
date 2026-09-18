import styled from "styled-components";
import * as C from "./Common.style";

export const PopupOveray = styled.div<{$isOpen: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  ${C.FlexCenter}
  ${({$isOpen}) => ($isOpen ? (`
    visibility: visible;
    opacity: 1;
    ${C.TransitionAll}
  `) : (`
    visibility: hidden;
    opacity: 0;
    transition: none;
  `))};
`;
export const PopupBox = styled.div<{$top: string; $left: string}>`
  background-color: #FFF;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  width: 90%;
  max-width: 450px;
  overflow: hidden;
`;
export const PopupHeader = styled.header`
  ${C.FlexBetween}
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E3E6F0;
  background-color: #F8F9FC;
`;
export const PopupTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: #4E73DF;
`;
export const PopupCloseIcon = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: #858796;
  cursor: pointer;
  line-height: 1;
  &:hover { color: #3A3B45; }
`;
export const PopupBody = styled.div`
  padding: 1.5rem;
  font-size: 0.95rem;
  color: #5A5C69;
  line-height: 1.5;
`;
export const PopupFooter = styled.footer`
  ${C.FlexRight}
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #E3E6F0;
`;
export const PopupCancelButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  background-color: #858796;
  border: 1px solid #858796;
  color: #FFF;
  cursor: pointer;
  ${C.TransitionAll}
  &:hover { background-color: #717384; }
`;
export const PopupConfirmButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.35rem;
  ${C.BlueButtonTheme}
  cursor: pointer;
  ${C.TransitionAll}
`;