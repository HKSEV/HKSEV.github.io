"use client";

import React, { useState } from "react";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown } from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

interface CategoryData {
    id: number;
    title: string;
    imageUrl: string; // 실제로는 업로드된 파일의 경로 또는 미리보기 URL
    link: string;
};

export default function News() {
  const {openPopup, closePopup} = usePopup();
  // 🎯 상태 관리: 등록된 카테고리 아이콘 목록
  const [categories, setCategories] = useState<CategoryData[]>([
    {
      id: 1,
      title: "전체",
      imageUrl: "",
      link: "/all"
    },
    {
      id: 2,
      title: "눈",
      imageUrl: "",
      link: "/eye"
    },
    {
      id: 3,
      title: "코",
      imageUrl: "",
      link: "/nose"
    }
  ]);
  // 🎯 상태 관리: 새 카테고리 등록 폼
  const [newCategory, setNewCategory] = useState({ title: "", link: "" });
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // 이미지 첨부 및 썸네일 미리보기 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); // 로컬 썸네일 미리보기 생성
    };
  };

  // 카테고리 추가
  const handleAddCategory = () => {
    if (!newCategory.title) {
      openPopup("입력 오류", "카테고리 이름을 입력해주세요.");
      return;
    };
    setCategories([...categories, { 
      id: Date.now(), 
      title: newCategory.title, 
      imageUrl: previewUrl, 
      link: newCategory.link 
    }]);
    setNewCategory({ title: "", link: "" });
    setFileName("");
    setPreviewUrl("");
  };

  // 카테고리 삭제
  const handleDelete = (id: number) => {
    openPopup("확인", "해당 카테고리 아이콘을 삭제하시겠습니까?", () => {
      setCategories(categories.filter(c => c.id !== id));
    });
  };

  // 순서 변경 (위/아래)
  const moveCategory = (index: number, direction: "UP" | "DOWN") => {
    const newCategories = [...categories];
    if (direction === "UP" && index > 0)
      [newCategories[index - 1], newCategories[index]] =
      [newCategories[index], newCategories[index - 1]];
    else if (direction === "DOWN" && index < newCategories.length - 1)
      [newCategories[index + 1], newCategories[index]] =
      [newCategories[index], newCategories[index + 1]];
    setCategories(newCategories);
  };

  // 최종 저장
  const handleSave = () => {
    console.log("DB에 저장될 데이터:", categories);
    openPopup("저장 완료", "카테고리 설정이 성공적으로 저장되었습니다.");
  };

  return (
    <S.NewsContainer>
      <S.NewsHeader>
        <S.NewsTitle>원형 카테고리 아이콘 관리</S.NewsTitle>
        <S.NewsSaveButton onClick={handleSave}>
          <FiSave size={18}/>&nbsp;설정 저장하기
        </S.NewsSaveButton>
      </S.NewsHeader>

      <S.NewsGrid>
        {/* ⚙️ 1. 새 아이콘 등록 폼 */}
        <S.NewsLeftColumn>
          <S.NewsCard>
            <S.NewsCardHeader>
              <S.NewsCardTitle>새 카테고리 아이콘 등록</S.NewsCardTitle>
            </S.NewsCardHeader>
            <S.NewsCardBody>
              <S.NewsFormGroup>
                <S.NewsLabel>카테고리명 (예: 눈, 코, 가슴)</S.NewsLabel>
                <S.NewsInput 
                type="text" 
                placeholder="아이콘 아래에 표시될 텍스트" 
                value={newCategory.title}
                onChange={(e) => setNewCategory(
                  {...newCategory, title: e.target.value}
                )}/>
              </S.NewsFormGroup>

              <S.NewsFormGroup>
                <S.NewsLabel>원형 썸네일 이미지</S.NewsLabel>
                <S.NewsFileInputWrapper>
                  <S.NewsFileInput 
                  type="file" 
                  id="category-img" 
                  accept="image/*"
                  onChange={handleFileChange}/>
                  <S.NewsFileLabel htmlFor="category-img">
                    <FiImage/>&nbsp;이미지 선택
                  </S.NewsFileLabel>
                  <span className="file-name">
                    {fileName || "선택된 파일 없음"}
                  </span>
                </S.NewsFileInputWrapper>
                {/* 썸네일 미리보기 영역 */}
                {previewUrl && (
                  <S.NewsPreviewCircle>
                    <img src={previewUrl} alt="미리보기"/>
                  </S.NewsPreviewCircle>
                )}
              </S.NewsFormGroup>

              <S.NewsFormGroup>
                <S.NewsLabel>클릭 시 이동할 링크 URL</S.NewsLabel>
                <S.NewsInput 
                type="url" 
                placeholder="예: /category/eye"
                value={newCategory.link}
                onChange={(e) => setNewCategory(
                  {...newCategory, link: e.target.value}
                )}/>
              </S.NewsFormGroup>

              <S.NewsAddButton onClick={handleAddCategory}>
                <FiPlus size={18}/>&nbsp;리스트에 추가하기
              </S.NewsAddButton>
            </S.NewsCardBody>
          </S.NewsCard>
        </S.NewsLeftColumn>

        {/* 📋 2. 등록된 아이콘 리스트 */}
        <S.NewsRightColumn>
          <S.NewsCard style={{ height: "100%" }}>
            <S.NewsCardHeader>
                <S.NewsCardTitle>
                  현재 노출중인 아이콘 (총 {categories.length}개)
                </S.NewsCardTitle>
            </S.NewsCardHeader>
            <S.NewsTableWrapper>
              <S.NewsTable>
                <thead>
                  <tr>
                    <th>순서 변경</th>
                    <th>미리보기</th>
                    <th>카테고리명 / 링크</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, idx) => (
                    <tr key={cat.id}>
                      <td>
                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                          <S.NewsActionButton
                          onClick={() => moveCategory(idx, "UP")}
                          disabled={idx === 0}>
                            <FiArrowUp size={18}/>
                          </S.NewsActionButton>
                          <S.NewsActionButton
                          onClick={() => moveCategory(idx, "DOWN")}
                          disabled={idx === categories.length - 1}>
                            <FiArrowDown size={18}/>
                          </S.NewsActionButton>
                        </div>
                      </td>
                      <td>
                        <S.NewsThumbnail>
                          <img
                          src={cat.imageUrl ? cat.imageUrl : "https://placehold.co/55?text=No+Img"}
                          alt={cat.title ? cat.title : "No Img"}/>
                        </S.NewsThumbnail>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <strong>{cat.title}</strong>
                        <div style={{ fontSize: "0.8rem", color: "#858796" }}>
                          {cat.link}
                        </div>
                      </td>
                      <td>
                        <S.NewsDeleteButton
                        onClick={() => handleDelete(cat.id)}>
                          <FiTrash2 size={16} />
                        </S.NewsDeleteButton>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: "3rem 0" }}>
                        등록된 카테고리가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </S.NewsTable>
            </S.NewsTableWrapper>
          </S.NewsCard>
        </S.NewsRightColumn>
      </S.NewsGrid>
    </S.NewsContainer>
  );
};
