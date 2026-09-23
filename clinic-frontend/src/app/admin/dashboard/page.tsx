"use client";

import React from "react";
// 💡 직통 임포트(Direct Import)를 사용하여 스타일 깨짐 방지
import { 
  FiMessageSquare, FiUsers, FiStar, FiClipboard, 
  FiTrendingUp, FiPieChart, FiLayout, FiLayers, 
  FiImage, FiVideo, FiShield, FiSettings 
} from "react-icons/fi";
import * as S from "@/assets/css/Style.style";

export default function Dashboard() {
  // 임시 차트 데이터
  const monthlyData = [
    { month: "1월", value: 40 }, { month: "2월", value: 65 },
    { month: "3월", value: 45 }, { month: "4월", value: 80 },
    { month: "5월", value: 55 }, { month: "6월", value: 90 },
    { month: "7월", value: 75 }
  ];

  return (
    <S.DashContainer>
        <S.DashTitle>대시보드 (통합 관리 현황)</S.DashTitle>

        {/* 🎯 1. 최상단 요약 카드 (SB Admin 2 Style) */}
        <S.DashCardGrid>
          {/* 상담신청관리 */}
          <S.DashSummaryCard $borderColor="#4E73DF">
            <S.DashCardInfo>
                <div>
                  <S.DashCardLabel $textColor="#4E73DF">
                    신규 상담 신청 (월간)
                  </S.DashCardLabel>
                  <S.DashCardMainValue>150 건</S.DashCardMainValue>
                </div>
                <S.DashCardIconWrapper>
                  <FiMessageSquare size={32}/>
                </S.DashCardIconWrapper>
            </S.DashCardInfo>
          </S.DashSummaryCard>

          {/* 회원관리 */}
          <S.DashSummaryCard $borderColor="#1CC88A">
            <S.DashCardInfo>
              <div>
                <S.DashCardLabel $textColor="#1CC88A">
                  총 가입 회원
                </S.DashCardLabel>
                <S.DashCardMainValue>2,450 명</S.DashCardMainValue>
              </div>
              <S.DashCardIconWrapper>
                <FiUsers size={32}/>
              </S.DashCardIconWrapper>
            </S.DashCardInfo>
          </S.DashSummaryCard>

          {/* 이벤트랭킹관리 */}
          <S.DashSummaryCard $borderColor="#36B9CC">
            <S.DashCardInfo>
                <div>
                  <S.DashCardLabel $textColor="#36B9CC">
                    진행중인 이벤트
                  </S.DashCardLabel>
                  <S.DashCardMainValue>8 개</S.DashCardMainValue>
                </div>
                <S.DashCardIconWrapper>
                  <FiStar size={32}/>
                </S.DashCardIconWrapper>
            </S.DashCardInfo>
          </S.DashSummaryCard>

          {/* 게시판관리 */}
          <S.DashSummaryCard $borderColor="#F6C23E">
            <S.DashCardInfo>
              <div>
                <S.DashCardLabel $textColor="#F6C23E">
                  답변 대기 게시물
                </S.DashCardLabel>
                <S.DashCardMainValue>12 건</S.DashCardMainValue>
              </div>
              <S.DashCardIconWrapper>
                <FiClipboard size={32}/>
              </S.DashCardIconWrapper>
            </S.DashCardInfo>
          </S.DashSummaryCard>
        </S.DashCardGrid>

        {/* 🎯 2. 차트 영역 (그래프) */}
        <S.DashChartGrid>
            <S.DashChartCard>
                <S.DashChartHeader>
                    <S.DashChartTitle>
                      <FiTrendingUp/>&nbsp;월별 상담 신청 추이
                    </S.DashChartTitle>
                </S.DashChartHeader>
                <S.DashChartBody>
                    <S.DashBarChartContainer>
                        {monthlyData.map((data, idx) => (
                            <S.DashBarWrapper key={idx}>
                                <S.DashBarValue>{data.value}</S.DashBarValue>
                                <S.DashBar $height={`${data.value}%`} />
                                <S.DashBarLabel>{data.month}</S.DashBarLabel>
                                </S.DashBarWrapper>
                        ))}
                    </S.DashBarChartContainer>
                </S.DashChartBody>
            </S.DashChartCard>

            <S.DashChartCard>
                <S.DashChartHeader>
                    <S.DashChartTitle>
                      <FiPieChart/>&nbsp;시술 관심도 분포
                    </S.DashChartTitle>
                </S.DashChartHeader>
                <S.DashChartBody style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <S.DashDonutChart>
                        <div className="inner-circle">
                            <span>TOP 3</span>
                        </div>
                    </S.DashDonutChart>
                    <S.DashLegendContainer>
                        <S.DashLegendItem><span className="dot" style={{ background: "#4e73df" }}></span>눈성형 (45%)</S.DashLegendItem>
                        <S.DashLegendItem><span className="dot" style={{ background: "#1cc88a" }}></span>코성형 (30%)</S.DashLegendItem>
                        <S.DashLegendItem><span className="dot" style={{ background: "#36b9cc" }}></span>안티에이징 (25%)</S.DashLegendItem>
                    </S.DashLegendContainer>
                </S.DashChartBody>
            </S.DashChartCard>
        </S.DashChartGrid>

        {/* 🎯 3. 시스템 운영 현황 (나머지 메뉴들 요약) */}
        <S.DashSystemGrid>
            <S.DashSystemCard>
                <S.DashChartHeader>
                    <S.DashChartTitle>
                      <FiSettings/>&nbsp;프론트 UI / 설정 상태
                    </S.DashChartTitle>
                </S.DashChartHeader>
                <S.DashChartBody>
                    <S.DashStatusList>
                        <S.DashStatusItem>
                            <div className="label"><FiLayout /> 톤앤매너 관리</div>
                            <S.DashBadge $active={true}>정상동작</S.DashBadge>
                        </S.DashStatusItem>
                        <S.DashStatusItem>
                            <div className="label"><FiLayers /> 내비게이션 관리</div>
                            <S.DashBadge $active={true}>업데이트 완료</S.DashBadge>
                        </S.DashStatusItem>
                        <S.DashStatusItem>
                            <div className="label"><FiLayout /> 푸터 관리</div>
                            <S.DashBadge $active={true}>설정됨</S.DashBadge>
                        </S.DashStatusItem>
                    </S.DashStatusList>
                </S.DashChartBody>
            </S.DashSystemCard>

            <S.DashSystemCard>
                <S.DashChartHeader>
                    <S.DashChartTitle><FiImage /> 미디어 / 마케팅 모듈</S.DashChartTitle>
                </S.DashChartHeader>
                <S.DashChartBody>
                    <S.DashStatusList>
                        <S.DashStatusItem>
                            <div className="label"><FiImage /> 팝업 관리</div>
                            <S.DashBadge $active={true}>활성 2건</S.DashBadge>
                        </S.DashStatusItem>
                        <S.DashStatusItem>
                            <div className="label"><FiMessageSquare /> 뉴스티커 관리</div>
                            <S.DashBadge $active={false}>비활성</S.DashBadge>
                        </S.DashStatusItem>
                        <S.DashStatusItem>
                            <div className="label"><FiImage /> 셀피 관리</div>
                            <S.DashBadge $active={true}>신규 5건</S.DashBadge>
                        </S.DashStatusItem>
                    </S.DashStatusList>
                </S.DashChartBody>
            </S.DashSystemCard>

            <S.DashSystemCard>
                <S.DashChartHeader>
                    <S.DashChartTitle><FiVideo /> 비디오 / 특수 모듈</S.DashChartTitle>
                </S.DashChartHeader>
                <S.DashChartBody>
                    <S.DashStatusList>
                        <S.DashStatusItem>
                            <div className="label"><FiVideo /> VLOG 관리</div>
                            <S.DashBadge $active={true}>영상 12개</S.DashBadge>
                        </S.DashStatusItem>
                        <S.DashStatusItem>
                            <div className="label"><FiShield /> 안전마취 관리</div>
                            <S.DashBadge $active={true}>시스템 정상</S.DashBadge>
                        </S.DashStatusItem>
                    </S.DashStatusList>
                </S.DashChartBody>
            </S.DashSystemCard>
        </S.DashSystemGrid>
    </S.DashContainer>
  );
};
