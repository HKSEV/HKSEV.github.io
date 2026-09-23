import { css } from "styled-components";

export const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const InlineFlexCenter = css`
  display: inline-flex;
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

// admin
export const Container = css`
  width: 100%;
`;
export const Header = css`
  ${FlexBetween}
  margin-bottom: 1.5rem;
`;
export const Title = css`
  font-size: 1.5rem;
  color: #5A5C69;
  font-weight: 700;
  margin: 0;
`;
export const SaveButton = css`
  ${FlexCenter}
  ${BlueButtonTheme}
  padding: 0.5rem 1.2rem;
  border-radius: 0.35rem;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  ${BoxShadow}
  ${TransitionAll}
`;
export const Grid = css`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
export const Card = css`
  background-color: #FFF;
  border: 1px solid #E3E6F0;
  border-radius: 0.35rem;
  ${BoxShadow}
  overflow: hidden;
`;
export const CardHeader = css`
  background-color: #F8F9FC;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #E3E6F0;
`;
export const CardTitle = css`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4E73DF;
`;
export const CardBody = css`
  padding: 1.5rem;
  color: #858796;

  p {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
`;
export const FormGroup = css`
  ${FlexColumn}
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
export const Label = css`
  font-size: 0.85rem;
  font-weight: 700;
  color: #5A5C69;
`;
export const FileInputWrapper = css`
  margin-top: 0.5rem;
  
  .file-name {
    font-size: 0.9rem;
    color: #858796;
  }
`;
export const FileLabel = css`
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
export const Input = css`
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  background-color: #FFF;
  border: 1px solid #D1D3E2;
  border-radius: 0.35rem;
  outline: none;
  ${TransitionAll}
  &:focus { border-color: #4E73DF; }
`;
export const AddButton = css`
  ${FlexCenter}
  width: 100%;
  border: 1px dashed #B7B9CC;
  color: #5A5C69;
  padding: 1rem;
  border-radius: 0.35rem;
  font-weight: 600;
  gap: 0.5rem;
  ${TransitionAll}
  cursor: pointer;

  &:hover {
    background-color: #EAECF4;
    border-color: #858796;
  }
`;
export const TableWrapper = css`
  width: 100%;
  overflow-x: auto;
`;
export const Table = css`
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
    white-space: nowrap;
  }
`;
export const DeleteButton = css`
  ${InlineFlexCenter}
  background-color: transparent;
  border-radius: 0.25rem;
  border: none;
  color: #E74A3B;
  cursor: pointer;
  padding: 0.5rem;
  ${TransitionAll}
  &:hover { background-color: #FDEAEA; }
`;
export const ActionButton = css`
  ${FlexCenter}
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 0.35rem;
  ${TransitionAll}
  
  &:not(:disabled) {
    color: #202020;
    cursor: pointer;
  }
  &:not(:disabled):hover { background-color: #E3E6F0; }
`;
export const Badge = css`
  padding: 0.25rem 0.6rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  font-weight: bold;
  white-space: nowrap;
  ${InlineFlexCenter}
`;
export const RankBadge = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-weight: bold;
  ${InlineFlexCenter}
  font-size: 0.9rem;
  ${BoxShadow}
`;