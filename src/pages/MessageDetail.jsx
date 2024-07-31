import style from "../styles/MessageDetail.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";

const Message = () => {
  const { currentUser } = useContext(Context);
  const { id } = useParams();
  const [messageDetail, setMessageDetail] = useState("");

  useEffect(() => {
    const getMessageDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/messages/conversation/${id}`,
          {
            withCredentials: true,
          }
        );
        setMessageDetail(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessageDetail();
  }, [id]);

  console.log(messageDetail);

  return (
    <div className={style.container}>
      <span className={style.title}>메세지 목록</span>
      {messageDetail &&
        messageDetail.map((item, index) => {
          return (
            <div
              key={index}
              className={
                currentUser.id === item.sender.id ? style.myself : style.message
              }
            >
              <span className={style.nickname}>{item.sender.nickname}</span>
              <span className={style.date}>
                {item.sentAt.replace("T", " ")}
              </span>
              <span className={style.content}>{item.content}</span>
            </div>
          );
        })}
    </div>
  );
};

export default Message;
