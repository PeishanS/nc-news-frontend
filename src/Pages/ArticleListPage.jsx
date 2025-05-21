import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((articles) => setArticles(articles))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <main>
      <h2>All Ariticles</h2>
      <ol className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ol>
    </main>
  );
}
