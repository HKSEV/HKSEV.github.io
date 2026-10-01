// 환경변수(DB 비밀번호, 포트 번호 등)를 읽어서 프로그램에 적용
require("dotenv").config();
const { Like } = require("typeorm");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const AppDataSource = require("./db");
const Member = require("./src/entity/Member");
const Consult = require("./src/entity/Consult");
const ToneSetting = require("./src/entity/ToneSetting");
const NavSetting = require("./src/entity/NavSetting");
const MainVisual = require("./src/entity/MainVisual");
const Popup = require("./src/entity/Popup");
const PopupSetting = require("./src/entity/PopupSetting");
const Category = require("./src/entity/Category");
const Selfie = require("./src/entity/Selfie");
const EventRanking = require("./src/entity/EventRanking");
const Vlog = require("./src/entity/Vlog");
const Safety = require("./src/entity/Safety");
const FooterSetting = require("./src/entity/FooterSetting");
const Board = require("./src/entity/Board");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

const uploadDir = path.join(__dirname, "public/images");
if (!fs.existsSync(uploadDir))
  fs.mkdirSync(uploadDir, {recursive: true});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    if (!req.fileIndex) {
      fs.readdir(uploadDir, (err, files) => {
        if (err)
          return cb(err);

        // 현재 fieldname에 해당하는 파일만 찾음
        const regex = new RegExp(
          `^${file.fieldname}_(\\d+)\\.[^\\.]+$`
        );

        let maxIndex = 0;

        files.forEach((filename) => {
          const match = filename.match(regex);
          if (match) {
            const index = Number(match[1]);
            if (index > maxIndex)
              maxIndex = index;
          };
        });

        req.fileIndex = maxIndex + 1;
        cb(null, `${file.fieldname}_${req.fileIndex}${ext}`);
        req.fileIndex++;
      });
    } else {
      cb(null, `${file.fieldname}_${req.fileIndex}${ext}`);
      req.fileIndex++;
    };
  }
});
const upload = multer({storage: storage});

//서버시작시 TypeORM DB연결
AppDataSource.initialize()
.then(() => {console.log("오라클db가 성공적으로 연결");})
.catch((error) => console.log("db 연결실패: ", error));

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

// 퀵상담
app.post("/api/consult/quick", async (req, res) => {
  try {
    console.log(req.body);
    const {name, phone, department} = req.body;
    if (!name || !phone || !department)
      return res.status(400).json({
        success: false,
        message: "이름, 연락처, 상담 분야를 모두 입력해주세요."
      });

    const consultRepository = AppDataSource.getRepository(Consult);
    const newConsult = consultRepository.create({
      NAME: name,
      PHONE: phone,
      DEPARTMENT: department,
      PASSWORD: "0000",
      USER_ID: "비회원",
      TITLE: `[빠른상담] ${department} 문의입니다.`,
      CONTENT: `${name}님의 빠른 상담 신청입니다. 빠른 시일 내에 연락바랍니다.`,
      STATUS: "대기중"
    });
    await consultRepository.save(newConsult);
    res.status(200).json({
      success: true,
      message: "빠른 상담 신청이 완료되었습니다."
    });
  } catch (err) {
    console.error("빠른 상담 신청 에러: ", err);
    res.status(500).json({
      success: false,
      message: "상담 신청 중 오류가 발생했습니다."
    });
  };
});

