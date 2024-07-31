import style from "../styles/Single.module.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";
import 삭제 from "../images/삭제.png";
import 수정 from "../images/수정.png";

const Single = () => {
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [single, setSingle] = useState("");
  const [comment, setComment] = useState("");
  const [commentUpdateInputShow, setCommentUpdateInputShow] = useState(false);
  const [commentUpdateValue, setCommentUpdateValue] = useState("");

  const canWriteComment =
    (single.author &&
      single.author.employmentType === "EMPLOYEE" &&
      currentUser?.employmentType === "EMPLOYEE") ||
    (single.author &&
      single.author.employmentType === "BOSS" &&
      currentUser?.employmentType === "BOSS");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`, {
        withCredentials: true,
      });
      alert("게시글이 삭제되었습니다.");
      navigate(`/board/${decodeURIComponent(location.pathname).split("/")[2]}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async () => {
    try {
      await axios.post(
        `http://localhost:8080/posts/${id}/comment`,
        {
          content: comment,
        },
        {
          withCredentials: true,
        }
      );
      setComment("");
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
    }
  };    

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/posts/${id}/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:8080/posts/${id}/comment/${commentId}`,
        { content: commentUpdateValue },
        { withCredentials: true }
      );
      setCommentUpdateValue("");
      setCommentUpdateInputShow(false);
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:8080/posts/${id}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const getSingle = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/posts/${id}`);
        setSingle(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingle();
  }, [id]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.left}>
          <span>{single.title}</span>
          <span
            className={style.author}
            onClick={() => navigate(`/userprofile/${single.author.id}`)}
          >
            {single && single.author.nickname}
          </span>
          <span className={style.date}>
            {single && single.createdAt.replace("T", " ")}
          </span>
          {currentUser && single && currentUser.id === single.author.id ? (
            <>
              <img src={삭제} alt="" onClick={handleDelete} />
              <img
                src={수정}
                alt=""
                onClick={() => navigate(`/write/${id}`, { state: { single } })}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div className={style.right}>
          <span>조회수 {single.viewCount}</span>
          <span>좋아요 {single.likeCount}</span>
        </div>
      </div>
      <div className={style.body}>
        <span>{single.content}</span>
        <div className={style.buttonGroup}>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            목록으로
          </button>
          {currentUser && single && currentUser.id === single.author.id ? (
            ""
          ) : (
            <button onClick={handleLike}>좋아요</button>
          )}
        </div>
      </div>
      <div className={style.commentContainer}>
        <span className={style.commentCount}>
          댓글: {single && single.comments.length}
        </span>
        <div className={style.commentInput}>
          <input
            type="text"
            placeholder="댓글"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            onClick={() => {
              canWriteComment
                ? handleSubmitComment()
                : alert("댓글을 입력하실 수 없습니다.");
            }}
          >
            등록
          </button>
        </div>
        {single &&
          single.comments.map((item, index) => {
            return (
              <div key={index} className={style.commentList}>
                <div className={style.comment}>
                  <div className={style.left}>
                    <span className={style.author}>{item.author.nickname}</span>
                    <span className={style.date}>
                      {item.createdAt.replace("T", " ").slice(0, 19)}
                    </span>
                    <span className={style.replyComment}>답글</span>
                    {commentUpdateInputShow &&
                    item.author.id === currentUser.id ? (
                      <span className={style.updateContent}>
                        <textarea
                          type="text"
                          value={commentUpdateValue}
                          onChange={(e) => {
                            setCommentUpdateValue(e.target.value);
                          }}
                        />
                        <button
                          onClick={() => {
                            handleUpdateComment(item.id);
                          }}
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            setCommentUpdateInputShow(false);
                          }}
                        >
                          취소
                        </button>
                      </span>
                    ) : (
                      <span className={style.content}>{item.content}</span>
                    )}
                  </div>
                  <div className={style.right}>
                    {currentUser.id === item.author.id ? (
                      <>
                        <button
                          onClick={() => {
                            handleDeleteComment(item.id);
                          }}
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => {
                            setCommentUpdateInputShow(true);
                          }}
                        >
                          수정
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Single;
