"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
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

// 안전마취 데이터 인터페이스
interface SafetyData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export default function Safety() {
  const {openPopup, closePopup} = usePopup();
  // 🎯 상태 관리: 등록된 안전마취 장비/시스템 목록
  const [safetyList, setSafetyList] = useState<SafetyData[]>([]);
  // 🎯 상태 관리: 새 아이템 등록 폼
  const [newSafety, setNewSafety] = useState({ title: "", description: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/safety");
      if (response.data.success) {
        const formatted = response.data.data.map((item: any) => ({
          id: item.SAFETY_IDX,
          title: item.TITLE,
          description: item.DESCRIPTION,
          imageUrl: `/images/${item.FILE_NAME}`
        }));
        setSafetyList(formatted);
      };
    } catch (err) {
      console.error("안전 시스템 데이터 로드 실패: ", err);
    } finally {
      setIsLoading(false);
    };
  };

  // ----------------------------------------------------
  // 0. 이미지 첨부 및 썸네일 미리보기 기능
  // ----------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); 
    };
  };

  // ----------------------------------------------------
  // 1. 안전마취 항목 추가 기능
  // ----------------------------------------------------
  const handleAddSafety = async () => {
    // [검증] 빈칸이 하나라도 있으면 경고 팝업 띄우기
    if (!newSafety.title || !newSafety.description || !previewUrl || !selectedFile) {
      openPopup("입력 오류", "이미지, 타이틀, 상세 설명을 모두 입력해주세요.");
      return;
    };

    const formData = new FormData();
    formData.append("safetyImage", selectedFile);
    formData.append("title", newSafety.title);
    formData.append("description", newSafety.description);

    try {
      const response = await axios.post("/api/admin/safety", formData, {
        headers: {"Content-Type":"multipart/form-data"}
      });
      if (response.data.success) {
        setNewSafety({ title: "", description: "" }); 
        setSelectedFile(null);
        setFileName(""); 
        setPreviewUrl(""); 
        fetchData();
      };
    } catch (err) {
      openPopup("오류", "등록 실패");
    };
  };

  // ----------------------------------------------------
  // 2. 항목 삭제 기능 (팝업 띄우기 및 실제 삭제)
  // ----------------------------------------------------
  const handleDeleteSafety = (id: number) => {
    openPopup("확인", "해당 시스템을 리스트에서 삭제하시겠습니까?", async () => {
      try {
        const response = await axios.delete(`/api/admin/safety/${id}`);
        if (response.data.success)
          fetchData();
      } catch (err) {
        openPopup("오류", "삭제 에러");
      };
    });
  };

  // ----------------------------------------------------
  // 3. 노출 순서 변경 기능 (화살표 클릭)
  // ----------------------------------------------------
  const moveSafety = (index: number, direction: "UP" | "DOWN") => {
    const newList = [...safetyList]; 
    if (direction === "UP" && index > 0)
      [newList[index - 1], newList[index]] =
      [newList[index], newList[index - 1]];
    else if (direction === "DOWN" && index < newList.length - 1)
      [newList[index + 1], newList[index]] =
      [newList[index], newList[index + 1]];
    setSafetyList(newList); 
  };

  // ----------------------------------------------------
  // 4. 최종 저장 기능
  // ----------------------------------------------------
  const handleSave = async () => {
    const orderedIds = safetyList.map(item => item.id);
     try {
      const response = await axios.put("/api/admin/safety/order", {
        orderedIds
      });
      if (response.data.success)
        openPopup("저장 완료", "안전 시스템 설정이 성공적으로 저장되었습니다.");
    } catch (err) {
      openPopup("오류", "순서 저장 실패");
    };
  };

  if (isLoading)
    return null;

  return (
    <S.SetSafetyContainer>
      <S.SetSafetyHeader>
        <S.SetSafetyTitle>안전 시스템 관리</S.SetSafetyTitle>
        <S.SetSafetySaveButton onClick={handleSave}>
          <FiSave size={18}/>&nbsp;설정 저장하기
        </S.SetSafetySaveButton>
      </S.SetSafetyHeader>

      <S.SetSafetyGrid>
        {/* ⚙️ 1. 새 안전시스템 등록 폼 (좌측) */}
        <S.SetSafetyLeftColumn>
          <S.SetSafetyCard>
            <S.SetSafetyCardHeader>
              <S.SetSafetyCardTitle>
                새 장비/시스템 등록
              </S.SetSafetyCardTitle>
            </S.SetSafetyCardHeader>
            <S.SetSafetyCardBody>
              <S.SetSafetyFormGroup>
                <S.SetSafetyLabel>
                  배경 이미지 (정방형 비율 권장)
                </S.SetSafetyLabel>
                <S.SetSafetyFileInputWrapper>
                  <S.SetSafetyFileInput 
                  type="file" 
                  id="safety-img" 
                  accept="image/*"
                  onChange={handleFileChange}/>
                  <S.SetSafetyFileLabel htmlFor="safety-img">
                    <FiImage/>&nbsp;이미지 선택
                  </S.SetSafetyFileLabel>
                  <span className="file-name">
                    {fileName || "선택된 파일 없음"}
                  </span>
                </S.SetSafetyFileInputWrapper>

                {previewUrl && (
                  <S.SetSafetyPreviewRect>
                    <img src={previewUrl} alt="미리보기"/>
                  </S.SetSafetyPreviewRect>
                )}
              </S.SetSafetyFormGroup>

              <S.SetSafetyFormGroup>
                <S.SetSafetyLabel>
                  타이틀 (예: EtCO2 모니터링)
                </S.SetSafetyLabel>
                <S.SetSafetyInput 
                type="text" 
                placeholder="장비 및 시스템 명칭 입력"
                value={newSafety.title}
                onChange={(e) => setNewSafety(
                  {...newSafety, title: e.target.value}
                )}/>
              </S.SetSafetyFormGroup>

              <S.SetSafetyFormGroup>
                <S.SetSafetyLabel>
                  상세 설명 (카드 하단 노출)
                </S.SetSafetyLabel>
                <S.SetSafetyTextarea 
                placeholder="해당 시스템에 대한 상세 설명을 입력해주세요."
                value={newSafety.description}
                onChange={(e) => setNewSafety(
                  {...newSafety, description: e.target.value}
                )}
                rows={3}/>
              </S.SetSafetyFormGroup>

              <S.SetSafetyAddButton onClick={handleAddSafety}>
                <FiPlus size={18}/>&nbsp;리스트에 추가
              </S.SetSafetyAddButton>
            </S.SetSafetyCardBody>
          </S.SetSafetyCard>
        </S.SetSafetyLeftColumn>

        {/* 📋 2. 등록된 시스템 리스트 (우측) */}
        <S.SetSafetyRightColumn>
          <S.SetSafetyCard style={{ height: "100%" }}>
            <S.SetSafetyCardHeader>
              <S.SetSafetyCardTitle>
                현재 노출 순서 (총 {safetyList.length}개)
              </S.SetSafetyCardTitle>
            </S.SetSafetyCardHeader>
            <S.SetSafetyTableWrapper>
              <S.SetSafetyTable>
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>순위/이동</th>
                    <th style={{ width: "20%" }}>이미지</th>
                    <th style={{ width: "50%" }}>타이틀 및 설명</th>
                    <th style={{ width: "15%" }}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {safetyList.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
                        <S.SetSafetyRankBadge>{index + 1}</S.SetSafetyRankBadge>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                          <S.SetSafetyActionButton
                          onClick={() => moveSafety(index, "UP")}
                          disabled={index === 0}>
                            <FiArrowUp size={14}/>
                          </S.SetSafetyActionButton>
                          <S.SetSafetyActionButton
                          onClick={() => moveSafety(index, "DOWN")}
                          disabled={index === safetyList.length - 1}>
                            <FiArrowDown size={14}/>
                          </S.SetSafetyActionButton>
                        </div>
                      </div>
                    </td>
                    <td>
                      <S.SetSafetyThumbnail>
                        {item.imageUrl 
                        ? <img src={item.imageUrl} alt={item.title}/> 
                        : <span>No Img</span>}
                      </S.SetSafetyThumbnail>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      <strong style={{ display: "block", marginBottom: "0.4rem", fontSize: "1.05rem" }}>
                        {item.title}
                      </strong>
                      <div style={{ fontSize: "0.85rem", color: "#858796", lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.description}
                      </div>
                    </td>
                    <td>
                      <S.SetSafetyDeleteButton
                      onClick={() => handleDeleteSafety(item.id)}>
                        <FiTrash2 size={16}/>
                      </S.SetSafetyDeleteButton>
                    </td>
                  </tr>
                  ))}
                  {safetyList.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: "3rem 0" }}>
                        등록된 안전 시스템이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </S.SetSafetyTable>
            </S.SetSafetyTableWrapper>
          </S.SetSafetyCard>
        </S.SetSafetyRightColumn>
      </S.SetSafetyGrid>
    </S.SetSafetyContainer>
  );
};
