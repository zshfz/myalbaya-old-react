import style from "../styles/Pagination.module.css";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={style.pageItem}>
            <a
              onClick={() => paginate(number)}
              href="#!"
              className={number === currentPage ? style.active : style.pageLink}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
