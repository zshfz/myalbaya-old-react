import style from "../styles/Message.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Message = () => {
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState("");

  useEffect(() => {
    const getMessageList = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/messages/conversations",
          {
            withCredentials: true,
          }
        );
        setMessageList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessageList();
  }, []);

  console.log(messageList);
  console.log(currentUser);

  return (
    <div className={style.container}>
      <span className={style.title}>메세지 목록</span>
      {messageList.length > 0 ? (
        messageList.map((item, index) => {
          return (
            <div
              key={index}
              className={style.message}
              onClick={() => {
                currentUser.id === item.latestMessage.sender.id
                  ? navigate(`/messagedetail/${item.latestMessage.receiver.id}`)
                  : navigate(`/messagedetail/${item.latestMessage.sender.id}`);
              }}
            >
              <span className={style.nickname}>
                {currentUser.nickname === item.latestMessage.sender.nickname
                  ? item.latestMessage.receiver.nickname
                  : item.latestMessage.sender.nickname}
              </span>
              <span className={style.date}>
                {item.latestMessage.sentAt.replace("T", " ")}
              </span>
              <span className={style.content}>
                {item.latestMessage.content}
              </span>
            </div>
          );
        })
      ) : (
        <span>주고 받은 메세지가 없습니다.</span>
      )}
    </div>
  );
};

export default Message;
