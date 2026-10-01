"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/Style.style";

interface CategoryData {
  id: number;
  name: string;
  img: string;
  link: string;
};

export default function CategoryNav() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/category");
        if (response.data.success) {
          const formatted = response.data.data.map((c: any) => ({
            id: c.CATEGORY_IDX,
            name: c.TITLE,
            img: `/images/${c.FILE_NAME}`, // 실제 이미지 경로
            link: c.LINK || "#"
          }));
          setCategories(formatted);
          
          // 처음 화면이 켜졌을 때 첫 번째 항목을 자동으로 활성화 (선택)
          if (formatted.length > 0)
            setActiveId(formatted[0].id);
        };
      } catch (err) {
        console.error("카테고리 로드 실패: ", err);
      };
    };
    fetchData();
  }, []);

  return (
    <S.NavContainer>
      {categories.map((category) => {
        const isActive = activeId === category.id;
        return (
          <S.CategoryItem
          key={category.id}
          $active={isActive}
          onClick={() => setActiveId(category.id)}>
            <S.ImageBox $active={isActive}>
            <img src={category.img} alt={category.name}/>
            {isActive && (
              <S.ActiveOverlay>
                <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#FFD700" /* 노란색 */
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>        
              </S.ActiveOverlay>
            )}
            </S.ImageBox>
            <S.CategoryText $active={isActive}>
              {category.name}
            </S.CategoryText>
          </S.CategoryItem>
        );
      })}
    </S.NavContainer>
  );
};
