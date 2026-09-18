"use client";

import React from "react";
import * as S from "@/assets/css/Style.style";

export default function Footer() {
  return (
    <S.FooterWrapper>
      <S.FooterInner>
        {/* cs번호 진료시간 오시는길 */}
        <S.FooterTop>
          <S.FooterCs>
            <S.FooterPhone>02. 932. 2222</S.FooterPhone>
            <S.FooterCsTitle>CS CENTER</S.FooterCsTitle>
          </S.FooterCs>
          <S.FooterScheduleWrap>
            <S.FooterScheduleBlock>
              <S.FooterScheduleTitle>성형외과</S.FooterScheduleTitle>
              <S.FooterScheduleText>평일: AM 09:00 - PM 06:00</S.FooterScheduleText>
              <S.FooterScheduleText>야간:</S.FooterScheduleText>
              <S.FooterScheduleText>토요일: AM 09:00 - PM 03:00</S.FooterScheduleText>
            </S.FooterScheduleBlock>
            <S.FooterScheduleBlock>
              <S.FooterScheduleTitle>성형외과</S.FooterScheduleTitle>
              <S.FooterScheduleText>평일: AM 09:00 - PM 06:00</S.FooterScheduleText>
              <S.FooterScheduleText>야간:</S.FooterScheduleText>
              <S.FooterScheduleText>토요일: AM 09:00 - PM 03:00</S.FooterScheduleText>
            </S.FooterScheduleBlock>
          </S.FooterScheduleWrap>
          <S.FooterLocationBtn>오시는길 바로가기</S.FooterLocationBtn>
        </S.FooterTop>

        <S.FooterBottom>
          <S.FooterCompany>
            <S.FooterCompanyName>안효범 안스성형외과</S.FooterCompanyName>
            <S.FooterInfoText>
              서울 노원구 노해로 460 (상계동) 2층 201호
              <br/>
              (안호범안스성형외과 건물 주차장 이용)
            </S.FooterInfoText>
            <S.FooterInfoText>
              의료기관 명칭: 안호범안스성형외과
              <br/>
              대표번호 02. 932. 2222
              <br/>
              E-mail: tt388wwt@gmail.com
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
                <div className="logo-placeholder">Breast Surgery Center</div>
                <div className="logo-placeholder">Derm</div>
                <div className="logo-placeholder">Lifting Center</div>
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
