"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Login.style";

export default function ChangePwPage() {
  const router = useRouter();
  const {openPopup, closePopup} = usePopup();
  const [userId, setUserId] = useState("");
  const [alertText, setAlertText] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value);

    try {
      const response = await fetch("http://127.0.0.1:4000/api/id-check", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({userId: value})
      });
      const result = await response.json();

      if (response.ok) {
        setAlertText("");
        setDisabled(false);
      } else {
        setAlertText(result.message || "존재하지 않는 ID입니다.");
        setDisabled(true);
      };
    } catch (err) {};
  };

  const handleGotoPass = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!userId) {
      openPopup("입력 오류", "아이디를 먼저 입력해주세요.");
      return;
    };

    try {
      const response = await fetch("http://127.0.0.1:4000/api/id-check", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({userId: userId})
      });
      const result = await response.json();

      if (response.ok)
        router.push(`/find/pass?userId=${userId}`);
      else
        openPopup("입력 오류", result.message || "존재하지 않는 ID입니다.");
    } catch (err) {
      console.error("아이디 체크 에러:", err);
      openPopup("서버 오류", "서버와 통신 중 오류가 발생했습니다.");
    };
  };
 
  return (
    <S.LoginWrapper>
      <S.LoginCard>
        <S.LoginHeader>
          <S.LoginPwTitle>비밀번호 변경</S.LoginPwTitle>
          <S.LoginDescription>
            계정 보호를 위해 기존 비밀번호와<br/>
            새롭게 사용할 비밀번호를 입력해주세요.
          </S.LoginDescription>
        </S.LoginHeader>

        <S.LoginForm onSubmit={handleGotoPass}>
          <S.LoginInput
          type="text"
          name="userId"
          placeholder="아이디 (User ID)"
          value={userId}
          onChange={handleChange}/>
          <S.LoginAlertText>{alertText}</S.LoginAlertText>
          <S.LoginButton
          type="submit"
          disabled={disabled}>
            본인인증 진행하기
          </S.LoginButton>
        </S.LoginForm>

        <S.LoginDivider/>

        <S.LoginLinkGroup>
          <S.LoginStyledLink href="/register/terms">
            아직 계정이 없으신가요? 회원가입
          </S.LoginStyledLink>
          <S.LoginStyledLink href="/admin">
            이미 계정이 있으신가요? 로그인
          </S.LoginStyledLink>
        </S.LoginLinkGroup>
      </S.LoginCard>
    </S.LoginWrapper>
  );
};
