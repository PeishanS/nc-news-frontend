import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

export default function CommentList({article_id}) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(
      `https://nc-news-wfs6.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load comments.")
        return res.json();
      })
      .then(({ comments }) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setIsLoading(false);
    })
  }, [article_id])
  
  if (isLoading) return <p>Loading comments...</p>;
  if (err) return <p>Error: {err}</p>;

  return (
    <section>
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>Oops! No comments yet.</p>
      ) : (
          <ul>
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id } comment={comment} />
            ))}
          </ul>
      )
    }
    </section>
  )
}