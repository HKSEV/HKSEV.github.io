"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import * as S from "@/assets/css/Style.style";

interface ScheduleData {
  id: number;
  department: string;
  weekday: string;
  night: string;
  weekend: string;
};

interface FamilySiteData {
  id: number;
  name: string;
  url: string;
};

export default function Footer() {
  const router = useRouter();
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    clinicName: "",
    phone: "",
    email: "",
    locationUrl: ""
  });
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [familySites, setFamilySites] = useState<FamilySiteData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/footer");
        if (response.data.success && response.data.data) {
          const {companyInfo, schedules, familySites} = response.data.data;
          setCompanyInfo(companyInfo);
          setSchedules(schedules);
          setFamilySites(familySites);
        };
      } catch (err) {
        console.error("푸터 데이터 로드 실패: ", err);
      } finally {
        setIsLoading(false);
      };
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <S.FooterWrapper>
        <S.FooterInner>
          로딩중...
        </S.FooterInner>
      </S.FooterWrapper>
    );

  return (
    <S.FooterWrapper>
      <S.FooterInner>
        {/* cs번호 진료시간 오시는길 */}
        <S.FooterTop>
          <S.FooterCs>
            <S.FooterPhone>
              {companyInfo.phone || "02. 000. 0000"}
            </S.FooterPhone>
            <S.FooterCsTitle>CS CENTER</S.FooterCsTitle>
          </S.FooterCs>
          <S.FooterScheduleWrap>
            {schedules.map((sch) => (
              <S.FooterScheduleBlock key={sch.id}>
                <S.FooterScheduleTitle>
                  {sch.department}
                </S.FooterScheduleTitle>
                <S.FooterScheduleText>
                  평일: {sch.weekday}
                </S.FooterScheduleText>
                <S.FooterScheduleText>
                  야간: {sch.night}
                </S.FooterScheduleText>
                <S.FooterScheduleText>
                  토요일: {sch.weekend}
                </S.FooterScheduleText>
              </S.FooterScheduleBlock>
            ))}
          </S.FooterScheduleWrap>
          <S.FooterLocationBtn
          onClick={() => router.push(companyInfo.locationUrl)}>
            오시는길 바로가기
          </S.FooterLocationBtn>
        </S.FooterTop>

        <S.FooterBottom>
          <S.FooterCompany>
            <S.FooterCompanyName>
              {companyInfo.name || "안과"}
            </S.FooterCompanyName>
            <S.FooterInfoText>
              {companyInfo.address || "201호"}
              <br/>
              ({companyInfo.clinicName} 건물 주차장 이용)
            </S.FooterInfoText>
            <S.FooterInfoText>
              의료기관 명칭: {companyInfo.clinicName}
              <br/>
              대표번호: {companyInfo.phone || "02. 000. 0000"}
              <br/>
              E-mail: {companyInfo.email}
            </S.FooterInfoText>
          </S.FooterCompany>
          <S.FooterBottomRight>
            <S.FooterPolicyWrap>
              <S.FooterPolicyBtn>실비보험 안내</S.FooterPolicyBtn>
              <S.FooterPolicyBtn>비급여 진료비용 안내</S.FooterPolicyBtn>
            </S.FooterPolicyWrap>
            <div className="">
              <S.FooterFamilyTitle>Family</S.FooterFamilyTitle>
              <S.FooterFamilyLogos>
                {familySites.map((site) => (
                  <Link
                  key={site.id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-placeholder">
                    {site.name}
                  </Link>
                ))}
              </S.FooterFamilyLogos>
            </div>
          </S.FooterBottomRight>
        </S.FooterBottom>
      </S.FooterInner>

      <S.FloatingMenu>
        <S.FabItem>
          <S.FabIcon $bgColor="#FEE500">TALK</S.FabIcon>
          <S.FabText>빠른 상담</S.FabText>
        </S.FabItem>
        <S.FabItem>
          <S.FabIcon $bgColor="#3B82F6">
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
            </svg>
          </S.FabIcon>
          <S.FabText>전화 상담</S.FabText>
        </S.FabItem>
      </S.FloatingMenu>
    </S.FooterWrapper>
  );
};
