require("dotenv").config();
const express = require("express");
const cors = require("cors");
// 환경변수(DB 비밀번호, 포트 번호 등)를 읽어서 프로그램에 적용
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const AppDataSource = require("./db");
const Member = require("./src/entity/Member");

const app = express();
app.use(cors());
app.use(express.json());
// HTML 폼 태그를 통해 전송된 데이터를 서버가 이해할 수 있도록 변환
// extended: true는 복잡한 객체 형태의 데이터도 해석
// app.use(express.urlencoded({ extended: true }));

//서버시작시 TypeORM DB연결
AppDataSource.initialize()
.then(() => {console.log("오라클db가 성공적으로 연결");})
.catch((error) => console.log("db 연결실패", error));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "성형외과 백엔드 서버 정상 작동중" });
});

// 회원가입 API
app.post("/api/register", async(req, res) => {
  try {
    const {
      userName,
      userId,
      userPw,
      email,
      isMailAgreed,
      phone,
      isSnsAgreed,
      gender,
      residentNum,
      zipcode,
      address1,
      address2,
      isAdmin,
    } = req.body;
    //add 1.비밀번호 암호화
    /*
    해킹을 당해도 원본 비밀번호를 알 수 없도록 
    '소금(salt)'이라는 무작위 문자열을 생성합니다.
    숫자 10은 복잡도를 의미하며, 
    클수록 안전하지만 서버가 계산하는 데 시간이 더 걸립니다.
    보통 10을 사용합니다
    */
    const salt = await bcrypt.genSalt(10);
    /*
    사용자가 입력한 비밀번호(userPw)에 생성된 
    소금(salt)을 버무려 알아볼 수 없는 
    복잡한 암호(해시)로 만듭니다.
    */
    const hashedPw = await bcrypt.hash(userPw, salt);
    const memberRepository = AppDataSource.getRepository(Member);
    const newMember = {
      USER_NAME: userName,
      USER_ID: userId,
      USER_PW: hashedPw,
      EMAIL:email,
      IS_MAIL_AGREED: isMailAgreed ? "Y" : "N",
      PHONE: phone,
      IS_SNS_AGREED: isSnsAgreed ? "Y" : "N",
      GENDER: gender,
      RESIDENT_NUM: residentNum,
      ZIPCODE: zipcode,
      ADDRESS1: address1,
      ADDRESS2: address2,
      IS_ADMIN: isAdmin,
    };
    await memberRepository.save(newMember);
    res.json({ success: true, message: "회원가입이 완료되었습니다." });
  } catch (err) {
    if (err.message && err.message.includes("ORA-00001")) {
      console.error("회원가입 에러: 중복된 아이디입니다...");
      return res.status(409).json({
        success: false, message: "이미 사용 중인 아이디입니다."
      });
    };
    console.error("회원가입 에러: ", err);
    res.status(500).json({
      success: false, message: "회원가입 중 서버 오류 발생"
    });
  };
});

// 로그인 API
app.post("/api/login", async (req, res) => {
  try {
    const {userId, userPw} = req.body;
    const memberRepository = AppDataSource.getRepository(Member);
    const user = await memberRepository.findOne({
      where: {USER_ID: userId}
    });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "존재하지 않는 아이디입니다."
      });
    // 비밀번호 검증(평문과 암호문 비교)
    const isMatch = await bcrypt.compare(userPw, user.USER_PW);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "비밀번호가 일치하지 않습니다."
      });
    // 로그인 성공
    res.status(200).json({
      success: true,
      message: "로그인에 성공했습니다.",
      isAdmin: user.IS_ADMIN
    });
  } catch (err) {
    console.error("로그인 에러: ", err);
    res.status(500).json({
      success: false,
      message: "로그인 처리중 서버 오류가 발생했습니다."
    });
  };
});

app.post("/api/id-check", async (req, res) => {
  try {
    const {userId} = req.body;
    if (!userId)
      return res.status(400).json({
        success: false,
        message: "아이디를 입력해주세요."
      });

    const memberRepository = AppDataSource.getRepository(Member);
    const user = await memberRepository.findOne({
      where: {USER_ID: userId}
    });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "존재하지 않는 ID입니다."
      });

    res.status(200).json({success: true});
  } catch (err) {
    console.error("아이디 체크 에러: ", err);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  };
});

// 비밀번호 찾기
app.post("/api/send-reset-email", async (req, res) => {
  try {
    const {userId, userName, phone} = req.body
    if (!userId || !userName || !phone)
      return res.status(400).json({
        success: false,
        message: "인증 정보를 모두 입력해주세요."
      });

    const memberRepository = AppDataSource.getRepository(Member);
    const user = await memberRepository.findOne({
      where: {USER_ID: userId, USER_NAME: userName, PHONE: phone}
    });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "입력하신 정보와 일치하는 회원이 없습니다."
      });

    // 이메일 발송기 세팅(gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tt388wwt@gmail.com",
        pass: "uios gpzg csjp mryb"
      }
    });
    const resetUrl = `http://localhost:3000/find/reset?userId=${user.USER_ID}`;
    const mailOptions = {
      from: "\"성형외과 관리자\" <doctor@gmail.com>",
      to: user.EMAIL,
      subject: "[성형외과] 비밀번호 재설정 안내",
      html: `
        <div style="padding: 20px; text-align: center;">
          <h2>비밀번호 재설정</h2>
          <p>${user.USER_NAME}님, 본인인증이 완료되었습니다.</p>
          <p>아래 버튼을 클릭하여 새로운 비밀번호를 설정해 주세요.</p>
          <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background-color:#4e73df; color:#fff; text-decoration:none; border-radius:5px; margin-top:20px;">
              새 비밀번호 설정하기
          </a>
        </div>
      `
    };
    // 이메일 전송
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      success: true,
      message: "이메일 발송 성공"
    });
  } catch (err) {
    console.error("이메일 발송 에러: ", err);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  };
});

// 비밀번호 변경 API
app.post("/api/reset-password", async (req, res) => {
  try {
    const {userId, newPw} = req.body;
    if(!userId || !newPw)
      return res.status(400).json({
        success: false,
        message: "잘못된 요청입니다."
      });

    const memberRepository = AppDataSource.getRepository(Member);
    const user = await memberRepository.findOne({
      where: {USER_ID: userId}
    });
    if(!user)
      return res.status(404).json({
        success: false,
        message: "회원을 찾을 수 없습니다."
      });
    
    // 암호화
    const hashedPw = await bcrypt.hash(newPw, 10);
    user.USER_PW = hashedPw;
    await memberRepository.save(user);

    res.status(200).json({
      success: true,
      message: "비밀번호가 성공적으로 변경되었습니다."
    });
  } catch (err) {
    console.error("비밀번호 업데이트 에러: ", err);
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  };
});
// 고도화: 아이디 확인하고 이메일을 판단해서 보냄

// admin 시작
// admin 종료

// // 서버 시작 과정을 순서대로 처리하기 위한 비동기 함수
// async function startup() {
//   console.log("서버 시작 중.....");
//   try {
//     // DB 연결 초기화
//     await AppDataSource.initialize();
//     console.log("TypeORM 오라클 DB연결 완료...");

//     // 지정한 포트에서 클라이언트의 요청을 기다리기 시작
//     app.listen(port, () => {
//       console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
//     });
//   } catch (err) {
//     console.error("DB 연결 실패: ", err);
//   };
// };
// startup();

// process.on("SIGINT", async () => {
//   console.log("서버를 종료합니다...");
//   await AppDataSource.close();

//   process.exit(0);
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});