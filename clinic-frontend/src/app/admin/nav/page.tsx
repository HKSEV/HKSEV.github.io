"use client";

import React, { useState } from "react";
import { FiSave, FiPlus, FiTrash2, FiImage, FiType } from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

interface MenuItem {
  id: number;
  name: string;
  url: string;
}

export default function Nav() {
  const {openPopup, closePopup} = usePopup();
  const [logoType, setLogoType] = useState<"TEXT"|"IMAGE">("TEXT");
  const [logoText, setLogoText] = useState<string>("성형외과 로고");
  const [logoFileName, setLogoFileName] = useState<string>("");
  const [menus, setMenus] = useState<MenuItem[]>([
    {id: 1, name: "병원소개", url: "/"},
    {id: 2, name: "눈 성형", url: "/"},
    {id: 3, name: "코 성형", url: "/"},
    {id: 4, name: "동안 성형", url: "/"},
    {id: 5, name: "쁘띠 시술", url: "/"},
    {id: 6, name: "커뮤니티", url: "/"},
  ]); // 시안과 동일하게 설정

  // 로고 이미지 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length)
      setLogoFileName(e.target.files[0].name);
  };

  // 추가 삭제 변경 핸들러
  const handleAddMenu = () => {
    setMenus([...menus, {id: Date.now(), name: "", url: "/"}]);
  };
  const handleRemoveMenu = (id: number) => {
    setMenus(menus.filter(menu => menu.id !== id));
  };
  const handleChangeMenu = (
    id: number, field: keyof MenuItem, value: string
  ) => {
    setMenus(menus.map(menu => menu.id === id ? (
      {...menu, [field]: value}
    ) : menu));
  };
  const handleSave = () => {
    const payload = {
      logo: {
        type: logoType,
        text: logoType === "TEXT" ? logoText : null,
        fileName: logoType === "IMAGE" ? logoFileName : null,
      },
      menus: menus
    };
    console.log("DB에 저장될 데이터: ", payload);
    openPopup("저장완료", "내비게이션 설정이 성공적으로 저장되었습니다.");
  };

  return (
    <S.SetNavContainer>
      <S.SetNavHeader>
        <S.SetNavTitle>내비게이션 관리</S.SetNavTitle>
        <S.SetNavSaveButton onClick={handleSave}>
          <FiSave size={18}/>설정 저장하기
        </S.SetNavSaveButton>
      </S.SetNavHeader>

      <S.SetNavGrid>
        <S.SetNavCard>
          <S.SetNavCardHeader>
            <S.SetNavCardTitle>상단 로고 설정</S.SetNavCardTitle>
          </S.SetNavCardHeader>
          <S.SetNavCardBody>
            <p>웹사이트 최상단에 표시될 로고의 형태를 선택하세요.</p>
            <S.SetNavRadioGroup>
              <S.SetNavRadioLabel
              $isActive={logoType === "TEXT"}
              onClick={() => setLogoType("TEXT")}>
                <FiType size={18}/>텍스트 로고
              </S.SetNavRadioLabel>
              <S.SetNavRadioLabel
              $isActive={logoType === "IMAGE"}
              onClick={() => setLogoType("IMAGE")}>
                <FiImage size={18}/>이미지 로고
              </S.SetNavRadioLabel>
            </S.SetNavRadioGroup>
            {logoType === "TEXT" ? (
              <S.SetNavInputWrapper>
                <S.SetNavLabel>텍스트 입력</S.SetNavLabel>
                <S.SetNavInput
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="예:안효범성형외과"/>
              </S.SetNavInputWrapper>
            ) : (
              <S.SetNavFileInputWrapper>
                <S.SetNavLabel>이미지 파일 등록</S.SetNavLabel>
                <S.SetNavFileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="logo-upload"/>
                <S.SetNavFileLabel htmlFor="logo-upload">
                  파일 선택
                </S.SetNavFileLabel>
                <span className="file-name">
                  {logoFileName || "선택된 파일이 없습니다."}
                </span>
              </S.SetNavFileInputWrapper>
            )}
          </S.SetNavCardBody>
        </S.SetNavCard>

        <S.SetNavCard>
          <S.SetNavCardHeader>
            <S.SetNavCardTitle>
              카테고리 및 URL 설정
            </S.SetNavCardTitle>
          </S.SetNavCardHeader>
          <S.SetNavCardBody>
            <p>사용자가 클릭할 내비게이션 메뉴 이름과 이동할 주소를 입력하세요.</p>
            <S.SetNavMenuList>
              {menus.map((menu, idx) => (
                <S.SetNavMenuItem key={menu.id}>
                  <div className="menu-number">
                    {idx + 1}
                  </div>
                  <S.SetNavInput
                  type="text"
                  placeholder="메뉴명(예:시술안내)"
                  value={menu.name}
                  onChange={(e) => handleChangeMenu(menu.id, "name", e.target.value)}/>
                  <S.SetNavInput
                  type="url"
                  placeholder="url(/treatment)"
                  value={menu.url}
                  onChange={(e) => handleChangeMenu(menu.id, "url", e.target.value)}/>
                  <S.SetNavDeleteButton
                  onClick={() => handleRemoveMenu(menu.id)}>
                    <FiTrash2 size={18}/>
                  </S.SetNavDeleteButton>
                </S.SetNavMenuItem>
              ))}
            </S.SetNavMenuList>
            <S.SetNavAddButton onClick={handleAddMenu}>
              <FiPlus size={18}/>새 카테고리 추가
            </S.SetNavAddButton>
          </S.SetNavCardBody>
        </S.SetNavCard>
      </S.SetNavGrid>
    </S.SetNavContainer>
  );
};
