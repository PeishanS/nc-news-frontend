import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard"

export default function ArticleListPage(){
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://nc-news-wfs6.onrender.com/api/articles")
      .then((res) => res.json())
      .then(({ articles }) => {
        setArticles(articles);
        setIsLoading(false);
    })
  }, [])

  if (isLoading) return <p>Loading articles...</p>
  
  return (
    <main>
      <h2>All Ariticles</h2>
      <ul className="article-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </main>
  )
}