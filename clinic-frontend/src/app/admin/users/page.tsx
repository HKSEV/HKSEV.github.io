"use client";

import React, { useState } from "react";
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
  const [userList, setUserList] = useState<UserData[]>([
    {
      id: 1,
      name: "홍길동",
      userId: "hong123@test.com",
      phone: "010-1234-5678",
      joinDate: "2026-09-20",
      status: "정상"
    },
    {
      id: 2,
      name: "김철수",
      userId: "kim_ch@test.com",
      phone: "010-9876-5432",
      joinDate: "2026-09-18",
      status: "정지"
    },
    {
      id: 3,
      name: "이영희",
      userId: "young_hee@test.com",
      phone: "010-5555-4444",
      joinDate: "2026-09-15",
      status: "정상"
    },
  ]);

  // ----------------------------------------------------
  // 1. 회원 상태 변경 토글 (정상 <-> 정지)
  // ----------------------------------------------------
  const toggleStatus = (id: number) => {
    setUserList(userList.map(item =>
      item.id === id
      ? { ...item, status: item.status === "정상" ? "정지" : "정상" }
      : item
    ));
  };

  // ----------------------------------------------------
  // 2. 회원 삭제 기능 (팝업 열기 & 실제 삭제)
  // ----------------------------------------------------
  const handleDeleteUser = (id: number) => {
    openPopup("확인", `해당 회원 정보를 정말 삭제하시겠습니까?${<br/>}(이 작업은 되돌릴 수 없습니다.)`, () => {
      setUserList(userList.filter(item => item.id !== id));
    });
  };

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
          placeholder="이름, 아이디 또는 연락처 검색"/>
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
              {userList.map((item, index) => (
                <tr key={item.id}>
                  <td>{userList.length - index}</td>
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
      </S.UserTableCard>
    </S.UserContainer>
  );
};
