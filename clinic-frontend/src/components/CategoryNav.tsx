"use client";

import React, { useState } from "react";
import * as S from "@/assets/css/Style.style";

const CATEGORY_LIST = [
  { id: "all", name: "전체", img: "./images/main/cate/cat_all.png" },
  { id: "eye", name: "눈", img: "./images/main/cate/cat_eye.png" },
  { id: "nose", name: "코", img: "./images/main/cate/cat_nose.png" },
  { id: "contour", name: "윤곽", img: "/images/main/cate/cat_contour.png" },
  { id: "breast", name: "가슴", img: "./images/main/cate/cat_breast.png" },
  { id: "lifting", name: "리프팅", img: "/images/main/cate/cat_lifting.png" },
  { id: "man", name: "남자", img: "./images/main/cate/cat_man.png" },
  { id: "body", name: "체형", img: "./images/main/cate/cat_body.png" },
];

export default function CategoryNav() {
  const [activeId, setActiveId] = useState("all");

  return (
    <S.NavContainer>
      {CATEGORY_LIST.map((category) => {
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
