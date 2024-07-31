import style from "../styles/Board.module.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Context } from "../context/Context";
import Pagination from "../components/Pagination";
import 정렬 from "../images/정렬.png";

const Board = () => {
  const { currentUser } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [board, setBoard] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("title");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const canWritePost =
    (id.slice(0, 2) === "알바" && currentUser?.employmentType === "EMPLOYEE") ||
    (id.slice(0, 2) === "사장" && currentUser?.employmentType === "BOSS");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const sortedAndFilteredBoard = board
    .filter((item) => {
      if (searchCategory === "title") {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (searchCategory === "author") {
        return item.author.nickname
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else if (searchCategory === "content") {
        return item.content.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    })
    .sort((a, b) => {
      if (sortConfig.key) {
        const isAsc = sortConfig.direction === "asc";
        if (sortConfig.key === "comments") {
          return isAsc
            ? a.comments.length - b.comments.length
            : b.comments.length - a.comments.length;
        } else {
          return isAsc
            ? a[sortConfig.key] < b[sortConfig.key]
              ? -1
              : 1
            : a[sortConfig.key] > b[sortConfig.key]
            ? -1
            : 1;
        }
      }
      return 0;
    });

  const requestSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = sortedAndFilteredBoard.slice(
    indexOfLastPost - postsPerPage,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/brands/${id.slice(2)}/posts/${
            id.slice(0, 2) === "알바" ? "employee" : "boss"
          }`
        );
        setBoard(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBoard();
  }, [id]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>{id.slice(2)} 게시판</span>
        <div className={style.inputContainer}>
          <select value={searchCategory} onChange={handleCategoryChange}>
            <option value="title">제목</option>
            <option value="author">작성자</option>
            <option value="content">내용</option>
          </select>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className={
            canWritePost ? style.writeButtonVisible : style.writeButtonHidden
          }
          onClick={() => navigate(`/write/${id}`)}
        >
          글쓰기
        </button>
      </div>
      <div className={style.body}>
        <Table hover>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th onClick={() => requestSort("createdAt")}>
                작성일 <img src={정렬} alt="" />
              </th>
              <th onClick={() => requestSort("comments")}>
                댓글 <img src={정렬} alt="" />
              </th>
              <th onClick={() => requestSort("viewCount")}>
                조회수 <img src={정렬} alt="" />
              </th>
              <th onClick={() => requestSort("likeCount")}>
                좋아요 <img src={정렬} alt="" />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item, index) => (
              <tr
                key={index}
                onClick={() => navigate(`/single/${id}/${item.id}`)}
              >
                <td>{item.title}</td>
                <td>{item.author.nickname}</td>
                <td>{item.createdAt.replace("T", " ")}</td>
                <td>{item.comments.length}</td>
                <td>{item.viewCount}</td>
                <td>{item.likeCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={sortedAndFilteredBoard.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Board;
