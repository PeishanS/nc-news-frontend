import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import CommentList from "../components/CommentList";
import VoteButtons from "../components/VoteButtons";
import CommentForm from "../components/CommentForm";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticle(article);
      })
      .catch(() => {
        setErr("Failed to load article.");
      })
      .finally(() => setIsLoading(false));
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (err) return <p>Error: {err}</p>;

  const { title, author, body, created_at, votes, topic, article_img_url } =
    article;
  
  const handleNewComment = (newComment) => {
    setComments((curr) => [newComment, ...curr])
  }

  return (
    <main className="article-page">
      <h2>{title}</h2>
      {article_img_url && (
        <img
          src={article_img_url}
          alt={`Thumbnail for "${title}"`}
          className="article-image"
        />
      )}
      <p>
        by <strong>{author}</strong> --{" "}
        {new Date(created_at).toLocaleDateString()}
      </p>
      <p>
        <strong>Topic: </strong>
        {topic}
      </p>
      <article>{body}</article>
      <VoteButtons article_id={article_id} initialVotes={votes} />
      <CommentList article_id={article_id} />
      <CommentForm article_id={article_id} handleNewComment={handleNewComment} />
    </main>
  );
}
