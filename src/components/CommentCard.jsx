import { useState } from "react";
import { deleteComment } from "../utils/api";

export default function CommentCard({ comment, currentUser, removeCommentFromState}) {
  const { comment_id, author, body, created_at } = comment;
  const [isDeleting, setIsDeleting] = useState(false);
  const [err, setErr] = useState(null);

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setErr(null);

    deleteComment(comment_id)
      .then(() => {
      removeCommentFromState(comment_id)
      })
      .catch(() => {
        setErr("Failed to delete comment.");
        setIsDeleting(false)
    })
  }

  return (
    <li className="comment-card">
      <p><strong>{author}</strong> -- {new Date(created_at).toLocaleDateString() }</p>
      <p>{body}</p>

      {author === currentUser && (
        <button onClick={handleDeleteClick} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete" }</button>
      )}

      {err && <p className="err">{err}</p>}
    </li>
  )
}