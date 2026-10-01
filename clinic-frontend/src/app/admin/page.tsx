"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
// 💡 직통 임포트(Direct Import)를 사용하여 스타일 깨짐 방지
import { 
  FiMessageSquare, FiUsers, FiStar, FiClipboard, 
  FiTrendingUp, FiPieChart, FiLayout, FiLayers, 
  FiImage, FiVideo, FiShield, FiSettings 
} from "react-icons/fi";
import * as S from "@/assets/css/Style.style";

interface DashboardStats {
  consultationsCount: 0,
  membersCount: 0,
  eventsCount: 0,
  boardsCount: 0,
  popupsCount: 0,
  selfiesCount: 0,
  vlogsCount: 0,
  safetyCount: 0
};



export default function AdminPage() {
  const monthlyData = [
    { month: "1월", value: 40 }, { month: "2월", value: 65 },
    { month: "3월", value: 45 }, { month: "4월", value: 80 },
    { month: "5월", value: 55 }, { month: "6월", value: 90 },
    { month: "7월", value: 75 }
  ];
  const [stats, setStats] = useState<DashboardStats>({
    consultationsCount: 0,
    membersCount: 0,
    eventsCount: 0,
    boardsCount: 0,
    popupsCount: 0,
    selfiesCount: 0,
    vlogsCount: 0,
    safetyCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          consultRes, usersRes, eventsRes, boardsRes, 
          popupsRes, selfiesRes, vlogsRes, safetyRes
        ] = await Promise.all([
          axios.get("/api/admin/consult").catch(() => ({ data: { data: [] } })),
          axios.get("/api/admin/users").catch(() => ({ data: { pagination: { totalCount: 0 } } })),
          axios.get("/api/admin/event").catch(() => ({ data: { data: [] } })),
          axios.get("/api/admin/board").catch(() => ({ data: { data: [] } })),
          axios.get("/api/admin/popup").catch(() => ({ data: { popups: [] } })),
          axios.get("/api/admin/selfie").catch(() => ({ data: { data: [] } })),
          axios.get("/api/admin/vlog").catch(() => ({ data: { data: [] } })),
          axios.get("/api/admin/safety").catch(() => ({ data: { data: [] } }))
        ]);

        setStats({
          consultationsCount: consultRes.data.data?.length || 0,
          // 💡 users API는 pagination 구조 안에 totalCount가 있으므로 이를 활용!
          membersCount: usersRes.data.pagination?.totalCount || 0,
          eventsCount: eventsRes.data.data?.length || 0,
          boardsCount: boardsRes.data.data?.length || 0,
          // 💡 popups API는 응답 구조가 { popups: [...] } 임을 반영
          popupsCount: popupsRes.data.popups?.length || 0,
          selfiesCount: selfiesRes.data.data?.length || 0,
          vlogsCount: vlogsRes.data.data?.length || 0,
          safetyCount: safetyRes.data.data?.length || 0,
        });
      } catch (err) {
        console.error("대시보드 실제데이터 연동 실패: ", err);
      } finally {
        setIsLoading(false);
      };
    };
    fetchAllData();
  }, []);

  if (isLoading)
    return null;

  return (
    <S.DashContainer>
      <S.DashTitle>대시보드 (통합 관리 현황)</S.DashTitle>

      {/* 🎯 1. 최상단 요약 카드 (SB Admin 2 Style) */}
      <S.DashSummaryGrid>
        {/* 상담신청관리 */}
        <S.DashSummaryCard $borderColor="#4E73DF">
          <S.DashSummaryBody>
              <div>
                <S.DashSummaryTitle $textColor="#4E73DF">
                  신규 상담 신청 (누적)
                </S.DashSummaryTitle>
                <S.DashSummaryValue>
                  {stats.consultationsCount.toLocaleString()} 건
                </S.DashSummaryValue>
              </div>
              <S.DashSummaryIcon>
                <FiMessageSquare size={32}/>
              </S.DashSummaryIcon>
          </S.DashSummaryBody>
        </S.DashSummaryCard>

        {/* 회원관리 */}
        <S.DashSummaryCard $borderColor="#1CC88A">
          <S.DashSummaryBody>
            <div>
              <S.DashSummaryTitle $textColor="#1CC88A">
                총 가입 회원
              </S.DashSummaryTitle>
              <S.DashSummaryValue>
                {stats.membersCount.toLocaleString()} 명
              </S.DashSummaryValue>
            </div>
            <S.DashSummaryIcon>
              <FiUsers size={32}/>
            </S.DashSummaryIcon>
          </S.DashSummaryBody>
        </S.DashSummaryCard>

        {/* 이벤트랭킹관리 */}
        <S.DashSummaryCard $borderColor="#36B9CC">
          <S.DashSummaryBody>
              <div>
                <S.DashSummaryTitle $textColor="#36B9CC">
                  진행중인 이벤트
                </S.DashSummaryTitle>
                <S.DashSummaryValue>
                  {stats.eventsCount.toLocaleString()} 개
                </S.DashSummaryValue>
              </div>
              <S.DashSummaryIcon>
                <FiStar size={32}/>
              </S.DashSummaryIcon>
          </S.DashSummaryBody>
        </S.DashSummaryCard>

        {/* 게시판관리 */}
        <S.DashSummaryCard $borderColor="#F6C23E">
          <S.DashSummaryBody>
            <div>
              <S.DashSummaryTitle $textColor="#F6C23E">
                운영 중인 게시판
              </S.DashSummaryTitle>
              <S.DashSummaryValue>
                {stats.boardsCount.toLocaleString()} 개
              </S.DashSummaryValue>
            </div>
            <S.DashSummaryIcon>
              <FiClipboard size={32}/>
            </S.DashSummaryIcon>
          </S.DashSummaryBody>
        </S.DashSummaryCard>
      </S.DashSummaryGrid>

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
                  <S.DashBar $height={`${data.value}%`}/>
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
              <S.DashLegendItem>
                <span className="dot" style={{ background: "#4E73DF" }}/>
                눈성형 (45%)
              </S.DashLegendItem>
              <S.DashLegendItem>
                <span className="dot" style={{ background: "#1CC88A" }}/>
                코성형 (30%)
              </S.DashLegendItem>
              <S.DashLegendItem>
                <span className="dot" style={{ background: "#36B9CC" }}/>
                안티에이징 (25%)
              </S.DashLegendItem>
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
                <div className="label"><FiLayout/>&nbsp;톤앤매너 관리</div>
                <S.DashBadge $active={true}>정상동작</S.DashBadge>
              </S.DashStatusItem>
              <S.DashStatusItem>
                <div className="label"><FiLayers/>&nbsp;내비게이션 관리</div>
                <S.DashBadge $active={true}>업데이트 완료</S.DashBadge>
              </S.DashStatusItem>
              <S.DashStatusItem>
                <div className="label"><FiLayout/>&nbsp;푸터 관리</div>
                <S.DashBadge $active={true}>설정됨</S.DashBadge>
              </S.DashStatusItem>
            </S.DashStatusList>
          </S.DashChartBody>
        </S.DashSystemCard>

        <S.DashSystemCard>
          <S.DashChartHeader>
            <S.DashChartTitle>
              <FiImage/>&nbsp;미디어 / 마케팅 모듈
            </S.DashChartTitle>
          </S.DashChartHeader>
          <S.DashChartBody>
            <S.DashStatusList>
              <S.DashStatusItem>
                <div className="label">
                  <FiImage/>&nbsp;팝업 관리
                </div>
                <S.DashBadge $active={true}>
                  활성 {stats.popupsCount}건
                </S.DashBadge>
              </S.DashStatusItem>
              <S.DashStatusItem>
                <div className="label">
                  <FiMessageSquare/>&nbsp;뉴스티커 관리
                </div>
                <S.DashBadge $active={false}>비활성</S.DashBadge>
              </S.DashStatusItem>
              <S.DashStatusItem>
                <div className="label">
                  <FiImage/>&nbsp;셀피 관리
                </div>
                <S.DashBadge $active={true}>
                  총 {stats.selfiesCount}건 등록됨
                </S.DashBadge>
              </S.DashStatusItem>
            </S.DashStatusList>
          </S.DashChartBody>
        </S.DashSystemCard>

        <S.DashSystemCard>
          <S.DashChartHeader>
            <S.DashChartTitle>
              <FiVideo/>&nbsp;비디오 / 특수 모듈
            </S.DashChartTitle>
          </S.DashChartHeader>
          <S.DashChartBody>
            <S.DashStatusList>
              <S.DashStatusItem>
                <div className="label"><FiVideo/>&nbsp;VLOG 관리</div>
                <S.DashBadge $active={true}>
                  영상 {stats.vlogsCount}개
                </S.DashBadge>
              </S.DashStatusItem>
              <S.DashStatusItem>
                <div className="label">
                  <FiShield/>&nbsp;안전마취 관리
                </div>
                <S.DashBadge $active={stats.safetyCount > 0}>
                  {stats.safetyCount > 0
                  ? `등록 ${stats.safetyCount}건 (정상)`
                  : "등록 대기"}
                </S.DashBadge>
              </S.DashStatusItem>
            </S.DashStatusList>
          </S.DashChartBody>
        </S.DashSystemCard>
      </S.DashSystemGrid>
    </S.DashContainer>
  );
};
