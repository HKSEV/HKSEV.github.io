"use client";

import React, { useState } from "react";
import { FiTrash2, FiSearch, FiCheck } from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

// 임시 데이터 인터페이스
interface ConsultData {
  id: number;
  name: string;
  phone: string;
  category: string;
  regDate: string;
  status: "대기중" | "상담완료";
};

export default function Conultation() {
  const {openPopup, closePopup} = usePopup();
  const [consultList, setConsultList] = useState<ConsultData[]>([
    {
      id: 1,
      name: "홍길동",
      phone: "010-1234-5678",
      category: "눈성형",
      regDate: "2026-09-21 14:30",
      status: "대기중"
    },
    {
      id: 2,
      name: "김철수",
      phone: "010-9876-5432",
      category: "코성형",
      regDate: "2026-09-21 10:15",
      status: "상담완료"
    },
    {
      id: 3,
      name: "이영희",
      phone: "010-5555-4444",
      category: "안티에이징",
      regDate: "2026-09-20 16:45",
      status: "대기중"
    },
  ]);

  // 변경
  const toggleStatus = (id: number) => {
    setConsultList(consultList.map(item => 
      item.id === id
      ? {...item, status: item.status === "대기중" ? "상담완료" : "대기중"}
      : item
    ));
  };

  // 삭제
  const handleDelete = (id: number) => {
    openPopup("확인", "정말 이 상담 내역을 삭제하시겠습니까?", () => {
      setConsultList(consultList.filter(item => item.id !== id));
    });
  };
  
  return (
    <S.ConsultContainer>
      <S.ConsultHeader>
          <S.ConsultTitle>상담신청 관리</S.ConsultTitle>
      </S.ConsultHeader>

      {/* 🎯 검색 및 필터 영역 */}
      <S.ConsultFilterCard>
        <S.ConsultInputGroup>
          <S.ConsultInput type="text" placeholder="이름 또는 연락처 검색" />
          <S.ConsultSearchButton>
            <FiSearch size={16}/> 검색
          </S.ConsultSearchButton>
        </S.ConsultInputGroup>
      </S.ConsultFilterCard>

      {/* 🎯 상담 내역 데이터 테이블 */}
      <S.ConsultTableCard>
        <S.ConsultCardHeader>
          <S.ConsultCardTitle>빠른 상담신청 접수 내역</S.ConsultCardTitle>
        </S.ConsultCardHeader>
          
        <S.ConsultTableWrapper>
          <S.ConsultTable>
            <thead>
              <tr>
                <th>No.</th>
                <th>이름</th>
                <th>연락처</th>
                <th>상담분야</th>
                <th>신청일시</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {consultList.map((item, idx) => (
                <tr key={item.id}>
                  <td>{consultList.length - idx}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.phone}</td>
                  <td>{item.category}</td>
                  <td>{item.regDate}</td>
                  <td>
                      <S.ConsultStatusBadge 
                      $status={item.status} 
                      onClick={() => toggleStatus(item.id)}>
                        {item.status === "상담완료" && <FiCheck size={12}/>}
                        {item.status}
                      </S.ConsultStatusBadge>
                  </td>
                  <td>
                    <S.ConsultDeleteButton onClick={() => handleDelete(item.id)}>
                      <FiTrash2 size={16}/>
                    </S.ConsultDeleteButton>
                  </td>
                </tr>
              ))}
              {consultList.length === 0 && (
                <tr>
                  <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "3rem" }}>
                    접수된 상담 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </S.ConsultTable>
        </S.ConsultTableWrapper>
      </S.ConsultTableCard>
    </S.ConsultContainer>
  );
};
