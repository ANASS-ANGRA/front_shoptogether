import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewFasTArticlePage from "../pages/newfastArticle";
import PageArticles from "../pages/Articles";
import PageArticlesProduits from "../pages/ArticleProduits";

export default function IndexRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewFasTArticlePage />} />
        <Route path="/articles" element={<PageArticles />} />
        <Route path="/article/:id" element={<PageArticlesProduits />} />
      </Routes>
    </BrowserRouter>
  );
}
