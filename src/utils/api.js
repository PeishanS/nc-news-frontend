import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-wfs6.onrender.com/api",
});

export const getArticles = (params = {}) => {
  return api.get("/articles", { params }).then(({ data }) => data.articles);
};

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => data.article);
};

export const getCommnetsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then(({ data }) => data.comments);
};

export const patchArticleVotes = (article_id, voteChange) => {
  return api.patch(`/articles/${article_id}`, { voteChange });
};

export const postComment = (article_id, comment) => {
  return api
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data }) => data.comment);
};

export const deleteComment = (comment_id) => {
  return api
    .delete(`/comments/${comment_id}`);
};
