"use client";

import React, { useState } from "react";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiImage,
  FiArrowUp,
  FiArrowDown
} from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

interface EventRakingData {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
};

export default function Event() {
  const {openPopup, closePopup} = usePopup();
  const [events, setEvents] = useState<EventRakingData[]>([
    {
      id: 1,
      title: "다다고성형",
      price: "149만원",
      imageUrl: "" },
    {
      id: 2,
      title: "다다고성형",
      price: "149만원",
      imageUrl: ""
    },
    {
      id: 3,
      title: "다다고성형",
      price: "149만원",
      imageUrl: ""
    },
    {
      id: 4,
      title: "다다고성형",
      price: "149만원",
      imageUrl: ""
    },
  ]);
  const [newEvent, setNewEvent] = useState({title: "", price: ""});
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // 이미지 첨부 및 썸네일 미리보기
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); 
    };
  };

  // 이벤트 추가
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.price || !previewUrl) {
      openPopup("입력 오류", "이미지, 타이틀, 가격을 모두 입력해주세요.");
      return;
    }
    setEvents([...events, {
      id: Date.now(),
      title: newEvent.title,
      price: newEvent.price,
      imageUrl: previewUrl
    }]);
    setNewEvent({title: "", price: ""});
    setFileName("");
    setPreviewUrl("");
  };

  // 이벤트 삭제
  const handleDelete = (id: number) => {
    openPopup("확인", "해당 이벤트를 랭킹에서 삭제하시겠습니까?", () => {
      setEvents(events.filter(e => e.id !== id));
    });
  };

  // 랭킹 순서 변경 (위/아래)
  const moveEvent = (idx: number, direction: "UP"|"DOWN") => {
    const newEvents = [...events];
    if (direction === "UP" && idx > 0)
      [newEvents[idx - 1], newEvents[idx]] =
      [newEvents[idx], newEvents[idx - 1]];
    else if (direction === "DOWN" && idx < newEvents.length - 1)
      [newEvents[idx + 1], newEvents[idx]] =
      [newEvents[idx], newEvents[idx + 1]];
    setEvents(newEvents);
  };

  // 최종 저장
  const handleSave = () => {
    console.log("DB에 저장될 데이터: ", events);
    openPopup("저장 완료", "이벤트 랭킹 설정이 성공적으로 저장되었습니다.");
  };

  return (
    <S.SetEventContainer>
      <S.SetEventHeader>
        <S.SetEventTitle>이벤트 랭킹 관리</S.SetEventTitle>
        <S.SetEventSaveButton onClick={handleSave}>
          <FiSave size={18}/>&nbsp;설정 저장하기
        </S.SetEventSaveButton>
      </S.SetEventHeader>

      <S.SetEventGrid>
        {/* ⚙️ 1. 새 이벤트 랭킹 등록 폼 */}
        <S.SetEventLeftColumn>
          <S.SetEventCard>
            <S.SetEventCardHeader>
              <S.SetEventCardTitle>새 이벤트 등록</S.SetEventCardTitle>
            </S.SetEventCardHeader>
            <S.SetEventCardBody>
              <S.SetEventFormGroup>
                <S.SetEventLabel>
                  대표 이미지 (정방형 또는 4:5 비율 권장)
                </S.SetEventLabel>
                <S.SetEventFileInputWrapper>
                  <S.SetEventFileInput 
                  type="file" 
                  id="SetEvent-img" 
                  accept="image/*"
                  onChange={handleFileChange}/>
                  <S.SetEventFileLabel htmlFor="SetEvent-img">
                    <FiImage/>&nbsp;이미지 선택
                  </S.SetEventFileLabel>
                  <span className="file-name">
                    {fileName || "선택된 파일 없음"}
                  </span>
                </S.SetEventFileInputWrapper>
                
                {previewUrl && (
                  <S.SetEventPreviewRect>
                    <img src={previewUrl} alt="미리보기"/>
                  </S.SetEventPreviewRect>
                )}
              </S.SetEventFormGroup>

              <div style={{ display: "flex", gap: "1rem" }}>
                <S.SetEventFormGroup style={{ flex: 1 }}>
                  <S.SetEventLabel>타이틀 (예: 다다고성형)</S.SetEventLabel>
                  <S.SetEventInput 
                  type="text" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(
                    {...newEvent, title: e.target.value}
                  )}/>
                </S.SetEventFormGroup>

                <S.SetEventFormGroup style={{ flex: 1 }}>
                  <S.SetEventLabel>가격 텍스트 (예: 149만원)</S.SetEventLabel>
                  <S.SetEventInput 
                  type="text" 
                  value={newEvent.price}
                  onChange={(e) => setNewEvent(
                    {...newEvent, price: e.target.value}
                  )}/>
                </S.SetEventFormGroup>
              </div>

              <S.SetEventAddButton onClick={handleAddEvent}>
                <FiPlus size={18}/>&nbsp;랭킹 리스트에 추가
              </S.SetEventAddButton>
            </S.SetEventCardBody>
          </S.SetEventCard>
        </S.SetEventLeftColumn>

        {/* 📋 2. 등록된 이벤트 랭킹 리스트 */}
        <S.SetEventRightColumn>
          <S.SetEventCard style={{ height: "100%" }}>
            <S.SetEventCardHeader>
              <S.SetEventCardTitle>
                현재 랭킹 순위 (총 {events.length}개)
              </S.SetEventCardTitle>
            </S.SetEventCardHeader>
            <S.SetEventTableWrapper>
              <S.SetEventTable>
                <thead>
                  <tr>
                    <th>순위/이동</th>
                    <th>이미지</th>
                    <th>타이틀 / 가격</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((evt, index) => (
                    <tr key={evt.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
                          <S.SetEventRankBadge>{index + 1}</S.SetEventRankBadge>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                            <S.SetEventActionButton
                            onClick={() => moveEvent(index, "UP")}
                            disabled={index === 0}>
                              <FiArrowUp size={18}/>
                            </S.SetEventActionButton>
                            <S.SetEventActionButton
                            onClick={() => moveEvent(index, "DOWN")}
                            disabled={index === events.length - 1}>
                              <FiArrowDown size={18}/>
                            </S.SetEventActionButton>
                          </div>
                        </div>
                      </td>
                      <td>
                        <S.SetEventThumbnail>
                          <img
                          src={evt.imageUrl ? evt.imageUrl : "https://placehold.co/100x125?text=No+Img"}
                          alt={evt.title ? evt.title : "No Img"}/>
                        </S.SetEventThumbnail>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <strong>{evt.title}</strong>
                        <div style={{ fontSize: "0.9rem", color: "#e74a3b", fontWeight: "bold", marginTop: "0.2rem" }}>
                          {evt.price}
                        </div>
                      </td>
                      <td>
                        <S.SetEventDeleteButton
                        onClick={() => handleDelete(evt.id)}>
                          <FiTrash2 size={16}/>
                        </S.SetEventDeleteButton>
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: "3rem 0" }}>
                        등록된 랭킹 이벤트가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </S.SetEventTable>
            </S.SetEventTableWrapper>
          </S.SetEventCard>
        </S.SetEventRightColumn>
      </S.SetEventGrid>
    </S.SetEventContainer>
  );
};
