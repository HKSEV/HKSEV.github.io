"use client";

import React from "react";
import { FiUserPlus, FiPhoneCall, FiSearch, FiAlertOctagon } from "react-icons/fi";
import * as S from "@/assets/css/Style.style";

export default function AdminPage() {
  return (
    <S.DashboardContainer>
      <S.DashboardPageTitle>대시보드 종합통계</S.DashboardPageTitle>

      <S.DashboardCardGrid>
        <S.DashboardSummaryCard $borderColor="#4E73DF">
          <S.DashboardCardInfo>
            <S.DashboardCardLabel $textColor="#4E73DF">
              회원가입 현황 (일일)
            </S.DashboardCardLabel>
            <S.DashboardCardMainValue>125명</S.DashboardCardMainValue>
            <S.DashboardCardSubGrid>
              <S.DashboardCardSubItem>
                <span>주간: </span><strong>840명</strong>
              </S.DashboardCardSubItem>
              <S.DashboardCardSubItem>
                <span>월간: </span><strong>3,210명</strong>
              </S.DashboardCardSubItem>
            </S.DashboardCardSubGrid>
          </S.DashboardCardInfo>
          <S.DashboardCardIconWrapper>
            <FiUserPlus size={36} color="#DDDFEB"/>
          </S.DashboardCardIconWrapper>
        </S.DashboardSummaryCard>

        {/* 2. 퀵 상담 및 매출 전환 카드 */}
        <S.DashboardSummaryCard $borderColor="#1CC88A">
          <S.DashboardCardInfo>
            <S.DashboardCardLabel $textColor="#1CC88A">
              일일 퀵상담률
            </S.DashboardCardLabel>
            <S.DashboardCardMainValue>45.2 %</S.DashboardCardMainValue>
            <S.DashboardCardSubGrid>
              <S.DashboardCardSubItem style={{ width: '100%' }}>
                <span>상담 후 매출 전환율: </span><strong>18.5 %</strong>
              </S.DashboardCardSubItem>
            </S.DashboardCardSubGrid>
          </S.DashboardCardInfo>
          <S.DashboardCardIconWrapper>
            <FiPhoneCall size={36} color="#DDDFEB"/>
          </S.DashboardCardIconWrapper>
        </S.DashboardSummaryCard>

        {/* 3. 유입 채널 통계 카드 */}
        <S.DashboardSummaryCard $borderColor="#36B9CC">
          <S.DashboardCardInfo>
            <S.DashboardCardLabel $textColor="#36B9CC">
              총 유입량 (일일)
            </S.DashboardCardLabel>
            <S.DashboardCardMainValue>8,420 건</S.DashboardCardMainValue>
            <S.DashboardCardSubGrid>
              <S.DashboardCardSubItem>
                <span>네이버: </span><strong>5,100 건</strong>
              </S.DashboardCardSubItem>
              <S.DashboardCardSubItem>
                <span>기타(구글 등): </span><strong>3,320 건</strong>
              </S.DashboardCardSubItem>
            </S.DashboardCardSubGrid>
          </S.DashboardCardInfo>
          <S.DashboardCardIconWrapper>
            <FiSearch size={36} color="#DDDFEB"/>
          </S.DashboardCardIconWrapper>
        </S.DashboardSummaryCard>

        {/* 4. 클레임률 통계 카드 (일/주/월) */}
        <S.DashboardSummaryCard $borderColor="#E74A3B">
          <S.DashboardCardInfo>
            <S.DashboardCardLabel $textColor="#E74A3B">
              클레임률 (일간)
            </S.DashboardCardLabel>
            <S.DashboardCardMainValue>1.2 %</S.DashboardCardMainValue>
            <S.DashboardCardSubGrid>
              <S.DashboardCardSubItem>
                <span>주간: </span><strong>1.5 %</strong>
              </S.DashboardCardSubItem>
              <S.DashboardCardSubItem>
                <span>월간: </span><strong>1.1 %</strong>
              </S.DashboardCardSubItem>
            </S.DashboardCardSubGrid>
          </S.DashboardCardInfo>
          <S.DashboardCardIconWrapper>
            <FiAlertOctagon size={36} color="#DDDFEB"/>
          </S.DashboardCardIconWrapper>
        </S.DashboardSummaryCard>
      </S.DashboardCardGrid>

      {/* 하단 상세 차트나 테이블이 들어갈 빈 공간 */}
      <S.DashboardBottomSection>
        <div>
          추후 이곳에 상세 그래프(Chart.js 등)나 최근 접수된 상담 목록 테이블이 배치될 수 있습니다.
        </div>
      </S.DashboardBottomSection>
    </S.DashboardContainer>
  );
};
