import { Link } from "react-router-dom";

export default function ArticleCard({article}) {
  const {
    article_id,
    title,
    author,
    topic,
    created_at,
    comment_count,
    votes,
    article_img_url,
  } = article;

  return (
    <li className="article-card">
      <Link to={`/articles/${article_id}`}>
        <h3>{title}</h3>
        {article_img_url && (
          <img src={article_img_url} alt={`Thumbnail for "${title}"`} className="article-image" />
        )}
      </Link>
      <p>
        by <strong>{author}</strong> -- {new Date(created_at).toLocaleDateString()}
      </p>
      <p>Comment_Count: {comment_count}</p>
      <p>Topic: {topic}</p>
      <p>Votes: {votes}</p>
    </li>
  );
}