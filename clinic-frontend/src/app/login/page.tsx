"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Login.style";

export default function LoginPage() {
  const router = useRouter();
  const {openPopup, closePopup} = usePopup();
  const [formData, setFormData] = useState({
    userId: "", userPw: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId || !formData.userPw) {
      openPopup("입력 오류", "아이디와 비밀번호를 모두 입력해주세요.");
      return;
    };

    try {
      const response = await fetch("http://127.0.0.1:4000/api/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (response.ok)
        openPopup("완료", "로그인 성공", () => {
          if (Number(result.isAdmin) === 1) {
            // 쿠키 만들기
            document.cookie = "admin_token=true; path=/; max-age=86400;";
            router.push("/admin");
          } else
            router.push("/");
        });
      else
        openPopup("로그인 실패", result.message || "로그인에 실패했습니다.");
    } catch (err) {
      console.error("로그인 에러: ", err);
      openPopup("서버 오류", "서버와 통신 중 오류가 발생했습니다.");
    };
  };

  return (
    <S.LoginWrapper>
      <S.LoginCard>
        <S.LoginHeader>
          <S.LoginTitle>Welcome Back!</S.LoginTitle>
        </S.LoginHeader>

        <S.LoginForm onSubmit={handleLogin}>
          <S.LoginInput 
          type="text" 
          name="userId"
          placeholder="Enter User ID..." 
          value={formData.userId}
          onChange={handleChange}/>
          <S.LoginInput 
          type="password" 
          name="userPw"
          placeholder="Password" 
          value={formData.userPw}
          onChange={handleChange}/>
          <S.LoginCheckboxGroup>
            <S.LoginCheckboxInput type="checkbox" id="customCheck"/>
            <S.LoginCheckboxLabel htmlFor="customCheck">
              Remember Me
            </S.LoginCheckboxLabel>
          </S.LoginCheckboxGroup>
          <S.LoginButton type="submit">
            Login
          </S.LoginButton>
        </S.LoginForm>

        <S.LoginDivider/>

        <S.LoginLinkGroup>
          <S.LoginStyledLink href="/find">
            Forgot Password?
          </S.LoginStyledLink>
          <S.LoginStyledLink href="/register/terms">
              Create an Account!
          </S.LoginStyledLink>
        </S.LoginLinkGroup>
      </S.LoginCard>
    </S.LoginWrapper>
  );
};
