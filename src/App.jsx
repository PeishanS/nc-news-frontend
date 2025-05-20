import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleListPage from "./Pages/ArticleListPage";
import ArticlePage from "./Pages/ArticlePage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </>
  );
}

export default App;
