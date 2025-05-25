import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";

export default function TopicPage() {
  const {slug} = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles({ topic: slug })
      .then((articles) => { setArticles(articles) })
      .catch(() => setErr("Failed to load the topic articles."))
      .finally(() => setIsLoading(false));
  }, [slug])

  if (isLoading) return <p>Loading articles...</p>;
  if (err) return <p>{err}</p>;

  return (
    <main>
      <h2>Articles about "{slug}"</h2>
      <ul>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </main>
  )
}