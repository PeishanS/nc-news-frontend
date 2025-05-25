import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleListPage from "./Pages/ArticleListPage";
import ArticlePage from "./Pages/ArticlePage";
import TopicPage from "./Pages/TopicPage";
import TopicList from "./components/TopicList";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <TopicList />
      <Routes>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
      </Routes>
    </>
  );
}

export default App;