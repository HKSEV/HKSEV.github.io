import styled from "styled-components";
import Link from "next/link";
import * as C from "./Common.style";

export const LoginWrapper = styled.div`
  ${C.FlexCenter}
  background-color: #4E73DF;
  ${C.LinearGradient}
  background-size: cover;
  min-height: 100vh;
  padding: 1.4rem;
  )};
`;
export const LoginCard = styled.div`
  background-color: #FFF;
  border: none;
  border-radius: 0.35rem;
  ${C.BoxShadow}
  width: 100%;
  max-width: 450px;
  padding: 3rem;
`;
export const LoginHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;
export const LoginTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 400;
  color: #3A3B45;
  margin: 0;
`;
export const LoginPwTitle = styled.h6`
  font-size: 1.5rem;
  color: #111;
`;
export const LoginDescription = styled.p`
  font-size: 0.875rem;
  color: #858796;
  margin-bottom: 0.5rem;
`;
export const LoginForm = styled.form`
  ${C.FlexColumn}
  gap: 1rem;
`;
export const LoginInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 0.8rem;
  border: 1px solid #D1D3E2;
  border-radius: 10rem;
  color: #6E707E;
  outline: none;
  ${C.TransitionAll}

  &:focus {
    border-color: #BAC8F3;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }
`;
export const LoginCheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;
export const LoginCheckboxInput = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
`;
export const LoginCheckboxLabel = styled.label`
  font-size: 0.8rem;
  color: #858796;
  cursor: pointer;
`;
export const LoginButton = styled.button`
  ${C.ButtonBasic}
  ${C.BlueButtonTheme}
  ${C.TransitionAll}
  margin-top: 10px;

  &:disabled {
    background-color: #B7B9C1;
    border-color: #B7B9C1;
    color: #FFF;
    cursor: default;
    opacity: 0.7;
  }
`;
export const LoginDivider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #E3E6F0;
`;
export const LoginLinkGroup = styled.div`
  text-align: center;
  ${C.FlexColumn}
  gap: 0.5rem;
`;
export const LoginStyledLink = styled(Link)`
  font-size: 0.8rem;
  color: #4E73DF;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #224ABE;
  }
`;
export const LoginAlertText = styled.small`
  position: relative;
  ${C.TransitionAll}
`;
