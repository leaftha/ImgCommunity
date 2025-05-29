import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import "./styles/comment.css";
import "./styles/button.css";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://13.124.227.234/api/comment/${postId}`
        );
        if (!response.ok) {
          throw new Error("댓글을 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {}
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://13.124.227.234/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: postId,
          userId: user.userId,
          content: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error("댓글 작성에 실패했습니다.");
      }

      const fetchResponse = await fetch(
        `http://13.124.227.234/api/comment/${postId}`
      );
      if (!fetchResponse.ok) {
        throw new Error("댓글 목록을 불러오는데 실패했습니다.");
      }
      const updatedComments = await fetchResponse.json();
      setComments(updatedComments);
      setNewComment("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(
        `http://13.124.227.234/api/comment/${commentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("댓글 삭제에 실패했습니다.");
      }
      setComments((prev) =>
        prev.filter((comment) => comment.commentId !== commentId)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const startEditing = (commentId, currentContent) => {
    setEditingId(commentId);
    setEditingText(currentContent);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const submitEdit = async (commentId) => {
    if (!editingText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://13.124.227.234/api/comment/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editingText }),
        }
      );

      if (!response.ok) {
        throw new Error("댓글 수정에 실패했습니다.");
      }

      const updatedComment = await response.json();

      setComments((prev) =>
        prev.map((comment) =>
          comment.commentId === commentId ? updatedComment : comment
        )
      );
      cancelEditing();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="comments-wrapper">
      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            {editingId === comment.commentId ? (
              <>
                <textarea
                  rows={3}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ flex: 1, marginRight: 10 }}
                />
                <div className="comment-btn-group">
                  <button className="btn btn-small" onClick={() => submitEdit(comment.commentId)}>
                    저장
                  </button>
                  <button className="btn btn-small" onClick={cancelEditing}>취소</button>
                </div>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                {user && user.userId === comment.userId && (
                  <div className="comment-btn-group">
                    <button className="btn btn-small"
                      onClick={() =>
                        startEditing(comment.commentId, comment.content)
                      }
                    >
                      수정
                    </button>
                    <button className="btn btn-small" onClick={() => handleDelete(comment.commentId)}>
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={3}
        />
        <button type="submit" className="btn btn-large">댓글 작성</button>
      </form>
    </div>
  );
};

export default Comments;