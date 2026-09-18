import { css } from "styled-components";

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FlexStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const FlexRight = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const FlexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const FlexTopBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
export const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;
export const FlexRow = css`
  display: flex;
  flex-direction: row;
`;
export const FlexWrap = css`
  display: flex;
  flex-wrap: wrap;
`;
export const BlueButtonTheme = css`
  background-color: #4E73DF;
  border: 1px solid #4E73DF;
  color: #FFF;

  &:hover {
    background-color: #2E59D9;
    border-color: #2653D4;
  }
`;
export const LinearGradient = css`
  background-image: linear-gradient(
    180deg, #4E73DF 10%, #224ABE 100%
  );
`;
export const BoxShadow = css`
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
`;
export const TransitionAll = css`
  transition: all 0.15s ease-in-out;
`;
export const ButtonBasic = css`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;
export const CircleBtn = css`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  color: #FFF;
  cursor: pointer;
`;
export const Transparent = css`
  background-color: transparent;
  padding: 0.35rem 0.8rem;
  border-radius: 0.35rem;
  font-size: 0.85rem;
  font-weight: 600;
`;