import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./comment";
import { useAuth } from "./context/AuthContext";
import "./styles/post.css";
import "./styles/button.css";

const Post = () => {
  const location = useLocation();
  const { post } = location.state || {};

  const [postUser, setPostUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!post) return;

    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const response = await fetch(
          `https://13.124.227.234/api/users/id/${post.userId}`
        );
        if (!response.ok) {
          throw new Error("회원 정보를 불러오는데 실패했습니다.");
        }
        const userData = await response.json();
        setPostUser(userData);
      } catch (error) {
        setErrorUser(error.message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [post]);

  if (!post) {
    return <p>게시물 데이터를 찾을 수 없습니다.</p>;
  }
  const imageUrl = `https://13.124.227.234/api/post?file=${encodeURIComponent(
    post.imageUrl
  )}`;

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://13.124.227.234/api/post/${post.postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("게시글 삭제에 실패했습니다.");
      }

      alert("게시글이 삭제되었습니다.");
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="post">
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.caption}</p>
        <img src={imageUrl} alt={post.title} />
        {user && postUser && user.userId === postUser.userId && (
          <button className="btn btn-small" onClick={handleDeletePost}>
            삭제
          </button>
        )}
        <hr />
        {loadingUser && <p>회원 정보를 불러오는 중...</p>}
        {errorUser && <p className="post-error">{errorUser}</p>}
        {postUser && (
          <div>
            <h3>작성자 정보</h3>
            <p>이름: {postUser.name || "이름 정보 없음"}</p>
            <p>이메일: {postUser.email || "이메일 정보 없음"}</p>
          </div>
        )}
        <Comments postId={post.postId} />
      </div>
    </div>
  );
};

export default Post;
