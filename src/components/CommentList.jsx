import { useEffect, useState } from "react";
import { getCommnetsByArticleId } from "../utils/api";
import CommentCard from "./CommentCard";

export default function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const currentUser = "grumpy19";

  const removeCommentFromState = (comment_id) => {
    setComments((curr) => curr.filter((comment) => comment.comment_id !== comment_id))
  }

  useEffect(() => {
    setIsLoading(true);
    getCommnetsByArticleId(article_id)
      .then((comments) => setComments(comments))
      .catch(() => {
        setErr("Failed to load comments");
      })
      .finally(() => setIsLoading(false));
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;
  if (err) return <p>Error: {err}</p>;

  return (
    <section className="comment-list">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>Oops! No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              currentUser={currentUser}
              removeCommentFromState={removeCommentFromState}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
