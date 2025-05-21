import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-wfs6.onrender.com/api",
});

export const getArticles = (params = {}) => {
  return api
    .get("/articles", { params })
    .then(({ data }) => data.articles)
};

export const getArticleById = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then(({ data }) => data.article)
};

export const getCommnetsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => data.comments);
};
