import style from "../styles/Rating.module.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Context } from "../context/Context";
import StarRating from "../components/StarRating";
import 정렬 from "../images/정렬.png";

const Rating = () => {
  const { rating } = useContext(Context);
  const { id } = useParams();
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState([]);

  const handleSubmitReview = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/brands/${id.slice(2)}/review`,
        { content: review, rating: rating },
        { withCredentials: true }
      );
      await axios.get(`http://localhost:8080/brands/${id.slice(2)}/review`, {
        withCredentials: true,
      });
      setReviewList([...reviewList, res.data]);
      setReview("");
      window.location.reload();
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/brands/${id.slice(2)}/review`,
          {
            withCredentials: true,
          }
        );
        setReviewList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getReview();
  }, [id, setReviewList]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <StarRating id={id} />
        <div className={style.formContainer}>
          <input
            type="text"
            placeholder="평점"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <button onClick={handleSubmitReview}>등록</button>
        </div>
      </div>
      <div className={style.body}>
        <Table hover>
          <thead>
            <tr>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>
                평점 <img src={정렬} alt="" />
              </th>
            </tr>
          </thead>
          <tbody>
            {reviewList &&
              reviewList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.content && item.content}</td>
                    <td>{item.author && item.author.nickname}</td>
                    <td>
                      {item.createdAt && item.createdAt.replace("T", " ")}
                    </td>
                    <td>{item.rating && item.rating}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Rating;
