import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ArticlePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const url = searchParams.get("url");
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          url
        )}&apiKey=c7f73cd0b5b042b391c5e44b021623ff`
      );
      setArticle(response.data.articles[0]);
    };

    fetchArticle();
  }, [url]);
  console.log(url);
  if (!article) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    urlToImage,
    source: { name: sourceName },
    author,
    publishedAt,
    content,
  } = article;

  return (
    <div>
      <h1>{title}</h1>
      <p>
        {sourceName} - {author} - {publishedAt}
      </p>
      {urlToImage && <img src={urlToImage} alt="" />}
      <p>{description}</p>
      <p>{content}</p>
    </div>
  );
};

export default ArticlePage;
