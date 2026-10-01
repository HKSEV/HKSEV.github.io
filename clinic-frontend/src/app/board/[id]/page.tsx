"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface BoardInfo {
  BOARD_IDX: number;
  NAME: string;
  BOARD_TYPE: string;
};

export default function BoardDetail() {
  // 💡 URL에서 [id] 값을 빼옵니다. (예: /board/5 로 접속하면 params.id는 5)
  const params = useParams();
  const boardId = params.id;

  const [boardInfo, setBoardInfo] = useState<BoardInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 화면이 켜질 때 백엔드에 게시판 정보 요청
  useEffect(() => {
    if (boardId) {
      axios.get(`/api/board/${boardId}`)
        .then(res => {
          if(res.data.success)
            setBoardInfo(res.data.data);
        })
        .catch(err => console.error("게시판 로드 에러:", err))
        .finally(() => setIsLoading(false));
    };
  }, [boardId]);

  if (isLoading)
    return (
      <div style={{ padding: "10rem", textAlign: "center" }}>
        로딩중...
      </div>
    );
      ;
  if (!boardInfo)
    return (
      <div style={{ padding: "10rem", textAlign: "center" }}>
        존재하지 않는 게시판입니다.
      </div>
    );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 1rem", minHeight: "60vh" }}>
      {/* 게시판 제목 */}
      <h2 style={{ fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "3rem" }}>
        {boardInfo.NAME}
      </h2>

      {/* 🎯 관리자가 설정한 스킨(타입)에 따라 다르게 렌더링 됩니다 */}
      
      {/* 1. 일반 게시판 (리스트형) */}
      {boardInfo.BOARD_TYPE === "일반게시판" && (
        <table style={{ width: "100%", borderCollapse: "collapse", borderTop: "2px solid #333" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
              <th style={{ padding: "1rem", width: "10%" }}>번호</th>
              <th style={{ padding: "1rem", width: "60%" }}>제목</th>
              <th style={{ padding: "1rem", width: "15%" }}>작성자</th>
              <th style={{ padding: "1rem", width: "15%" }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            {/* 향후 진짜 게시글 데이터를 맵핑할 자리 */}
            <tr style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
              <td style={{ padding: "1rem" }}>1</td>
              <td style={{ padding: "1rem", textAlign: "left" }}>첫 번째 일반 게시글입니다.</td>
              <td style={{ padding: "1rem" }}>관리자</td>
              <td style={{ padding: "1rem" }}>2026-10-01</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* 2. 갤러리형 게시판 (썸네일 위주) */}
      {boardInfo.BOARD_TYPE === "갤러리형" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
          {/* 갤러리 아이템 1 */}
          <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "200px", backgroundColor: "#ddd" }}></div>
            <div style={{ padding: "1rem" }}>
              <strong>전후사진 샘플 1</strong>
              <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.5rem" }}>
                2026-10-01
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. FAQ형 게시판 (아코디언 질문답변) */}
      {boardInfo.BOARD_TYPE === "FAQ형" && (
        <div style={{ borderTop: "2px solid #333" }}>
          {/* FAQ 아이템 1 */}
          <div style={{ padding: "1.5rem", borderBottom: "1px solid #ddd", display: "flex", gap: "1rem" }}>
            <span style={{ color: "#4e73df", fontWeight: "bold", fontSize: "1.2rem" }}>Q.</span>
            <div>
              <strong style={{ fontSize: "1.1rem" }}>자주 묻는 질문 샘플입니다.</strong>
              <div style={{ marginTop: "1rem", color: "#555", backgroundColor: "#f8f9fc", padding: "1rem", borderRadius: "4px" }}>
                A. 여기에 답변 내용이 들어갑니다.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 우측 하단 글쓰기 버튼 */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
        <button style={{ padding: "0.8rem 2rem", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          글쓰기
        </button>
      </div>
    </div>
  );
};
