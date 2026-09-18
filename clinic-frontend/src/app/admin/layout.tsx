"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    FiMessageSquare, 
    FiFeather, 
    FiCompass, 
    FiLayers, 
    FiRadio, 
    FiCamera, 
    FiAward, 
    FiVideo, 
    FiShield, 
    FiLayout, 
    FiUsers, 
    FiClipboard,
    FiLogOut
} from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

export default function AdminLayout({children}:{children: React.ReactNode}) {
  const router = useRouter();
  const {openPopup, closePopup} = usePopup();
  // 사이드바 상태관리
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogoutClick = () => {
    openPopup("로그아웃", "로그아웃 하시겠습니까?", () => {
      document.cookie = "admin_token=true; path=/; max-age=0;";
      router.push("/login");
    });
  };

  return (
    <S.AdminContainer>
      {/* 좌측 사이드바 */}
      <S.AdminSideBar $isCollapsed={isCollapsed}>
        <S.AdminSideBarBrand
        onClick={() => router.push("/admin")}
        $isCollapsed={isCollapsed}>
          {isCollapsed ? "ADMIN" : "ADMIN PANNEL"}
        </S.AdminSideBarBrand>
        <S.AdminNavItem
        onClick={() => router.push("/admin/dashboard")}
        $isCollapsed={isCollapsed}>
          <span></span>{!isCollapsed && <span>대시보드</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/consultation")}
        $isCollapsed={isCollapsed}>
          <FiMessageSquare size={20}/>
          {!isCollapsed && <span>상담신청관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/tone")}
        $isCollapsed={isCollapsed}>
          <FiFeather size={20}/>
          {!isCollapsed && <span>톤앤매너관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/nav")}
        $isCollapsed={isCollapsed}>
          <FiCompass size={20}/>
          {!isCollapsed && <span>내비게이션관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/pop")}
        $isCollapsed={isCollapsed}>
          <FiLayers size={20}/>
          {!isCollapsed && <span>팝업관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/news")}
        $isCollapsed={isCollapsed}>
          <FiRadio size={20}/>
          {!isCollapsed && <span>뉴스티커관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/self")}
        $isCollapsed={isCollapsed}>
          <FiCamera size={20}/>
          {!isCollapsed && <span>셀피관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/event")}
        $isCollapsed={isCollapsed}>
          <FiAward size={20}/>
          {!isCollapsed && <span>이벤트랭킹관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/vlog")}
        $isCollapsed={isCollapsed}>
          <FiVideo size={20}/>
          {!isCollapsed && <span>vlog관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/safety")}
        $isCollapsed={isCollapsed}>
          <FiShield size={20}/>
          {!isCollapsed && <span>안전마취관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/footer")}
        $isCollapsed={isCollapsed}>
          <FiLayout size={20}/>
          {!isCollapsed && <span>푸터관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/users")}
        $isCollapsed={isCollapsed}>
          <FiUsers size={20}/>
          {!isCollapsed && <span>회원관리</span>}
        </S.AdminNavItem>
        <S.AdminNavItem
        onClick={() => router.push("/admin/boards")}
        $isCollapsed={isCollapsed}>
          <FiClipboard size={20}/>
          {!isCollapsed && <span>게시판관리</span>}
        </S.AdminNavItem>
        <S.AdminSideBarTogglerWrapper>
          <S.AdminSideBarToggler
          onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? "▶" : "◀"}
          </S.AdminSideBarToggler>
        </S.AdminSideBarTogglerWrapper>
      </S.AdminSideBar>

      <S.AdminContentWrapper>
        <S.AdminTopBar>
          <S.AdminTopBarBrand>성형외과 관리 시스템</S.AdminTopBarBrand>
          <S.AdminTopBarRight>
            <S.AdminTopBarUser>최고 관리자님</S.AdminTopBarUser>
            <S.AdminLogoutBtn onClick={handleLogoutClick}>
              <FiLogOut size={16}/>로그아웃
            </S.AdminLogoutBtn>
          </S.AdminTopBarRight>
        </S.AdminTopBar>
        <S.AdminMain>
          {children}
        </S.AdminMain>
      </S.AdminContentWrapper>
    </S.AdminContainer>
  );
};
