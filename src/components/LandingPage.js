import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=c7f73cd0b5b042b391c5e44b021623ff`
      );
      setNews(response.data.articles);
    };

    fetchTopHeadlines();
  }, []);

  return (
    <div>
      <h1>Top Headlines</h1>
      <div className="card-container">
        {news.map((article) => (
          <div key={article.url} className="card">
            <img src={article.urlToImage} alt="" />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <Link to={{ pathname: "/article", search: `?url=${article.url}` }}>
              Read Full Article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
