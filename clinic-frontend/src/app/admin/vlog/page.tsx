"use client";

import React, { useState } from "react";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiImage,
  FiArrowUp,
  FiArrowDown,
  FiVideo
} from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

// VLOG 데이터 인터페이스 (데이터의 생김새 정의)
interface VlogData {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function Vlog() {
  const {openPopup, closePopup} = usePopup();
  // 🎯 상태 관리: 등록된 VLOG 목록
  const [vlogList, setVlogList] = useState<VlogData[]>([
    {
      id: 1,
      title: "답답했던 눈매·복코·얼굴살 완벽...",
      videoUrl: "https://youtube.com/...",
      thumbnailUrl: ""
    },
    {
      id: 2,
      title: "광대·사각턱·이중턱 싹 지우고...",
      videoUrl: "https://youtube.com/...",
      thumbnailUrl: ""
    }
  ]);

  // 🎯 상태 관리: 새 VLOG 등록 폼
  const [newVlog, setNewVlog] = useState({ title: "", videoUrl: "" });
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // ----------------------------------------------------
  // 0. 이미지 첨부 및 썸네일(16:9) 미리보기 기능
  // ----------------------------------------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          setFileName(file.name);
          setPreviewUrl(URL.createObjectURL(file)); 
      };
  };

  // ----------------------------------------------------
  // 1. VLOG 추가 기능
  // ----------------------------------------------------
  const handleAddVlog = () => {
    // [검증] 빈칸이 하나라도 있으면 경고 팝업 띄우기
    if (!newVlog.title || !newVlog.videoUrl || !previewUrl) {
      openPopup("입력 오류", "썸네일 이미지, 제목, 영상 링크를 모두 입력해주세요.");
      return;
    }

    // [추가] 기존 목록 끝에 새로운 VLOG 데이터 추가하기
    setVlogList([
      ...vlogList, 
      { 
        id: Date.now(), 
        title: newVlog.title, 
        videoUrl: newVlog.videoUrl, 
        thumbnailUrl: previewUrl
      } 
    ]);

    // [초기화] 입력 폼 비우기
    setNewVlog({ title: "", videoUrl: "" }); 
    setFileName(""); 
    setPreviewUrl(""); 
  };

  // ----------------------------------------------------
  // 2. VLOG 삭제 기능 (팝업 띄우기 및 실제 삭제)
  // ----------------------------------------------------
  // 삭제 버튼(휴지통) 클릭 시 호출
  const handleDeleteVlog = (id: number) => { 
    openPopup("확인", "해당 영상을 노출 리스트에서 삭제하시겠습니까?", () => {
      setVlogList(vlogList.filter(v => v.id !== id));
    });
  };

  // ----------------------------------------------------
  // 3. VLOG 노출 순서 변경 기능 (화살표 클릭)
  // ----------------------------------------------------
  const moveVlog = (idx: number, direction: "UP" | "DOWN") => {
    const newVlogList = [...vlogList]; // 원본 복사
    // 위로 이동
    if (direction === "UP" && idx > 0)
      [newVlogList[idx - 1], newVlogList[idx]] =
      [newVlogList[idx], newVlogList[idx - 1]];
    // 아래로 이동
    else if (direction === "DOWN" && idx < newVlogList.length - 1)
      [newVlogList[idx + 1], newVlogList[idx]] =
      [newVlogList[idx], newVlogList[idx + 1]];
    setVlogList(newVlogList); // 순서가 바뀐 새 배열로 갱신
  };

  // ----------------------------------------------------
  // 4. 최종 저장 기능
  // ----------------------------------------------------
  const handleSave = () => {
    console.log("DB에 저장될 VLOG 데이터:", vlogList);
    openPopup("저장 완료", "VLOG 설정이 성공적으로 저장되었습니다.");
  };

  return (
    <S.SetVlogContainer>
      <S.SetVlogHeader>
        <S.SetVlogTitle>SetVlog 영상 관리</S.SetVlogTitle>
        <S.SetVlogSaveButton onClick={handleSave}>
          <FiSave size={18}/>&nbsp;설정 저장하기
        </S.SetVlogSaveButton>
      </S.SetVlogHeader>
      <S.SetVlogGrid>
        {/* ⚙️ 1. 새 VLOG 등록 폼 (좌측) */}
        <S.SetVlogLeftColumn>
          <S.SetVlogCard>
            <S.SetVlogCardHeader>
              <S.SetVlogCardTitle>새 영상 등록</S.SetVlogCardTitle>
            </S.SetVlogCardHeader>
            <S.SetVlogCardBody>
              <S.SetVlogFormGroup>
                <S.SetVlogLabel>
                  영상 썸네일 이미지 (권장 비율 16:9)
                </S.SetVlogLabel>
                <S.SetVlogFileInputWrapper>
                  <S.SetVlogFileInput 
                  type="file" 
                  id="vlog-img" 
                  accept="image/*"
                  onChange={handleFileChange}/>
                  <S.SetVlogFileLabel htmlFor="vlog-img">
                    <FiImage/>&nbsp;이미지 선택
                  </S.SetVlogFileLabel>
                  <span className="file-name">
                    {fileName || "선택된 파일 없음"}
                  </span>
                </S.SetVlogFileInputWrapper>

                {/* 16:9 비율의 미리보기 영역 */}
                {previewUrl && (
                  <S.SetVlogPreviewRect>
                    <img src={previewUrl} alt="썸네일 미리보기"/>
                  </S.SetVlogPreviewRect>
                )}
              </S.SetVlogFormGroup>

              <S.SetVlogFormGroup>
                <S.SetVlogLabel>영상 제목 (노출될 텍스트)</S.SetVlogLabel>
                <S.SetVlogInput 
                type="text" 
                placeholder="예: 광대·사각턱·이중턱 싹 지우고 온 후기"
                value={newVlog.title}
                onChange={(e) => setNewVlog(
                  {...newVlog, title: e.target.value}
                )}/>
              </S.SetVlogFormGroup>

              <S.SetVlogFormGroup>
                <S.SetVlogLabel>영상 링크 (유튜브 URL 등)</S.SetVlogLabel>
                <S.SetVlogInput 
                type="text" 
                placeholder="예: https://youtube.com/watch?v=..."
                value={newVlog.videoUrl}
                onChange={(e) => setNewVlog(
                  {...newVlog, videoUrl: e.target.value}
                )}/>
              </S.SetVlogFormGroup>

              <S.SetVlogAddButton onClick={handleAddVlog}>
                <FiPlus size={18}/>&nbsp;리스트에 추가
              </S.SetVlogAddButton>
            </S.SetVlogCardBody>
          </S.SetVlogCard>
        </S.SetVlogLeftColumn>

        {/* 📋 2. 등록된 VLOG 리스트 (우측) */}
        <S.SetVlogRightColumn>
          <S.SetVlogCard style={{ height: "100%" }}>
            <S.SetVlogCardHeader>
              <S.SetVlogCardTitle>
                현재 노출 순서 (총 {vlogList.length}개)
              </S.SetVlogCardTitle>
            </S.SetVlogCardHeader>
            <S.SetVlogTableWrapper>
              <S.SetVlogTable>
                <thead>
                  <tr>
                    <th>순위/이동</th>
                    <th>썸네일</th>
                    <th>제목 및 링크</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {vlogList.map((vlog, index) => (
                    <tr key={vlog.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.8rem" }}>
                          <S.SetVlogRankBadge>{index + 1}</S.SetVlogRankBadge>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                            <S.SetVlogActionButton
                            onClick={() => moveVlog(index, "UP")}
                            disabled={index === 0}>
                              <FiArrowUp size={14}/>
                            </S.SetVlogActionButton>
                            <S.SetVlogActionButton
                            onClick={() => moveVlog(index, "DOWN")}
                            disabled={index === vlogList.length - 1}>
                              <FiArrowDown size={14}/>
                            </S.SetVlogActionButton>
                          </div>
                        </div>
                      </td>
                      <td>
                        <S.SetVlogThumbnail>
                          <img
                          src={vlog.thumbnailUrl ? vlog.thumbnailUrl : "https://placehold.co/160x90?text=No+Img"}
                          alt={vlog.title ? vlog.title : "No Img"}/>
                        </S.SetVlogThumbnail>
                      </td>
                      <td style={{ textAlign: "left" }}>
                        <strong>{vlog.title}</strong>
                        <div style={{ fontSize: "0.8rem", color: "#4e73df", marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <FiVideo/>&nbsp;{vlog.videoUrl || "링크 없음"}
                        </div>
                      </td>
                      <td>
                        <S.SetVlogDeleteButton
                        onClick={() => handleDeleteVlog(vlog.id)}>
                          <FiTrash2 size={16}/>
                        </S.SetVlogDeleteButton>
                      </td>
                    </tr>
                  ))}
                  {vlogList.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: "3rem 0" }}>
                        등록된 영상이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </S.SetVlogTable>
            </S.SetVlogTableWrapper>
          </S.SetVlogCard>
        </S.SetVlogRightColumn>
      </S.SetVlogGrid>
    </S.SetVlogContainer>
  );
};