// admin 시작
// 상담내역 전체 조회
app.get("/api/admin/consult", async (req, res) => {
  try {
    const consultRepository = AppDataSource.getRepository(Consult);
    const list = await consultRepository.find({order:{CREATED_AT:"DESC"}});
    res.status(200).json({
      success: true,
      data: list
    });
  } catch (err) {
    console.error("상담 내역 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
// 상담 상태 토글
app.put("/api/admin/consult/:id/status", async (req, res) => {
  try {
    const consultRepository = AppDataSource.getRepository(Consult);
    const consult = await consultRepository.findOne({
      where: {ID: req.params.id}
    });
    if (!consult)
      return res.status(404).json({
        success: false,
        message: "데이터가 없습니다."
      });

    consult.STATUS = consult.STATUS === "대기중" ? "상담완료" : "대기중";
    await consultRepository.save(consult);
    res.status(200).json({
      success: true,
      message: "상태가 변경되었습니다."
    });
  } catch (err) {
    console.error("상태 변경 에러: ", err);
    res.status(500).json({
      success: false,
      message: "상태 변경 실패"
    });
  };
});
// 상담 내역 삭제
app.delete("/api/admin/consult/:id", async (req, res) => {
  try {
    const consultRepository = AppDataSource.getRepository(Consult);
    await consultRepository.delete(req.params.id);
    res.status(200).json({success: true})
  } catch (err) {
    console.error("상담 삭제 에러: ", err);
    res.status(500).json({success: false});
  };
});

// tone 톤앤매너 세팅
app.get("/api/admin/tone", async (req, res) => {
  try {
    const toneRepository = AppDataSource.getRepository(ToneSetting);
    let setting = await toneRepository.findOne({where: {ID: 1}});
    if (!setting)
      return res.status(200).json({
        success: true,
        data: {
          PRIMARY_TONE: "BLUE",
          IS_DARK_MODE: 'N'
        }
      });

    res.status(200).json({success: true, data: setting});
  } catch (err) {
    console.error("테마 설정 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/tone", async (req, res) => {
  try {
    const {primaryTone, isDarkMode} = req.body;
    const toneRepository = AppDataSource.getRepository(ToneSetting);
    let setting = await toneRepository.findOne({where: {ID: 1}});
    if (!setting)
      setting = await toneRepository.create({ID: 1});

    setting.PRIMARY_TONE = primaryTone;
    setting.IS_DARK_MODE = isDarkMode;
    await toneRepository.save(setting);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("테마 설정 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});

// nav세팅
app.get("/api/admin/nav", async (req, res) => {
  try {
    const navRepository = AppDataSource.getRepository(NavSetting);
    let setting = await navRepository.findOne({where: {ID: 1}});
    if (!setting)
      return res.status(200).json({
        success: true,
        data: {
          LOGO_TYPE: "",
          LOGO_TEXT: "",
          LOGO_FILE: "",
          MENUS: "[]"
        }
      });

    res.status(200).json({success: true, data: setting});
  } catch (err) {
    console.error("내비게이션 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/nav", upload.single("logoImage"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({
      success: false,
      message: "파일이 없습니다."
    });

  res.status(200).json({
    success: true,
    fileName: req.file.filename
  });
});
// 최초
app.put("/api/admin/nav", async (req, res) => {
  try {
    const {logoType, logoText, logoFileName, menus} = req.body;
    const navRepository = AppDataSource.getRepository(NavSetting);
    let setting = await navRepository.findOne({where: {ID: 1}});
    if (!setting)
      setting = await navRepository.create({ID: 1});

    setting.LOGO_TYPE = logoType;
    setting.LOGO_TEXT = logoText || "";
    setting.LOGO_FILE = logoFileName || "";
    setting.MENUS = JSON.stringify(menus);
    await navRepository.save(setting);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("내비게이션 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});

// 메인 비주얼 캐러셀 세팅
app.get("/api/admin/visual", async (req, res) => {
  try {
    const visualRepository = AppDataSource.getRepository(MainVisual);
    let setting = await visualRepository.findOne({where: {ID: 1}});
    if (!setting)
      return res.status(200).json({
        success: true,
        data: {SLIDES: "[]"}
      });

    res.status(200).json({
      success: true,
      data: setting
    });
  } catch (err) {
    console.error("메인 비주얼 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/visual", upload.array("mainImage"), async (req, res) => {
  try {
    if (req.files.length === 0)
      return res.status(400).json({
        success: false,
        message: "파일이 없습니다."
      });

    const fileNames = req.files.map(f => f.filename);
    res.status(200).json({
      success: true,
      fileNames: fileNames
    });
  } catch (err) {
     if (req.files)
      for (const file of req.files) {;
        try {
          await fs.promises.unlink(file.path);
        } catch (deleteError) {
          console.error("파일 삭제 실패:", deleteError);
        };
      };
    console.error("이미지 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/visual", async (req, res) => {
  try {
    const {slides} = req.body;
    const visualRepository = AppDataSource.getRepository(MainVisual);
    let setting = await visualRepository.findOne({where: {ID: 1}});
    if (!setting)
      setting = await visualRepository.create({ID: 1});

    setting.SLIDES = JSON.stringify(slides);
    await visualRepository.save(setting);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("메인 비주얼 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});

// popup세팅
app.get("/api/admin/popup", async (req, res) => {
  try {
    const settingRepository = AppDataSource.getRepository(PopupSetting);
    const popupRepository = AppDataSource.getRepository(Popup);
    let setting = await settingRepository.findOne({where: {ID: 1}});
    const popups = await popupRepository.find({order: {POPUP_IDX: "DESC"}});

    res.status(200).json({
      success: true,
      maxPopups: setting ? setting.MAX_POPUPS : 1,
      popups
    });
  } catch (err) {
    console.error("팝업 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/popup/setting", async (req, res) => {
  try {
    const {maxPopups} = req.body;
    const settingRepository = AppDataSource.getRepository(PopupSetting);
    let setting = await settingRepository.findOne({where: {ID: 1}});
    if (!setting)
      setting = settingRepository.create({ID: 1});

    setting.MAX_POPUPS = maxPopups;
    await settingRepository.save(setting);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("팝업 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/popup", upload.single("popupImage"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "이미지가 없습니다."
      });

    const {title, link, startDate, endDate, useTodayClose} = req.body;
    const popupRepository = AppDataSource.getRepository(Popup);
    // const popups = await popupRepository.find({order: {POPUP_IDX: "DESC"}});
    const newPopup = popupRepository.create({
      TITLE: title,
      LINK: link || "",
      FILE_NAME: req.file.filename,
      START_DATE: startDate,
      END_DATE: endDate,
      USE_TODAY_CLOSE: useTodayClose === "true" ? 'Y' : 'N'
    });
    await popupRepository.save(newPopup);
    res.status(200).json({
      success: true
    });
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(file.path);
      } catch (deleteError) {
        console.error("파일 삭제 실패: ", deleteError);
      };
    };
    console.error("이미지 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/popup/:idx", async (req, res) => {
  try {
    const popupRepository = AppDataSource.getRepository(Popup);
    await popupRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("팝업 삭제 에러: ", err);
    res.status(500).json({success: false});
  };
});

// category세팅
app.get("/api/admin/category", async (req, res) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find({
      order: {SORT_ORDER: "ASC", CATEGORY_IDX: "ASC"}
    });
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (err) {
    console.error("카테고리 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/category", upload.single("categoryImage"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "이미지가 없습니다."
      });
    
    const {title, link} = req.body;
    const categoryRepository = AppDataSource.getRepository(Category);
    // DB에 저장된 카테고리 중 가장 큰 SORT_ORDER 값을 찾아냄
    const maxSort = await categoryRepository
      .createQueryBuilder("category")
      .select("MAX(category.SORT_ORDER)", "max")
      .getRawOne();
    // 새로 등록될 카테고리가 맨 뒤에 오도록 찾은 숫자에 1을 더함
    const nextOrder = (maxSort.max || 0) + 1;
    const newCategory = categoryRepository.create({
      TITLE: title,
      LINK: link || "",
      FILE_NAME: req.file.filename,
      SORT_ORDER: nextOrder
    });
    
    await categoryRepository.save(newCategory);
    res.status(200).json({success: true});
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(file.path);
      } catch (deleteError) {
        console.error("파일 삭제 실패: ", deleteError);
      };
    };
    console.error("카테고리 등록 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/category/:idx", async (req, res) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    await categoryRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("카테고리 삭제 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/category/order", async (req, res) => {
  try {
    const {orderedIds} = req.body;
    const categoryRepository = AppDataSource.getRepository(Category);
    for (let i = 0; i < orderedIds.length; i++) {
      await categoryRepository.update(orderedIds[i], {SORT_ORDER: i + 1});
    };
    res.status(200).json({success: true});
  } catch (err) {
    console.error("카테고리 순서 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});

//selfie세팅
app.get("/api/admin/selfie", async (req, res) => {
  try {
    const selfieRepository = AppDataSource.getRepository(Selfie);
    const selfies = await selfieRepository.find({
      order: {SELFIE_IDX: "DESC"}
    });
    res.status(200).json({
      success: true,
      data: selfies
    });
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/selfie", upload.single("selfieImage"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "이미지가 없습니다."
      });
    
    const {likes, views} = req.body;
    const selfieRepository = AppDataSource.getRepository(Selfie);
    const newItem = selfieRepository.create({
      FILE_NAME: req.file.filename,
      LIKES: parseInt(likes) || 0,
      VIEWS: parseInt(views) || 0,
      IS_ACTIVE: 'Y'
    });
    
    await selfieRepository.save(newItem);
    res.status(200).json({success: true});
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(file.path);
      } catch (deleteError) {
        console.error("파일 삭제 실패: ", deleteError);
      };
    };
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/selfie/:idx", async (req, res) => {
  try {
    const selfieRepository = AppDataSource.getRepository(Selfie);
    await selfieRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/selfie/status", async (req, res) => {
  try {
    const {statuses} = req.body;
    const selfieRepository = AppDataSource.getRepository(Selfie);
    for (let item of statuses) {
      await selfieRepository.update(
        item.id, {IS_ACTIVE: item.isActive ? 'Y' : 'N'}
      );
    };
    res.status(200).json({success: true});
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});

// event세팅
app.get("/api/admin/event", async (req, res) => {
  try {
    const eventRepository = AppDataSource.getRepository(EventRanking);
    const events = await eventRepository.find({
      order: {SORT_ORDER: "ASC", EVENT_IDX: "ASC"}
    });
    res.status(200).json({
      success: true,
      data: events
    });
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/event", upload.single("eventImage"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "이미지가 없습니다."
      });
    
    const {title, price} = req.body;
    const eventRepository = AppDataSource.getRepository(EventRanking);
    const maxSort = await eventRepository
      .createQueryBuilder("event")
      .select("MAX(event.SORT_ORDER)", "max")
      .getRawOne();
    const nextOrder = (maxSort.max || 0) + 1;
    const newItem = eventRepository.create({
      TITLE: title,
      PRICE: price,
      FILE_NAME: req.file.filename,
      SORT_ORDER: nextOrder
    });
    
    await eventRepository.save(newItem);
    res.status(200).json({success: true});
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(file.path);
      } catch (deleteError) {
        console.error("파일 삭제 실패: ", deleteError);
      };
    };
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/event/:idx", async (req, res) => {
  try {
    const eventRepository = AppDataSource.getRepository(EventRanking);
    await eventRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("카테고리 삭제 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/event/order", async (req, res) => {
  try {
    const {orderedIds} = req.body;
    const eventRepository = AppDataSource.getRepository(EventRanking);
    for (let i = 0; i < orderedIds.length; i++) {
      await eventRepository.update(orderedIds[i], {SORT_ORDER: i + 1});
    };
    res.status(200).json({success: true});
  } catch (err) {
    console.error("카테고리 순서 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});

// vlog세팅
app.get("/api/admin/vlog", async (req, res) => {
  try {
    const vlogRepository = AppDataSource.getRepository(Vlog);
    const items = await vlogRepository.find({
      order: {SORT_ORDER: "ASC", VLOG_IDX: "ASC"}
    });
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/vlog", upload.single("vlogImage"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "이미지가 없습니다."
      });
    
    const {title, videoUrl} = req.body;
    const vlogRepository = AppDataSource.getRepository(Vlog);
    const maxSort = await vlogRepository
      .createQueryBuilder("vlog")
      .select("MAX(vlog.SORT_ORDER)", "max")
      .getRawOne();
    const nextOrder = (maxSort.max || 0) + 1;
    const newItem = vlogRepository.create({
      TITLE: title,
      VIDEO_URL: videoUrl,
      FILE_NAME: req.file.filename,
      SORT_ORDER: nextOrder
    });
    
    await vlogRepository.save(newItem);
    res.status(200).json({success: true});
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(file.path);
      } catch (deleteError) {
        console.error("파일 삭제 실패: ", deleteError);
      };
    };
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/vlog/:idx", async (req, res) => {
  try {
    const vlogRepository = AppDataSource.getRepository(Vlog);
    await vlogRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/vlog/order", async (req, res) => {
  try {
    const {orderedIds} = req.body;
    const vlogRepository = AppDataSource.getRepository(Vlog);
    for (let i = 0; i < orderedIds.length; i++) {
      await vlogRepository.update(orderedIds[i], {SORT_ORDER: i + 1});
    };
    res.status(200).json({success: true});
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});

// safety세팅
app.get("/api/admin/safety", async (req, res) => {
  try {
    const safetyRepository = AppDataSource.getRepository(Safety);
    const safeties = await safetyRepository.find({
      order: {SORT_ORDER: "ASC", SAFETY_IDX: "ASC"}
    });
    res.status(200).json({
      success: true,
      data: safeties
    });
  } catch (err) {
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/safety", upload.single("safetyImage"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "이미지가 없습니다."
      });
    
    const {title, description} = req.body;
    const safetyRepository = AppDataSource.getRepository(Safety);
    const maxSort = await safetyRepository
      .createQueryBuilder("safety")
      .select("MAX(safety.SORT_ORDER)", "max")
      .getRawOne();
    const nextOrder = (maxSort.max || 0) + 1;
    const newItem = safetyRepository.create({
      TITLE: title,
      DESCRIPTION: description,
      FILE_NAME: req.file.filename,
      SORT_ORDER: nextOrder
    });
    
    await safetyRepository.save(newItem);
    res.status(200).json({success: true});
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(file.path);
      } catch (deleteError) {
        console.error("파일 삭제 실패: ", deleteError);
      };
    };
    console.error(": ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/safety/:idx", async (req, res) => {
  try {
    const safetyRepository = AppDataSource.getRepository(Safety);
    await safetyRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    console.error("카테고리 삭제 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.put("/api/admin/safety/order", async (req, res) => {
  try {
    const {orderedIds} = req.body;
    const safetyRepository = AppDataSource.getRepository(Safety);
    for (let i = 0; i < orderedIds.length; i++) {
      await safetyRepository.update(orderedIds[i], {SORT_ORDER: i + 1});
    };
    res.status(200).json({success: true});
  } catch (err) {
    console.error("카테고리 순서 저장 에러: ", err);
    res.status(500).json({success: false});
  };
});

// footer세팅 관리자
app.get("/api/admin/footer", async (req, res) => {
  try {
    // 테이블 데이터를 다룰 수 있는 권한(저장소)를 가져옴
    const footerRepository = AppDataSource.getRepository(FooterSetting);
    const footer = await footerRepository.findOne({where: {ID: 1}});
    if (!footer)
      return res.status(200).json({
        success: true,
        data: null
      });
    
    res.status(200).json({
      success: true,
      data: {
        companyInfo: {
          name: footer.NAME || "",
          address: footer.ADDRESS || "",
          clinicName: footer.CLINIC_NAME || "",
          phone: footer.PHONE || "",
          email: footer.EMAIL || "",
          locationUrl: footer.LOCATION_URL || ""
        },
        schedules: footer.SCHEDULES || [],
        familySites: footer.FAMILY_SITES || []
      }
    });
  } catch (err) {
    console.error("푸터 조회 에러: ", err);
    res.status(500).json({
      success: false,
      message: "푸터 데이터를 불러오지 못했습니다."
    });
  };
});
// footer 포스트
app.post("/api/admin/footer", async (req, res) => {
  try {
    // 프론트에서 post로 보낸 데이터 분해
    const {companyInfo, schedules, familySites} = req.body;
    console.log("데이터: ", schedules);
    const footerRepository = AppDataSource.getRepository(FooterSetting);
    let footer = await footerRepository.findOne({where: {ID: 1}});
    if (!footer) // 최초저장
      footer = await footerRepository.create({ID: 1});

    footer.NAME = companyInfo.name;
    footer.ADDRESS = companyInfo.address;
    footer.CLINIC_NAME = companyInfo.clinicName;
    footer.PHONE = companyInfo.phone;
    footer.EMAIL = companyInfo.email;
    footer.LOCATION_URL = companyInfo.locationUrl;
    footer.SCHEDULES = schedules;
    footer.FAMILY_SITES = familySites;
    await footerRepository.save(footer);

    res.status(200).json({
      success: true,
      message: "푸터 설정이 성공적으로 저장되었습니다."
    });
  } catch (err) {
    console.error("푸터 저장 에러: ", err);
    res.status(500).json({
      success: false,
      message: "푸터 저장 중 서버 오류가 발생했습니다."
    });
  };
});

// users 회원 목록 조회
app.get("/api/admin/users", async (req, res) => {
  try {
    const memberRepository = AppDataSource.getRepository(Member);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;
    const whereClause = search ? {USER_NAME: Like(`%${search}%`)} : {};
    const [users, totalCount] = await memberRepository.findAndCount({
      where: whereClause,
      order: {USER_IDX: "DESC"},
      skip: skip,
      take: limit
    });
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    console.error("회원 목록 조회 에러: ", err);
    res.status(500).json({
      success: false,
      message: "서버 에러"
    });
  };
});
app.put("/api/admin/users/:idx/status", async (req, res) => {
  try {
    const memberRepository = AppDataSource.getRepository(Member);
    const user = await memberRepository.findOne({
      where: {USER_IDX: req.params.idx}
    });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "회원이 없습니다."
      });

    user.STATUS = user.STATUS === "정지" ? "정상" : "정지";
    await memberRepository.save(user);
    res.status(200).json({
      success: true,
      message: "상태가 변경되었습니다."
    });
  } catch (err) {
    console.error("상태 변경 에러: ", err);
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/users/:idx", async (req, res) => {
  try {
    const memberRepository = AppDataSource.getRepository(Member);
    const user = await memberRepository.delete(req.params.idx);
    res.status(200).json({
      success: true,
      message: "삭제되었습니다."
    });
  } catch (err) {
    console.error("삭제 에러: ", err);
    res.status(500).json({success: false});
  };
});

// boards 게시판 관리
app.get("/api/admin/board", async (req, res) => {
  try {
    const boardRepository = AppDataSource.getRepository(Board);
    const items = await boardRepository.find({order: {BOARD_IDX: "ASC"}});
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (err) {
    res.status(500).json({success: false});
  };
});
app.post("/api/admin/board", async (req, res) => {
  try {
    const {name, type, readAuth, writeAuth} = req.body;
    const boardRepository = AppDataSource.getRepository(Board);
    const newBoard = boardRepository.create({
      NAME: name,
      BOARD_TYPE: type,
      READ_AUTH: readAuth,
      WRITE_AUTH: writeAuth    
    });

    await boardRepository.save(newBoard);
    res.status(200).json({success: true});
  } catch (err) {
    res.status(500).json({success: false});
  };
});
app.delete("/api/admin/board/:idx", async (req, res) => {
  try {
    const boardRepository = AppDataSource.getRepository(Board);
    await boardRepository.delete(req.params.idx);
    res.status(200).json({success: true});
  } catch (err) {
    res.status(500).json({success: false});
  };
});
// 단건 조회
app.get("/api/board/:idx", async (req, res) => {
  try {
    const boardRepository = AppDataSource.getRepository(Board);
    const board = await boardRepository.findOne({
      where: {BOARD_IDX: req.params.idx}
    });
    if (!board)
      return res.status(404).json({
        success: false,
        message: "게시판이 존재하지 않습니다."
      });

    res.status(200).json({
      success: true,
      data: board
    });
  } catch (err) {
    console.error("게시판 조회 에러: ", err);
    res.status(500).json({success: false});
  };
});
// admin 종료

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});