"use client";

import React from "react";
import { FiUserPlus, FiPhoneCall, FiSearch, FiAlertOctagon } from "react-icons/fi";
import * as S from "@/assets/css/Style.style";

export default function AdminPage() {
  return (
    <S.DashContainer>
      <S.DashTitle>대시보드 종합통계</S.DashTitle>

      <S.DashCardGrid>
        <S.DashSummaryCard $borderColor="#4E73DF">
          <S.DashCardInfo>
            <S.DashCardLabel $textColor="#4E73DF">
              회원가입 현황 (일일)
            </S.DashCardLabel>
            <S.DashCardMainValue>125명</S.DashCardMainValue>
            <S.DashCardSubGrid>
              <S.DashCardSubItem>
                <span>주간: </span><strong>840명</strong>
              </S.DashCardSubItem>
              <S.DashCardSubItem>
                <span>월간: </span><strong>3,210명</strong>
              </S.DashCardSubItem>
            </S.DashCardSubGrid>
          </S.DashCardInfo>
          <S.DashCardIconWrapper>
            <FiUserPlus size={36} color="#DDDFEB"/>
          </S.DashCardIconWrapper>
        </S.DashSummaryCard>

        {/* 2. 퀵 상담 및 매출 전환 카드 */}
        <S.DashSummaryCard $borderColor="#1CC88A">
          <S.DashCardInfo>
            <S.DashCardLabel $textColor="#1CC88A">
              일일 퀵상담률
            </S.DashCardLabel>
            <S.DashCardMainValue>45.2 %</S.DashCardMainValue>
            <S.DashCardSubGrid>
              <S.DashCardSubItem style={{ width: '100%' }}>
                <span>상담 후 매출 전환율: </span><strong>18.5 %</strong>
              </S.DashCardSubItem>
            </S.DashCardSubGrid>
          </S.DashCardInfo>
          <S.DashCardIconWrapper>
            <FiPhoneCall size={36} color="#DDDFEB"/>
          </S.DashCardIconWrapper>
        </S.DashSummaryCard>

        {/* 3. 유입 채널 통계 카드 */}
        <S.DashSummaryCard $borderColor="#36B9CC">
          <S.DashCardInfo>
            <S.DashCardLabel $textColor="#36B9CC">
              총 유입량 (일일)
            </S.DashCardLabel>
            <S.DashCardMainValue>8,420 건</S.DashCardMainValue>
            <S.DashCardSubGrid>
              <S.DashCardSubItem>
                <span>네이버: </span><strong>5,100 건</strong>
              </S.DashCardSubItem>
              <S.DashCardSubItem>
                <span>기타(구글 등): </span><strong>3,320 건</strong>
              </S.DashCardSubItem>
            </S.DashCardSubGrid>
          </S.DashCardInfo>
          <S.DashCardIconWrapper>
            <FiSearch size={36} color="#DDDFEB"/>
          </S.DashCardIconWrapper>
        </S.DashSummaryCard>

        {/* 4. 클레임률 통계 카드 (일/주/월) */}
        <S.DashSummaryCard $borderColor="#E74A3B">
          <S.DashCardInfo>
            <S.DashCardLabel $textColor="#E74A3B">
              클레임률 (일간)
            </S.DashCardLabel>
            <S.DashCardMainValue>1.2 %</S.DashCardMainValue>
            <S.DashCardSubGrid>
              <S.DashCardSubItem>
                <span>주간: </span><strong>1.5 %</strong>
              </S.DashCardSubItem>
              <S.DashCardSubItem>
                <span>월간: </span><strong>1.1 %</strong>
              </S.DashCardSubItem>
            </S.DashCardSubGrid>
          </S.DashCardInfo>
          <S.DashCardIconWrapper>
            <FiAlertOctagon size={36} color="#DDDFEB"/>
          </S.DashCardIconWrapper>
        </S.DashSummaryCard>
      </S.DashCardGrid>

      {/* 하단 상세 차트나 테이블이 들어갈 빈 공간 */}
      <S.DashBottomSection>
        <div>
          추후 이곳에 상세 그래프(Chart.js 등)나 최근 접수된 상담 목록 테이블이 배치될 수 있습니다.
        </div>
      </S.DashBottomSection>
    </S.DashContainer>
  );
};
