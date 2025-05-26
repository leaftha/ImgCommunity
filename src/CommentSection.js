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
    <div>
      <div>
        <button onClick={handleLike}>👍 좋아요 {likes}</button>
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={3}
        />
        <button type="submit">댓글 작성</button>
      </form>

      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
