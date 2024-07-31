import style from "../styles/CardSection.module.scss";
import { Card, Dropdown } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const CardSection = (props) => {
  const { isToggled } = useContext(Context);
  const navigate = useNavigate();

  return (
    <Card className={style.container}>
      <Card.Body>
        <Card.Title>
          <img src={props.item.img} alt="" />
          {props.item.category}
        </Card.Title>
        <Card.Text>{props.item.brand.join(", ")}</Card.Text>
        <div className={style.dropDownButton}>
          <Dropdown>
            <Dropdown.Toggle
              className={isToggled ? style.boss : style.employee}
            >
              게시판
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.item.brand.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      navigate(`/board/${isToggled ? "사장" : "알바"}${item}`);
                    }}
                  >
                    {item}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              className={isToggled ? style.boss : style.employee}
            >
              평점 게시판
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.item.brand.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    onClick={() => {
                      navigate(`/rating/${isToggled ? "사장" : "알바"}${item}`);
                    }}
                  >
                    {item}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardSection;
