import style from "../styles/Footer.module.scss";
import { useContext } from "react";
import { Context } from "../context/Context";

const Footer = () => {
  const { isToggled } = useContext(Context);

  return (
    <div className={isToggled ? style.boss : style.employee}>
      Copyright ⓒ Myalbaya. All rights reserved.
    </div>
  );
};

export default Footer;
