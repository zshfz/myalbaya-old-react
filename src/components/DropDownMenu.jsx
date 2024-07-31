import style from "../styles/DropDownMenu.module.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const DropDownMenu = () => {
  const { isToggled, brandList, dropDown, setDropDown } = useContext(Context);
  const navigate = useNavigate();
  const [whichMenuSelected, setWhichMenuSelected] = useState(true);

  return (
    <div className={isToggled ? style.boss : style.employee}>
      <div className={style.header}>
        <span
          className={whichMenuSelected ? style.opaque : style.transparent}
          onClick={() => {
            setWhichMenuSelected(true);
          }}
        >
          전체 게시판
        </span>
        <span
          className={whichMenuSelected ? style.transparent : style.opaque}
          onClick={() => {
            setWhichMenuSelected(false);
          }}
        >
          전체 평점 게시판
        </span>
      </div>
      <div className={style.body}>
        {brandList.map((item1, index1) => {
          return (
            <div key={index1} className={style.category}>
              <span className={style.categoryHeader}>{item1.category}</span>
              <div className={style.brand}>
                {item1.brand.map((item2, index2) => {
                  return (
                    <span
                      key={index2}
                      className={style.brandBody}
                      onClick={() => {
                        setDropDown(!dropDown);
                        navigate(
                          `/${whichMenuSelected ? "board" : "rating"}/${
                            isToggled ? "사장" : "알바"
                          }${item2}`
                        );
                      }}
                    >
                      {item2}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropDownMenu;
