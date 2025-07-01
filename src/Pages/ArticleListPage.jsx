import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "../components/ArticleCard";
import { useSearchParams } from "react-router-dom";

export default function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticles({sort_by, order})
      .then((articles) => setArticles(articles))
      .finally(() => setIsLoading(false));
  }, [sort_by, order]);

  const handleSortChange = (e) => {
    searchParams.set("sort_by", e.target.value);
    setSearchParams(searchParams);
  };

  const toggleOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
  };

  if (isLoading) return <p>Loading articles...</p>;

  return (
    <main>
      <h2>All Articles</h2>

      <section className="sort-controls">
        <label>
          Sort by:
          <select value={sort_by} onChange={handleSortChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <button onClick={toggleOrder}>
          {order === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>
      </section>

      <ol className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ol>
    </main>
  );
}
