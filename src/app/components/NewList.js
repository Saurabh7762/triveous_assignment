// components/News.js
"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/News.module.css";

const NewList = ({ searchTerm }) => {
  const [newsData, setNewsData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = searchTerm || "apple"; // Use 'apple' if searchTerm is empty
        setQuery(query);
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&apiKey=0f1bcdf3cf5e4359b4da4eaebd85ceaa`
        );
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const defaultImageUrl = "default.png";

  return (
    <div>
      <h2>{query} News</h2>
      <ul className={styles.newsList}>
        {newsData.map((article) => (
          <li key={article.title} className={styles.newsCard}>
            {article.urlToImage ? (
              <img
                className={styles.picture}
                src={article.urlToImage}
                alt={article.title}
              />
            ) : (
              <img
                className={styles.picture}
                src={defaultImageUrl}
                alt="Default"
              />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>Author: {article.author}</p>
            <p>Published At: {article.publishedAt}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewList;
