import style from "../styles/Main.module.scss";
import { useContext } from "react";
import { Context } from "../context/Context";
import CardSection from "../components/CardSection";

const Main = () => {
  const { brandList } = useContext(Context);

  return (
    <div className={style.container}>
      <div className={style.board}>
        <div className={style.popularBoard}>
          <span>인기 게시판</span>
        </div>
        <div className={style.entireBoard}>
          <span>통합 게시판</span>
        </div>
        <div className={style.hireBoard}>
          <span>채용공고 게시판</span>
        </div>
      </div>
      <div className={style.card}>
        {brandList.map((item, index) => {
          return <CardSection key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Main;
