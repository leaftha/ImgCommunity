import { useState } from "react";

const CommentSection = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div>
        <button onClick={handleLike}>👍 좋아요 {likes}</button>
      </div>

      <form onSubmit={handleCommentSubmit} style={{ marginTop: "1rem" }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={3}
          style={{ width: "100%", padding: "8px" }}
        />
        <button type="submit" style={{ marginTop: "8px" }}>
          댓글 작성
        </button>
      </form>

      <ul style={{ marginTop: "1rem" }}>
        {comments.map((comment, index) => (
          <li
            key={index}
            style={{ padding: "6px 0", borderBottom: "1px solid #ddd" }}
          >
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
