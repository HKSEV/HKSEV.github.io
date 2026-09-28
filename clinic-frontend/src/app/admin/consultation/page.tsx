"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiSearch, FiCheck } from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

// 임시 데이터 인터페이스
interface ConsultData {
  ID: number;
  NAME: string;
  PHONE: string;
  DEPARTMENT: string;
  CREATED_AT: string;
  STATUS: "대기중" | "상담완료";
};

export default function Conultation() {
  const {openPopup, closePopup} = usePopup();
  const [consultList, setConsultList] = useState<ConsultData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/consult");
        if (response.data.success && response.data.data) {
          const list = response.data.data;
          setConsultList(list);
        };
      } catch (err) {
        console.error("상담 내역 로드 실패: ", err);
      };
    };
    fetchData();
  }, []);

  // 변경
  const toggleStatus = async (id: number) => {
    try {
      await axios.put(`/api/admin/consult/${id}/status`);
    } catch (err) {

    };
    setConsultList(consultList.map(item => 
      item.ID === id
      ? {...item, STATUS: item.STATUS === "대기중" ? "상담완료" : "대기중"}
      : item
    ));
  };

  // 삭제
  const handleDeleteClick = (id: number) => {
    if (!id)
      return;

    try {
      openPopup("확인", "정말 이 상담 내역을 삭제하시겠습니까?", async () => {
        await axios.delete(`/api/admin/consult/${id}`);
      });
    } catch (err) {

    };
  };

  // 💡 최신 Temporal API를 활용한 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    let dateTime;
    
    try {
      // 1. UTC 기준 ISO 문자열일 경우 (예: 2026-09-21T05:30:00Z) -> 한국 시간으로 변환
      dateTime = Temporal.Instant.from(dateString).toZonedDateTimeISO("Asia/Seoul");
    } catch (error) {
      // 2. 타임존 정보가 없는 일반 문자열일 경우 (예: 2026-09-21 14:30:00) 공백을 T로 치환 후 파싱
      const safeString = dateString.replace(" ", "T");
      dateTime = Temporal.PlainDateTime.from(safeString);
    }

    // Temporal 객체에서 직관적으로 년/월/일/시/분 추출 (달이 0부터 시작하지 않고 1부터 시작함!)
    const year = dateTime.year;
    const month = String(dateTime.month).padStart(2, "0");
    const day = String(dateTime.day).padStart(2, "0");
    const hour = String(dateTime.hour).padStart(2, "0");
    const minute = String(dateTime.minute).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  
  return (
    <S.SetConsultContainer>
      <S.SetConsultHeader>
          <S.SetConsultTitle>상담신청 관리</S.SetConsultTitle>
      </S.SetConsultHeader>

      {/* 🎯 검색 및 필터 영역 */}
      <S.SetConsultFilterCard>
        <S.SetConsultInputGroup>
          <S.SetConsultInput type="text" placeholder="이름 또는 연락처 검색"/>
          <S.SetConsultSearchButton>
            <FiSearch size={16}/>&nbsp;검색
          </S.SetConsultSearchButton>
        </S.SetConsultInputGroup>
      </S.SetConsultFilterCard>

      {/* 🎯 상담 내역 데이터 테이블 */}
      <S.SetConsultTableCard>
        <S.SetConsultCardHeader>
          <S.SetConsultCardTitle>
            빠른 상담신청 접수 내역
          </S.SetConsultCardTitle>
        </S.SetConsultCardHeader>
          
        <S.SetConsultTableWrapper>
          <S.SetConsultTable>
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
                <tr key={item.ID}>
                  <td>{consultList.length - idx}</td>
                  <td><strong>{item.NAME}</strong></td>
                  <td>{item.PHONE}</td>
                  <td>{item.DEPARTMENT}</td>
                  <td>{formatDate(item.CREATED_AT)}</td>
                  <td>
                      <S.SetConsultStatusBadge 
                      $status={item.STATUS} 
                      onClick={() => toggleStatus(item.ID)}>
                        {item.STATUS === "상담완료" && <><FiCheck size={12}/>&nbsp;</>}
                        {item.STATUS}
                      </S.SetConsultStatusBadge>
                  </td>
                  <td>
                    <S.SetConsultDeleteButton
                    onClick={() => handleDeleteClick(item.ID)}>
                      <FiTrash2 size={16}/>
                    </S.SetConsultDeleteButton>
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
          </S.SetConsultTable>
        </S.SetConsultTableWrapper>
      </S.SetConsultTableCard>
    </S.SetConsultContainer>
  );
};
