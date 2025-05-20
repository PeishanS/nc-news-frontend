import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/CommentList";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nc-news-wfs6.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load article.");
        return res.json();
      })
      .then(({ article }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setIsLoading(false);
    })
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (err) return <p>Error: {err}</p>;

  const { title, author, body, created_at, votes, topic, article_img_url } = article;
  
  return (
    <main>
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
      <p><strong>Votes: </strong>{votes}</p>
      <article>{body}</article>
      <CommentList article_id={article_id} />
    </main>
  );

}