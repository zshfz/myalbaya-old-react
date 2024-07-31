import style from "../styles/Write.module.scss";
import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";

const Write = () => {
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const singleUpdatePost = location.state?.single || {};
  const [title, setTitle] = useState(singleUpdatePost.title || "");
  const [content, setContent] = useState(singleUpdatePost.content || "");

  const handleSubmit = async () => {
    if (singleUpdatePost.id) {
      try {
        await axios.put(
          `http://localhost:8080/posts/${singleUpdatePost.id}`,
          {
            title: title,
            content: content,
          },
          {
            withCredentials: true,
          }
        );
        alert("게시글이 수정되었습니다.");
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:8080/brands/${id.slice(2)}/posts/${
            currentUser.employmentType === "EMPLOYEE" ? "employee" : "boss"
          }/new`,
          {
            title: title,
            content: content,
          },
          {
            withCredentials: true,
          }
        );
        alert("게시글이 등록되었습니다.");
        navigate(`/board/${id}`);
      } catch (error) {
        alert(error.response.data);
      }
    }
  };

  return (
    <div className={style.container}>
      <input
        required
        type="text"
        value={title}
        placeholder="제목"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        required
        value={content}
        placeholder="내용"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <div className={style.buttonGroup}>
        {singleUpdatePost.id ? (
          <button onClick={handleSubmit}>수정</button>
        ) : (
          <button onClick={handleSubmit}>등록</button>
        )}
        <button>이미지 첨부</button>
      </div>
    </div>
  );
};

export default Write;
