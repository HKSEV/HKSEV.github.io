"use client";

import React, { useState } from "react";
import { FiSave, FiTrash2, FiPlus } from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
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

export default function FooterSetting() {
  const {openPopup, closePopup} = usePopup();
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
    clinicName: "",
    phone: "",
    email: "",
    locationUrl: ""
  });
  const [schedules, setSchedules] = useState<ScheduleData[]>([
    {
      id: 1,
      department: "성형외과",
      weekday: "AM 09:00 - PM 06:00",
      night: "",
      weekend: "PM 09:00 - PM 03:00"
    },
    {
      id: 2,
      department: "스킨케어",
      weekday: "AM 09:00 - PM 06:00",
      night: "",
      weekend: "PM 09:00 - PM 03:00"
    }
  ]);
  const [familySites, setFamilySites] = useState<FamilySiteData[]>([
    { id: 1, name: "Breast Surgery Center", url: "#" },
    { id: 2, name: "Derm", url: "#" },
    { id: 3, name: "Lifting Center", url: "#" }
  ]);

  // 진료시간 수정 핸들러
  const handleScheduleChange = (
    id: number,
    field: keyof ScheduleData,
    value: string
  ) => {
    setSchedules(schedules.map(
      (sch) => sch.id === id ? {...sch, [field]: value} : sch
    ));
  };

  // 패밀리 사이트 추가 핸들러
  const handleAddFamilySite = () => {
    setFamilySites([...familySites, {id: Date.now(), name: "", url: ""}]);
  };

  // 패밀리 사이트 삭제 핸들러
  const handleRemoveFamilySite = (id: number) => {
    setFamilySites(familySites.filter(site => site.id !== id));
  };

  // 패밀리 사이트 정보 수정 핸들러 (사)
  const handleFamilySiteChange = (
    id: number,
    field: keyof FamilySiteData,
    value: string
  ) => {
    setFamilySites(familySites.map(
      (site) => site.id === id ? {...site, [field]: value} : site
    ));
  };

  // 최종 저장 핸들러
  const handleSave = () => {
    const payload = [companyInfo, schedules, familySites];
    console.log("DB에 저장될 푸터 데이터: ", payload);
    openPopup("저장 완료", "푸터 설정이 성공적으로 저장되었습니다.");
  };

  return (
    <S.SetFooterContainer>
      <S.SetFooterHeader>
        <S.SetFooterTitle>푸터(하단 영역) 관리</S.SetFooterTitle>
        <S.SetFooterSaveButton onClick={handleSave}>
          <FiSave size={18}/>&nbsp;설정 저장하기
        </S.SetFooterSaveButton>
      </S.SetFooterHeader>

      <S.SetFooterGrid>
        {/* 🏢 1. 병원 기본 정보 카드 */}
        <S.SetFooterLeftColumn>
          <S.SetFooterCard>
            <S.SetFooterCardHeader>
              <S.SetFooterCardTitle>병원 기본 정보</S.SetFooterCardTitle>
            </S.SetFooterCardHeader>
            <S.SetFooterCardBody>
              <S.SetFooterFormGroup>
                <S.SetFooterLabel>병원명 (타이틀)</S.SetFooterLabel>
                <S.SetFooterInput 
                type="text" 
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo(
                  {...companyInfo, name: e.target.value}
                )}/>
              </S.SetFooterFormGroup>
              <S.SetFooterFormGroup>
                <S.SetFooterLabel>상세 주소</S.SetFooterLabel>
                <S.SetFooterInput 
                type="text" 
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo(
                  {...companyInfo, address: e.target.value}
                )}/>
              </S.SetFooterFormGroup>
              <S.SetFooterFlexRow>
                <S.SetFooterFormGroup>
                  <S.SetFooterLabel>의료기관 명칭</S.SetFooterLabel>
                  <S.SetFooterInput 
                  type="text" 
                  value={companyInfo.clinicName}
                  onChange={(e) => setCompanyInfo(
                    {...companyInfo, clinicName: e.target.value}
                  )}/>
                </S.SetFooterFormGroup>
                <S.SetFooterFormGroup>
                  <S.SetFooterLabel>대표번호</S.SetFooterLabel>
                  <S.SetFooterInput 
                  type="text" 
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo(
                    {...companyInfo, phone: e.target.value}
                  )}/>
                </S.SetFooterFormGroup>
                <S.SetFooterFormGroup>
                  <S.SetFooterLabel>이메일</S.SetFooterLabel>
                  <S.SetFooterInput 
                  type="text" 
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo(
                    {...companyInfo, email: e.target.value}
                  )}/>
                </S.SetFooterFormGroup>
              </S.SetFooterFlexRow>
              <S.SetFooterFormGroup style={{ marginBottom: 0 }}>
                <S.SetFooterLabel>"오시는길 바로가기" 버튼 링크 URL</S.SetFooterLabel>
                <S.SetFooterInput 
                type="text" 
                value={companyInfo.locationUrl}
                onChange={(e) => setCompanyInfo(
                  {...companyInfo, locationUrl: e.target.value}
                )}/>
              </S.SetFooterFormGroup>
            </S.SetFooterCardBody>
          </S.SetFooterCard>
        </S.SetFooterLeftColumn>

        <S.SetFooterRightColumn>
          {/* ⏰ 2. 진료 시간 안내 카드 */}
          <S.SetFooterCard>
            <S.SetFooterCardHeader>
              <S.SetFooterCardTitle>
                진료 시간 안내 (CS CENTER)
              </S.SetFooterCardTitle>
            </S.SetFooterCardHeader>
            <S.SetFooterCardBody>
              {schedules.map((sch, index) => (
                <div key={sch.id} style={{ marginBottom: index === schedules.length - 1 ? 0 : "1.5rem", paddingBottom: index === schedules.length - 1 ? 0 : "1.5rem", borderBottom: index === schedules.length - 1 ? "none" : "1px dashed #e3e6f0" }}>
                  <S.SetFooterFormGroup>
                    <S.SetFooterLabel>구분명 (예: 성형외과, 스킨케어)</S.SetFooterLabel>
                    <S.SetFooterInput 
                    type="text" 
                    value={sch.department}
                    onChange={(e) => handleScheduleChange(
                      sch.id, "department", e.target.value
                    )}/>
                  </S.SetFooterFormGroup>
                  <S.SetFooterFlexRow>
                    <S.SetFooterFormGroup>
                      <S.SetFooterLabel>평일 시간</S.SetFooterLabel>
                      <S.SetFooterInput 
                      type="text" 
                      value={sch.weekday}
                      onChange={(e) => handleScheduleChange(
                        sch.id, "weekday", e.target.value
                      )}/>
                    </S.SetFooterFormGroup>
                    <S.SetFooterFormGroup>
                      <S.SetFooterLabel>야간 진료 (없으면 비워두기)</S.SetFooterLabel>
                      <S.SetFooterInput 
                      type="text" 
                      value={sch.night}
                      onChange={(e) => handleScheduleChange(
                        sch.id, "night", e.target.value
                      )}/>
                    </S.SetFooterFormGroup>
                    <S.SetFooterFormGroup>
                      <S.SetFooterLabel>토요일 시간</S.SetFooterLabel>
                      <S.SetFooterInput 
                        type="text" 
                        value={sch.weekend}
                        onChange={(e) => handleScheduleChange(
                          sch.id, "weekend", e.target.value
                        )}/>
                    </S.SetFooterFormGroup>
                  </S.SetFooterFlexRow>
                </div>
              ))}
            </S.SetFooterCardBody>
          </S.SetFooterCard>

          {/* 🔗 3. 패밀리 사이트 카드 */}
          <S.SetFooterCard>
            <S.SetFooterCardHeader>
              <S.SetFooterCardTitle>패밀리 사이트 설정</S.SetFooterCardTitle>
            </S.SetFooterCardHeader>
            <S.SetFooterCardBody>
              {familySites.map((site) => (
                <S.SetFooterFamilyRow key={site.id}>
                  <S.SetFooterInput 
                  type="text" 
                  placeholder="사이트명 (예: Derm)"
                  value={site.name}
                  onChange={(e) => handleFamilySiteChange(
                    site.id, "name", e.target.value
                  )}/>
                  <S.SetFooterInput 
                  type="text" 
                  placeholder="연결 URL (예: https://...)"
                  value={site.url}
                  onChange={(e) => handleFamilySiteChange(
                    site.id, "url", e.target.value
                  )}/>
                  <S.SetFooterDeleteButton
                  onClick={() => handleRemoveFamilySite(site.id)}>
                    <FiTrash2 size={18}/>
                  </S.SetFooterDeleteButton>
                </S.SetFooterFamilyRow>
              ))}
              <S.SetFooterAddButton onClick={handleAddFamilySite}>
                <FiPlus size={18}/>&nbsp;패밀리 사이트 추가
              </S.SetFooterAddButton>
            </S.SetFooterCardBody>
          </S.SetFooterCard>
        </S.SetFooterRightColumn>
      </S.SetFooterGrid>
    </S.SetFooterContainer>
  );
};
