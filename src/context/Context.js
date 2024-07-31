import { createContext, useState, useEffect } from "react";
import axios from "axios";
import 놀이공원 from "../images/놀이공원.png";
import 디저트 from "../images/디저트.png";
import 레스토랑 from "../images/레스토랑.png";
import 배달 from "../images/배달.png";
import 백화점 from "../images/백화점.png";
import 베이커리 from "../images/베이커리.png";
import 뷰티헬스 from "../images/뷰티헬스.png";
import 숙박 from "../images/숙박.png";
import 영화관 from "../images/영화관.png";
import 의류 from "../images/의류.png";
import 커피전문점 from "../images/커피전문점.png";
import 패스트푸드 from "../images/패스트푸드.png";
import 편의점 from "../images/편의점.png";

const Context = createContext();

const Provider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  const [brandList] = useState([
    {
      category: "커피전문점",
      brand: ["투썸플레이스", "스타벅스", "이디야"],
      img: 커피전문점,
    },
    { category: "편의점", brand: ["CU", "세븐일레븐", "GS25"], img: 편의점 },
    {
      category: "영화관",
      brand: ["CGV", "메가박스", "롯데시네마"],
      img: 영화관,
    },
    {
      category: "디저트",
      brand: ["베스킨라빈스", "왕가탕후루", "설빙"],
      img: 디저트,
    },
    {
      category: "뷰티헬스",
      brand: ["올리브영", "이니스프리", "미쟝센"],
      img: 뷰티헬스,
    },
    {
      category: "레스토랑",
      brand: ["아웃백", "빕스", "애슐리"],
      img: 레스토랑,
    },
    {
      category: "놀이공원",
      brand: ["롯데월드", "경주월드", "에버랜드"],
      img: 놀이공원,
    },
    {
      category: "숙박",
      brand: ["야놀자", "에어비앤비", "호텔스컴바인"],
      img: 숙박,
    },
    {
      category: "배달",
      brand: ["쿠팡이츠", "배달의민족", "요기요"],
      img: 배달,
    },
    {
      category: "패스트푸드",
      brand: ["롯데리아", "서브웨이", "맥도날드"],
      img: 패스트푸드,
    },
    {
      category: "베이커리",
      brand: ["파리바게트", "뚜레쥬르", "던킨도너츠"],
      img: 베이커리,
    },
    {
      category: "백화점",
      brand: ["세이브존", "뉴코아", "현대백화점"],
      img: 백화점,
    },
    { category: "의류", brand: ["아디다스", "나이키", "뉴발란스"], img: 의류 },
  ]);

  const [dropDown, setDropDown] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  const login = async (data) => {
    const res = await axios.post(ㄷ, data, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  };

  const logout = async () => {
    await axios.get("http://localhost:8080/logout", {
      withCredentials: true,
    });
    setCurrentUser("");
    localStorage.removeItem("currentUser");
  };

  const [rating, setRating] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        isToggled,
        setIsToggled,
        brandList,
        dropDown,
        setDropDown,
        currentUser,
        setCurrentUser,
        login,
        logout,
        rating,
        setRating,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
