import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://13.124.227.234/api/post/all", {
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
  return (
    <div>
      <Link to="/new">새로운 게시물</Link>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.postId}`} state={{ post }}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
