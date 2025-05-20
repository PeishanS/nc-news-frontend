import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleListPage from "./Pages/ArticleListPage";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleListPage />} />
      </Routes>
    </>
  );
}

export default App;
