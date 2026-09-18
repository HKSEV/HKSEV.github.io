"use client";

import React from "react";
import Link from "next/link";
import * as S from "@/assets/css/Style.style";
import GlobeIcon from "@/components/icons/GlobeIcon";
import UserIcon from "@/components/icons/UserIcon";

export default function Header() {
  return (
    <S.HeaderWrapper>
      <S.HeaderInner>
        {/* 로고 영역 */}
        <S.LogoGroup>
          <Link href="/">
            <S.Logo>Ahn's</S.Logo>
          </Link>
        </S.LogoGroup>

        {/* 메인 내비게이션 영역 */}
        <S.NavGroup>
          <S.NavItem>병원소개</S.NavItem>
          <S.NavItem $active>눈 성형</S.NavItem>
          <S.NavItem>코 성형</S.NavItem>
          <S.NavItem>동안 성형</S.NavItem>
          <S.NavItem>쁘띠 시술</S.NavItem>
          <S.NavItem>커뮤니티</S.NavItem>
        </S.NavGroup>

        {/* 유틸리티 영역 */}
        <S.UtilGroup>
          <S.DesktopOnly>
            <S.PhoneButton href="tel:02-932-2222">
              TEL.<span>02.932.2222</span>
            </S.PhoneButton>
            <S.CtaButton>상담예약</S.CtaButton>
            <S.IconButton aria-label="Language">
              <GlobeIcon/>
            </S.IconButton>
            <S.IconButton aria-label="My Page">
              <UserIcon/>
            </S.IconButton>
          </S.DesktopOnly>
          {/* 모바일 화면일때만 나타나는 요소들 */}
          <S.MobilePillButton>Men's</S.MobilePillButton>
          <S.MobilePillButton>Breast</S.MobilePillButton>
          <S.HamburgerButton aria-label="Mobile Menu">
            <span></span>
            <span></span>
            <span></span>
          </S.HamburgerButton>
        </S.UtilGroup>
      </S.HeaderInner>
    </S.HeaderWrapper>
  );
};
