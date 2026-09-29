"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import * as S from "@/assets/css/Style.style";
import GlobeIcon from "@/components/icons/GlobeIcon";
import UserIcon from "@/components/icons/UserIcon";

interface MenuItem {
  id: number;
  name: string;
  url: string;
}

export default function Header() {
  const router = useRouter();
  const [logoType, setLogoType] = useState<"TEXT"|"IMAGE">("TEXT");
  const [logoText, setLogoText] = useState<string>("");
  const [logoFileName, setLogoFileName] = useState<string>("");
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/nav");
        if (response.data.success) {
          const dbData = response.data.data;
          setLogoType(dbData.LOGO_TYPE);
          setLogoText(dbData.LOGO_TEXT);
          setLogoFileName(dbData.LOGO_FILE);
          if (dbData.MENUS && dbData.MENUS !== "[]")
            setMenus(JSON.parse(dbData.MENUS));
          else
            setMenus([
              {id: 1, name: "병원소개", url: "/"},
              {id: 2, name: "눈 성형", url: "/"},
              {id: 3, name: "코 성형", url: "/"},
              {id: 4, name: "동안 성형", url: "/"},
              {id: 5, name: "쁘띠 시술", url: "/"},
              {id: 6, name: "커뮤니티", url: "/"},
            ]);
        };
      } catch (err) {
        console.error("설정 로드 실패: ", err);
      };
    };
    fetchData();
  }, []);

  return (
    <S.HeaderWrapper>
      <S.HeaderInner>
        {/* 로고 영역 */}
        <S.HeaderLogoGroup>
            {logoType === "IMAGE" ? (
              <S.HeaderLogoImg
              src={`/images/${logoFileName}`}
              alt={logoFileName}
              onClick={() => router.push("/")}/>
            ) : (
              <Link href="/">
                <S.HeaderLogo>{logoText}</S.HeaderLogo>
              </Link>
            )}
        </S.HeaderLogoGroup>

        {/* 메인 내비게이션 영역 */}
        <S.HeaderNavGroup>
          {menus.map((menu, idx) => (
            <Link href={menu.url || "/"} key={menu.id}>
              <S.HeaderNavItem $active={idx === 1}>
                {menu.name}
              </S.HeaderNavItem>
            </Link>
          ))}
        </S.HeaderNavGroup>

        {/* 유틸리티 영역 */}
        <S.HeaderUtilGroup>
          <S.HeaderDesktopOnly>
            <S.HeaderPhoneButton href="tel:02-932-2222">
              TEL.<span>02.932.2222</span>
            </S.HeaderPhoneButton>
            <S.HeaderCtaButton>상담예약</S.HeaderCtaButton>
            <S.HeaderIconButton aria-label="Language">
              <GlobeIcon/>
            </S.HeaderIconButton>
            <S.HeaderIconButton aria-label="My Page">
              <UserIcon/>
            </S.HeaderIconButton>
          </S.HeaderDesktopOnly>
          {/* 모바일 화면일때만 나타나는 요소들 */}
          <S.HeaderMobilePillButton>Men's</S.HeaderMobilePillButton>
          <S.HeaderMobilePillButton>Breast</S.HeaderMobilePillButton>
          <S.HeaderHamburgerButton aria-label="Mobile Menu">
            <span></span>
            <span></span>
            <span></span>
          </S.HeaderHamburgerButton>
        </S.HeaderUtilGroup>
      </S.HeaderInner>
    </S.HeaderWrapper>
  );
};
