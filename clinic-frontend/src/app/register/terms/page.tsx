// npm install react-daum-postcode
"use client";

import React, { useState, useEffect } from "react";
// 이동하기 위해서
import { useRouter } from "next/navigation";
import DaumPostcode from "react-daum-postcode";
import usePopup from "@/components/contexts/PopupContext";
import * as S from "@/assets/css/Style.style";

export default function Termspage() {
  const router = useRouter();
  const {openPopup, closePopup} = usePopup();
  //add
  const [step, setStep] = useState(1);
  const [allAgreed, setAllAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  // 약관 박스 열림/닫힘 토글 상태 (디자인 시안에 맞춰 기본값 true)
  const [isTermsOpen, setIsTermsOpen] = useState(true);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(true);
  //주소검색 팝업 열림 / 닫힘
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  //폼입력값 관리할 객체 상태추가
  const [formData, setFormData] = useState({
    userName: "",
    userId: "",
    userPw: "",
    userPwConfirm: "",
    email: "",
    emailDomain: "",
    isMailAgreed: false,
    phone: "",
    isSnsAgreed: false,
    gender: "",
    residentNumFront: "",
    residentNumBack: "",
    zipcode: "",
    address1: "",
    address2: ""
  });

  useEffect(() => {
    if (termsAgreed && privacyAgreed)
      setAllAgreed(true);
    else
      setAllAgreed(false);
  }, [termsAgreed, privacyAgreed]);

  

  // 사용자가 키보드로 입력할 때마다 상태를 업데이트하는 핸들러
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    //주민번호 입력시 숫자만 입력되도록 처리(선택사항)
    if (
      (name === "residentNumFront" || name === "residentNumBack") 
      && !/^[0-9]*$/.test(value)
    )
      return;
    setFormData((prev) => (
      {...prev, [name]:type === "checkbox" ? checked : value}
    ));   
  };

  // 다음 주소 API완료 핸들러..
  const handleCompletePostcode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if(data.addressType === "R") {
      if(data.bname !== "")
        extraAddress += data.bname;
      if (data.buildingName !== "") 
        extraAddress += extraAddress !== ""
        ? `, ${data.buildingName}`: data.buildingName;   

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    // 주소 및 우편번호 상태 업데이트 후 팝업 닫기
    setFormData((prev) => (
      {...prev, zipcode:data.zonecode, address1:fullAddress}
    ));
    setIsPostcodeOpen(false);    
  };

  // 국가 공식 알고리즘
  const validateResidentNumber = (front:string, back:string) => {
    // 앞 6자리와 뒤 7자리를 하나로 합쳐서 13자리 문자열로 만듭니다.
    const rrn = front + back;
    /*만약 합친 길이가 딱 13자리가 아니라면,
    입력이 덜 된 것이므로 즉시 false(거절)를 반환합니다.*/
    if (rrn.length !== 13)
      return false;
    //공식을 계산할 합계를 저장할 변수를 0으로 준비합니다.
    let sum = 0;
    /*주민번호 검증 공식에 사용되는 
    "가중치(각 자리에 곱할 고정 숫자들)" 배열입니다.*/
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    /*마지막 13번째 자리(검증 번호)를 제외한 앞의 
    12자리 숫자를 하나씩 돌면서 계산*/
    for(let i =0; i < 12; i++)
      sum += parseInt(rrn[i]) * weights[i];
    /*
    국가 공식 규칙: 총합(sum)을 11로 나눈 나머지를 11에서 빼고
    그 결과를 다시 10으로 나눈 나머지를 구합니다
    이것이 진짜 검증용 1자리 숫자!
    */
    const checkDigit = (11 -(sum % 11)) % 10;

    /*우리가 계산해 낸 검증 숫자(checkDigit)와
    사용자가 입력한 마지막 13번째 숫자가 완벽히 똑같은지 비교
    */
    return checkDigit === parseInt(rrn[12]);
  };

  //[회원가입] 버튼을 눌렀을 때 Node.js 서버로 쏴주는 함수
  const handleSubmit = () => {
    // 필수 입력값 체크
    if(!formData.userName || !formData.userId || !formData.userPw) {
      openPopup("입력 오류", "필수 항목을 모두 입력해 주세요");
      return;
    };
    if(formData.userPw !== formData.userPwConfirm) {
      openPopup("비밀번호 오류", "비밀번호가 일치하지 않습니다");
      return;
    };
    // 주민번호 앞자리나 뒷자리가 비어있으면 경고
    if(!formData.residentNumFront || !formData.residentNumBack) {
      openPopup("입력 오류", "주민등록번호를 입력해 주세요");
      return;
    };
    // 주민번호 검사 함수실행시..번호가 일치하지 않을경우
    if(!validateResidentNumber(formData.residentNumFront, formData.residentNumBack)) {
      openPopup("인증 실패", "유효하지 않은 주민등록번호입니다. 다시 확인해 주세요.");
      return;
    };
    // 이메일 앞부분(아이디 부분)이 비어있으면 경고창을 띄웁니다.
    if(!formData.email) {
      openPopup("입력 오류", "이메일을 입력해 주세요");
      return;
    };

    openPopup("최종 확인", "이 정보로 가입하시겠습니까?", async () => {
      // 이메일 주소 조합
      const fullEmail = (
        formData.emailDomain === "직접입력" || formData.emailDomain === ""
        ? formData.email : `${formData.email}@${formData.emailDomain}`
      );

      // 백엔드로 보낼 완전한 13자리 주민등록번호를 앞뒤로 붙여 조립합니다.
      const fullResidentNum = 
        `${formData.residentNumFront}${formData.residentNumBack}`
      try {
        const response = await fetch("http://127.0.0.1:4000/api/register", {
          method: "POST",
          headers: {"Content-type":"application/json"},
          body :JSON.stringify({
            userName: formData.userName,
            userId: formData.userId,
            userPw: formData.userPw,
            email: fullEmail,
            isMailAgreed: formData.isMailAgreed,
            phone: formData.phone,
            isSnsAgreed: formData.isSnsAgreed,
            gender: formData.gender,
            residentNum: fullResidentNum,
            zipcode: formData.zipcode,
            address1: formData.address1, 
            address2: formData.address2,  
          })
        });

        const result = await response.json();

        if (response.ok)
          openPopup("가입 완료", "회원가입이 완료되었습니다", () => {
            router.push("/");
          });
        else
          openPopup("가입 실패", result.message || "가입에 실패했습니다");
      } catch (err) {
        console.error(err);
        openPopup("서버 오류", "서버와 통신중에 오류가 발생했습니다") ;
      };
    });
  };

  // 전체 동의 핸들러
  const handleAllAgreed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAllAgreed(isChecked);
    setTermsAgreed(isChecked);
    setPrivacyAgreed(isChecked);
  };

  return (
    <S.Wrapper>
      {/* 2.회원가입 폼일때 보여줄 상단 타이틀 추가 */}
      {step === 2 && <S.PageTitle>회원가입</S.PageTitle>}

      <S.StepContainer>
        <S.Step $active={step === 1}>
          <S.StepNumber $active={step === 1}>1</S.StepNumber>
          <S.StepText $active={step === 1}>약관동의</S.StepText>
        </S.Step>
        <S.StepDivider/>
        <S.Step $active={step === 2}>
          <S.StepNumber $active={step === 2}>2</S.StepNumber>
          <S.StepText $active={step === 2}>회원가입</S.StepText>
        </S.Step>
      </S.StepContainer>

      {/* 전체 동의 영역 */}
      {step === 1 ? (
        <>
          <S.CheckAllWrapper>
            <S.CheckboxLabel>
              <S.CheckboxInput
              type="checkbox"
              checked={allAgreed}
              onChange={handleAllAgreed}/>
              <S.CheckAllText>
                안호범 안스 성형외과의 모든 약관을 확인하고 전체 동의합니다.
                (전체동의, 선택항목도 포함됩니다.)
              </S.CheckAllText>
            </S.CheckboxLabel>
          </S.CheckAllWrapper>

          {/* 이용약관(필수) */}
          <S.TermSection>
            <S.TermHeader>
              <S.CheckboxLabel>
                <S.CheckboxInput
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}/>
                <S.TermTitle>이용약관(필수)</S.TermTitle>
              </S.CheckboxLabel>
              <S.ToggleButton onClick={() => setIsTermsOpen(!isTermsOpen)}>
                {isTermsOpen ? "닫기 ∧" : "열기 ∨"}
              </S.ToggleButton>
            </S.TermHeader>
            <S.TermContentBox $isOpen={isTermsOpen}>
              {`[안효범안스성형외과의원 온라인회원 약관]
이 약관은 안효범안스성형외과의원(이하 ‘회사’)가 제공하는 서비스 이용조건 및 절차에 대한 사항과 기타 필요한 사항을 전기통신사업법 및 동법 시행령이 정하는 대로 준수하고 규정함을 목적으로 합니다.

제 1조 목적
① 안효범안스성형외과의원(http://www.doctorahn114.co.kr/) 이용자 약관(이하 "본 약관"이라 합니다)은 이용자가 안효범안스성형외과의원에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 회원과 안효범안스성형외과의원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제 2조 회원의 정의
"회원"이란 안효범안스성형외과의원에 접속하여 본 약관에 따라 안효범안스성형외과의원 온라인 회원으로 가입하여 안효범안스성형외과의원이 제공하는 서비스를 받는 자를 말합니다.

제 3조 회원가입
① 회원이 되고자 하는 자는 안효범안스성형외과의원이 정한 가입 양식에 따라 회원정보를 기입하고 "등록하기" 단추를 누르는 방법으로 회원 가입을 신청합니다.
② 안효범안스성형외과의원은 제1항과 같이 회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한 신청한 자를 회원으로 등록합니다.
  - 다른 사람의 명의를 사용하여 신청한 경우
  - 가입신청자가 본 약관 제6조 2항에 의하여 이전에 회원자격을 상실한 적이 있는 경우.
  - 가입신청서의 내용에 허위, 기재누락, 오기가 있는 경우
  - 기타 회원으로 등록하는 것이 안효범안스성형외과의원의 업무 수행상 현저히 지장이 있다고 판단되는 경우
③ 회원가입계약의 성립시기는 안효범안스성형외과의원의 승낙이 가입신청자에게 도달한 시점으로 합니다.
④ 회원은 제1항의 회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다.

제 4조 서비스의 제공 및 변경
① 안효범안스성형외과의원은 회원에게 아래와 같은 서비스를 제공합니다.
  - 안효범안스성형외과의원 뉴스 메일 서비스
  - 안효범안스성형외과의원 온라인 상담실 /예약 이용 서비스
  - 안효범안스성형외과의원 온라인 회원을 위한 섹션 및 컨텐츠 서비스
  - 기타 안효범안스성형외과의원이 타 업체와 제휴해서 제공하는 각종 서비스
② 안효범안스성형외과의원은 그 변경될 서비스의 내용 및 제공일자를 회원에게 통지하고, 서비스를 변경하여 제공할 수 있습니다.

제 5조 서비스의 중단
안효범안스성형외과의원은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로의 교체 기타 안효범안스성형외과의원이 적절하다고 판단하는 사유에 기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.

제 6조 회원 탈퇴 및 자격 상실
① 회원은 안효범안스성형외과의원에 언제든지 자신의 회원 등록을 말소해 줄 것(회원 탈퇴)을 요청할 수 있으며, 안효범안스성형외과의원은 위 요청을 받은 즉시 해당 회원의 회원 등록 말소를 위한 절차를 밟습니다.
② 회원이 다음 각 호의 사유에 해당하는 경우, 안효범안스성형외과의원은 회원의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
  - 가입 신청 시에 허위 내용을 등록한 경우
  - 다른 사람의 안효범안스성형외과의원 사이트 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우
  - 안효범안스성형외과의원을 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
  
제 7조 회원의 재가입
본 약관 제6조의 규정에 따라 회원을 탈퇴한 전 회원이 재가입을 원할 경우 본 약관 제3조에 따라 회원가입을 하면 됩니다.

제 8조 회원의 개인정보보호
안효범안스성형외과의원은 관련법령이 정하는 바에 따라서 회원 등록정보를 포함한 회원의 개인정보를 보호하기 위하여 노력합니다. 회원의 개인정보보호에 관해서는 관련법령 및 안효범안스성형외과의원이 정하는 "개인정보보호정책"에 정한 바에 의합니다.

제 9조 안효범안스성형외과의원의 의무
① 안효범안스성형외과의원은 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하기 위해서 노력합니다.
② 안효범안스성형외과의원은 회원이 안전하게 인터넷 서비스를 이용할 수 있도록 회원의 개인정보(신용정보포함)보호를 위한 보안 시스템을 구축합니다.
③ 안효범안스성형외과의원은 회원이 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.

제 10조 회원의 ID 및 비밀번호에 대한 의무
① 안효범안스성형외과의원이 관계법령, "개인정보보호정책"에 의해서 그 책임을 지는 경우를 제외하고, 자신의 ID와 비밀번호에 관한 관리책임은 각 회원에게 있습니다.
② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
③ 회원은 자신의 ID 및 비밀번호를 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 안효범안스성형외과의원에 통보하고 안효범안스성형외과의원의 안내가 있는 경우에는 그에 따라야 합니다.

제 11조 회원의 의무
① 회원은 다음 각 호의 행위를 하여서는 안됩니다.
  - 회원가입신청 또는 변경 시 허위내용을 등록하는 행위
  - 안효범안스성형외과의원에 게시된 정보를 변경하는 행위
  - 안효범안스성형외과의원 기타 제3자의 인격권 또는 지적재산권을 침해하거나 업무를 방해하는 행위
  - 다른 회원의 ID를 도용하는 행위
  - 정크메일(junk mail), 스팸메일(spam mail), 행운의 편지(chain letters), 피라미드 조직에 가입할 것을 권유하는 메일, 외설 또는 폭력적인 메시지·화상·음성 등이 담긴 메일을 보내거나 기타 공서양속에 반하는 정보를 공개 또는 게시하는 행위.
  - 관련 법령에 의하여 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)의 전송 또는 게시하는 행위
  - 안효범안스성형외과의원의 직원이나 안효범안스성형외과의원 인터넷 서비스의 관리자를 가장하거나 사칭하여 또는 타인의 명의를 도용하여 글을 게시하거나 메일을 발송하는 행위
  - 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나 전자우편으로 발송하는 행위
  - 스토킹(stalking) 등 다른 회원을 괴롭히는 행위
  - 다른 회원에 대한 개인정보를 동의 없이 수집, 저장, 공개하는 행위
  - 불특정 다수의 자를 대상으로 하여 광고 또는 선전을 게시하거나 스팸메일을 전송하는 등의 방법으로 안효범안스성형외과의원의 서비스를 이용하여 영리목적의 활동을 하는 행위
  - 안효범안스성형외과의원이 제공하는 서비스에 정한 약관 기타 서비스 이용에 관한 규정을 위반하는 행위
  
제 12조 공개게시물의 삭제
회원의 공개게시물의 내용이 다음 각 호에 해당하는 경우 안효범안스성형외과의원은 회원에게 사전 통지 없이 해당 공개게시물을 삭제할 수 있고, 해당 회원의 회원 자격을 제한, 정지 또는 상실시킬 수 있습니다.
  - 다른 회원 또는 제3자를 비방하거나 중상 모략으로 명예를 손상시키는 내용
  - 공서양속에 위반되는 내용의 정보, 문장, 도형 등을 유포하는 내용
  - 범죄행위와 관련이 있다고 판단되는 내용
  - 다른 회원 또는 제3자의 저작권 등 기타 권리를 침해하는 내용
  - 광고성 또는 상업적 목적이 두드러진 경우
  - 기타 관계 법령에 위배된다고 판단되는 내용
  
제 13조 저작권의 귀속 및 이용제한
① 안효범안스성형외과의원이 작성한 저작물에 대한 저작권 기타 지적재산권은 안효범안스성형외과의원에 귀속합니다.
② 회원은 안효범안스성형외과의원을 이용함으로써 얻은 정보를 안효범안스성형외과의원의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.

제 14조 약관의 개정
① 안효범안스성형외과의원은 약관의 규제 등에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다. 변경된 약관에 이의가 있는 회원은 탈퇴할 수 있습니다.

제 15조 재판관할
안효범안스성형외과의원과 회원간에 발생한 서비스 이용에 관한 분쟁으로 인한 소는 민사소송법상의 관할을 가지는 대한민국의 법원에 제기합니다.

부 칙
이 약관은 2017년 1월 20일을 시작으로 새로운 약관이 나오기 전까지 사용한다.`}
            </S.TermContentBox>
          </S.TermSection>

          {/* 2. 개인정보 수집 및 이용(필수) */}
          <S.TermSection>
            <S.TermHeader>
              <S.CheckboxLabel>
                <S.CheckboxInput
                type="checkbox"
                checked={privacyAgreed}
                onChange={(e) => setPrivacyAgreed(e.target.checked)}/>
                <S.TermTitle>개인정보 수집 및 이용(필수)</S.TermTitle>
              </S.CheckboxLabel>
              <S.ToggleButton onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
                {isPrivacyOpen ? "닫기 ∧" : "열기 ∨"}
              </S.ToggleButton>
            </S.TermHeader>
            <S.TermContentBox $isOpen={isPrivacyOpen}>
              {`1. - 목적 : 이용자 식별 및 본인여부 확인
    - 항목 : 이름, 아이디, 비밀번호
    - 보유 및 이용기간 : 회원탈퇴 후 5일까지

2. - 목적 : 민원 등 고객 고충처리
    - 항목 : 이메일, 휴대전화번호
    - 보유 및 이용기간 : 회원탈퇴 후 5일까지

3. - 목적 : 만 14세 미만 아동 확인
    - 항목 : 법정 생년월일`}
            </S.TermContentBox>
          </S.TermSection>

          <S.ButtonGroup>
            <S.Button $variant="outline">이전단계</S.Button>
            <S.Button
            $variant="solid"
            onClick={() => {
              if (!termsAgreed || !privacyAgreed) {
                openPopup("약관 동의", "필수 약관에 모두 동의해 주세요");
                return;
              };
              setStep(2);
            }}>
              다음단계
            </S.Button>
          </S.ButtonGroup>
        </>
      ) : (
        <>
          <S.FormContainer>
            <S.FormGroup>
              <S.Label>이름 (필수)</S.Label>
              <S.FormInput
              type="text"
              placeholder="이름을 입력해주세요"
              name="userName"
              value={formData.userName}
              onChange={handleChange}/>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>아이디 (필수)</S.Label>
              <S.FormInput
              type="text"
              placeholder="아이디를 입력해주세요"
              name="userId"
              value={formData.userId}
              onChange={handleChange}/>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>비밀번호 (필수)</S.Label>
              <S.FormInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="userPw"
              value={formData.userPw}
              onChange={handleChange}/>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>비밀번호 확인(필수)</S.Label>
              <S.FormInput
              type="password"
              placeholder="비밀번호를 한번더 입력해주세요"
              name="userPwConfirm"
              value={formData.userPwConfirm}
              onChange={handleChange}/>
            </S.FormGroup>

            {/*주민등록번호 */}
            <S.FormGroup>
              <S.Label>주민등록번호 (필수)</S.Label>
              <div 
              className="d-flex align-items-center justify-content-between">
                <S.FormInput
                type="text"
                maxLength={6}
                placeholder="앞6자리"
                name="residentNumFront"
                value={formData.residentNumFront}
                onChange={handleChange}
                />
                <span>-</span>
                <S.FormInput
                type="password"
                maxLength={7}
                placeholder="뒤 7자리"
                name="residentNumBack"
                value={formData.residentNumBack}
                onChange={handleChange}
                />
              </div>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>이메일 (필수)</S.Label>
              <S.EmailWrapper>
                <S.FormInput
                type="text"
                placeholder="이메일 주소를 입력해주세요"
                name="email"
                value={formData.email}
                onChange={handleChange}/>
                <S.FormSelect 
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleChange}>
                  <option>직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="daum.net">daum.net</option>
                </S.FormSelect>
              </S.EmailWrapper>
              <S.SubCheckboxLabel>
                <input type="checkbox" 
                name="isMailAgreed"
                checked={formData.isMailAgreed}  
                onChange={handleChange}/> 
                정보/이벤트 메일 수신에 동의합니다.
              </S.SubCheckboxLabel>
            </S.FormGroup>

            {/*주소 넣기 추가 */}
            <S.FormGroup>
              <S.Label>주소</S.Label>
              <S.Dflex>
                <S.FormInput
                type="text"
                placeholder="우편번호"
                name="zipcode"
                value={formData.zipcode}
                readOnly/>
                <S.Button
                $variant="outline"
                onClick={() => setIsPostcodeOpen(true)}>
                  우편번호 찾기
                </S.Button>        
              </S.Dflex>
              <S.FormInput
              type="text"
              placeholder="기본주소"
              name="address1"
              value={formData.address1}
              className="mb-2"
              readOnly/>
              <S.FormInput
              type="text"
              placeholder="상세주소를 입력해 주세요"
              name="address2"
              value={formData.address2}
              className="mb-2"
              onChange={handleChange}
              disabled={formData.address1 === ""}/>
            </S.FormGroup>

            {/* 다음 우편번호 팝업 모달 */}
            {isPostcodeOpen && (
              <S.ModalBG>
                <S.ModalContent>
                  <S.RightBtn>
                    <button onClick={() => setIsPostcodeOpen(false)}>
                      닫기 X
                    </button>
                  </S.RightBtn>
                  <DaumPostcode onComplete={handleCompletePostcode}/>
                </S.ModalContent>
              </S.ModalBG>
            )}

            <S.FormGroup>
              <S.Label>휴대폰번호 (필수)</S.Label>
              <S.FormInput
              type="tel"
              placeholder="-없이 입력하세요"
              name="phone"
              value={formData.phone}  
              onChange={handleChange}/>
              <S.SubCheckboxLabel>
                <input
                type="checkbox" 
                name="isSnsAgreed"
                checked={formData.isSnsAgreed}  
                onChange={handleChange}/> 
                정보/이벤트 SNS 수신에 동의합니다.
              </S.SubCheckboxLabel>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>성별</S.Label>
              <S.RadioWrapper>
                <S.RadioLabel>
                  <S.RadioInput
                  type="radio" 
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}  
                  onChange={handleChange}/>
                  남자
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.RadioInput
                  type="radio" 
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}  
                  onChange={handleChange}/>여자
                </S.RadioLabel>
              </S.RadioWrapper>
            </S.FormGroup>
          </S.FormContainer>

          <S.ButtonGroup>
            <S.Button
            $variant="outline"
            onClick={() => setStep(1)}>
              취소
            </S.Button>
            <S.Button
            $variant="solid"
            onClick={handleSubmit}>
              회원가입
            </S.Button>
          </S.ButtonGroup>
        </>
      )}
    </S.Wrapper>
  );
};