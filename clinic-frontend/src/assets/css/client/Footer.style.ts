import styled from "styled-components";
import * as C from "../Common.style";

// Footer
export const FooterWrapper = styled.footer`
  background-color: #000;
  padding: 20px 15px 120px 15px;
  ${C.FlexBetween}
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
  color: #FFF;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;
export const FooterCsTitle = styled.div`
  font-size: 14px;
  color: #999;
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
  ${C.TransitionAll}
  white-space: nowrap;
  border-radius: 5px;

  &:hover {
    background-color: #333;
    color: #E0E0E0;
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
  background-color: #111;
  color: #FFF;
  font-size: 11px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 10px;
  letter-spacing: -0.5px;
`;