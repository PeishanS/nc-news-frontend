import { useState } from "react";
import { postComment } from "../utils/api";

export default function CommentForm({ article_id, handleNewComment }) {
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [err, setErr] = useState(null);

  const username = "grumpy19";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setErr("Comment can not be empty.");
      return;
    }

  setIsPosting(true);
  setErr(null);

  postComment(article_id, { username, body })
      .then((newComment) => {
        setBody("");
        setIsPosting(false);
        handleNewComment(newComment);
      })
      .catch(() => {
        setErr("Failed to post comment. Try Again.");
        setIsPosting(false);
      });

  }

  
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label>Add a comment: 
        <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
          disabled={isPosting}
          rows={4}
        required
      />
      </label>
      <br />
      <button type="submit" disabled={isPosting}>
        {isPosting? "Posting..." : "Post comment"}
      </button>
      {err && <p className="err">{err}</p>}
    </form>
  )

}