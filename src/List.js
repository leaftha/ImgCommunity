import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/list.css";
import "./styles/button.css";

const POSTS_PER_PAGE = 10;

const List = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://13.124.227.234/api/post/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("게시물 불러오기 실패");
        }

        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    };

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="list">
      <div className="list-header">
        <h1>게시물 목록</h1>
        <Link to="/new" className="btn btn-small">
          새로운 게시물
        </Link>
      </div>

      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.postId}`} state={{ post }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            className={`btn btn-small ${num === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
