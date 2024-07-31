import style from "../styles/Header.module.scss";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import ToggleButton from "../components/ToggleButton";
import DropDownMenu from "./DropDownMenu";
import LoginModal from "./LoginModal";
import 프로필 from "../images/프로필.png";
import 메세지 from "../images/메세지.png";
import 드롭다운 from "../images/드롭다운.png";

const Header = () => {
  const {
    isToggled,
    setIsToggled,
    dropDown,
    setDropDown,
    logout,
    currentUser,
  } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [brandRating, setBrandRating] = useState("");

  const isBoardPage = location.pathname.includes("/board");
  const isSinglePage = location.pathname.includes("/single");
  const isUserProfilePage = location.pathname.includes("/userprofile");
  const isWritePage = location.pathname.includes("/write");

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    const getBrandRating = async () => {
      try {
        const res = await axios.get("http://localhost:8080/brands/top");
        setBrandRating(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBrandRating();
  }, []);

  return (
    <div className={style.container}>
      <div
        className={style.left}
        onClick={() => {
          navigate("/");
        }}
      >
        <h2>내 알바야?!</h2>
        <h6>
          <span className={isToggled ? style.boss : style.employee}>
            {isToggled ? <>자영업자</> : <>아르바이트생</>}
          </span>
          을 위한 익명 커뮤니티 사이트
        </h6>
      </div>
      <div className={style.right}>
        <div className={style.brandRating}>
          <span className={style.dropDown}>
            <img className={style.dropDownImage} src={드롭다운} alt="" />
            브랜드 평점 랭킹
          </span>
          <div className={style.dropDownMenu}>
            {brandRating &&
              brandRating.map((item, index) => {
                return (
                  <div key={index}>
                    <span>
                      {index + 1}등 {item.name} {item.averageRating}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        {!isBoardPage &&
          !isSinglePage &&
          !isUserProfilePage &&
          !isWritePage && (
            <ToggleButton
              isToggled={isToggled}
              onToggle={() => {
                setIsToggled(!isToggled);
              }}
            />
          )}

        <span
          className={isToggled ? style.boss : style.employee}
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          전체메뉴
        </span>
        {dropDown ? <DropDownMenu /> : ""}
        {currentUser ? (
          <>
            <img
              className={style.messageImage}
              src={메세지}
              alt=""
              onClick={() => {
                navigate("/message");
              }}
            />
            <img
              onClick={() => {
                navigate(`/userprofile/${currentUser.id}`);
              }}
              src={프로필}
              alt=""
            />
            <span
              className={style.userNickname}
              onClick={() => {
                navigate(`/userprofile/${currentUser.id}`);
              }}
            >
              {currentUser.nickname}{" "}
              {currentUser.employmentType === "EMPLOYEE"
                ? "알바생님"
                : "자영업자님"}
            </span>
            <span onClick={logout}>로그아웃</span>
          </>
        ) : (
          <>
            <span onClick={handleShow}>로그인</span>
            <LoginModal show={show} handleClose={handleClose} />
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              회원가입
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
