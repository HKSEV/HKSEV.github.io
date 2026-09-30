"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Temporal } from "@js-temporal/polyfill";
import { FiTrash2, FiSearch, FiCheck, FiUserX } from "react-icons/fi";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

// 임시 회원 데이터 인터페이스
interface UserData {
  id: number;
  name: string;
  userId: string;
  phone: string;
  joinDate: string;
  status: "정상" | "정지";
};

export default function Users() {
  const {openPopup, closePopup} = usePopup();
  // 🎯 상태 관리: 회원 목록
  const [userList, setUserList] = useState<UserData[]>([]);
  // 페이징
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchKeyword]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        params: {
          page: currentPage,
          limit: 10,
          search: searchKeyword
        }
      });
      if (response.data.success && response.data.data) {
        const formattedUsers = response.data.data.map((user: any) => ({
          id: user.USER_IDX,
          name: user.USER_NAME,
          userId: user.USER_ID,
          phone: user.PHONE,
          joinDate: formatDate(user.REG_DATE),
          status: user.STATUS || "정상",
        }));
        setUserList(formattedUsers);
        setTotalCount(response.data.pagination. totalCount);
        setTotalPages(response.data.pagination.totalPages);
      };
    } catch (err) {

    } finally {
      setIsLoading(false);
    };
  };

  const handleSearch = () => {
    setSearchKeyword(searchInput);
    setCurrentPage(1); // 검색시 무조건 1페이지로 돌아가기
  };

  // ----------------------------------------------------
  // 1. 회원 상태 변경 토글 (정상 <-> 정지)
  // ----------------------------------------------------
  const toggleStatus = async (id: number) => {
    try {
      const response = await axios.put(`/api/admin/users/${id}/status`);
      if (response.data.success)
        fetchData();
    } catch (err) {
      console.error(err);
    };
  };

  // ----------------------------------------------------
  // 2. 회원 삭제 기능 (팝업 열기 & 실제 삭제)
  // ----------------------------------------------------
  const handleDeleteUser = (id: number) => {
    try {
      openPopup("확인", `해당 회원 정보를 정말 삭제하시겠습니까?${<br/>}(이 작업은 되돌릴 수 없습니다.)`, async () => {
        const response = await axios.delete(`/api/admin/users/${id}`);
        if (response.data.success)
          fetchData();
      });
    } catch (err) {
      console.error("회원 삭제 실패:", err);
      openPopup("오류", "회원 삭제에 실패했습니다.");
    };
  };

  const formatDate = (dateString: string) => {
      let dateTime;
      
      try {
        // 1. UTC 기준 ISO 문자열일 경우 (예: 2026-09-21T05:30:00Z) -> 한국 시간으로 변환
        dateTime = Temporal.Instant.from(dateString).toZonedDateTimeISO("Asia/Seoul");
      } catch (error) {
        // 2. 타임존 정보가 없는 일반 문자열일 경우 (예: 2026-09-21 14:30:00) 공백을 T로 치환 후 파싱
        const safeString = dateString.replace(" ", "T");
        dateTime = Temporal.PlainDateTime.from(safeString);
      }
  
      // Temporal 객체에서 직관적으로 년/월/일/시/분 추출 (달이 0부터 시작하지 않고 1부터 시작함!)
      const year = dateTime.year;
      const month = String(dateTime.month).padStart(2, "0");
      const day = String(dateTime.day).padStart(2, "0");
      const hour = String(dateTime.hour).padStart(2, "0");
      const minute = String(dateTime.minute).padStart(2, "0");
  
      return `${year}-${month}-${day} ${hour}:${minute}`;
    };

  if (isLoading)
    return <></>;

  return (
    <S.UserContainer>
      <S.UserHeader>
        <S.UserTitle>회원 관리</S.UserTitle>
      </S.UserHeader>

      {/* 🎯 검색 및 필터 영역 */}
      <S.UserFilterCard>
        <S.UserInputGroup>
          <S.UserInput
          type="text"
          placeholder="이름, 아이디 또는 연락처 검색"
          value={searchInput}
          onChange={((e) => setSearchInput(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>
          <S.UserSearchButton>
            <FiSearch size={16}/>&nbsp;검색
          </S.UserSearchButton>
        </S.UserInputGroup>
      </S.UserFilterCard>

      {/* 🎯 회원 내역 데이터 테이블 */}
      <S.UserTableCard>
        <S.UserCardHeader>
          <S.UserCardTitle>
            가입 회원 목록 (총 {userList.length}명)
          </S.UserCardTitle>
        </S.UserCardHeader>

        <S.UserTableWrapper>
          <S.UserTable>
            <thead>
              <tr>
                <th>No.</th>
                <th>이름</th>
                <th>아이디(이메일)</th>
                <th>연락처</th>
                <th>가입일자</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, idx) => (
                <tr key={item.id}>
                  <td>{totalCount - ((currentPage - 1) * 10) - idx}</td>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.userId}</td>
                  <td>{item.phone}</td>
                  <td>{item.joinDate}</td>
                  <td>
                    <S.UserStatusBadge 
                    $status={item.status} 
                    onClick={() => toggleStatus(item.id)}>
                      {item.status === "정상" ? <FiCheck size={16}/> : <FiUserX size={16}/>}
                      &nbsp;{item.status}
                    </S.UserStatusBadge>
                  </td>
                  <td>
                    <S.UserDeleteButton
                    onClick={() => handleDeleteUser(item.id)}>
                      <FiTrash2 size={16}/>
                    </S.UserDeleteButton>
                  </td>
                </tr>
              ))}
              {userList.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "3rem" }}>
                    가입된 회원 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </S.UserTable>
        </S.UserTableWrapper>

        {totalPages > 0 && (
          <S.UserPagination>
            {currentPage > 1 && (
              <S.UserPaginationArrow
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}>
                &lt;
              </S.UserPaginationArrow>
            )}
            {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
              <S.UserPaginationButton
              key={p}
              onClick={() => setCurrentPage(p)}
              $active={p === currentPage}>
                {p}
              </S.UserPaginationButton>
            ))}
            {currentPage < totalPages && (
              <S.UserPaginationArrow
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}>
                &gt;
              </S.UserPaginationArrow>
            )}
          </S.UserPagination>
        )}
      </S.UserTableCard>
    </S.UserContainer>
  );
};
