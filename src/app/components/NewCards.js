import React from "react";
import styles from "../styles/TopNewsList.module.css";


const truncateTitle = (title, maxLength) => {
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};


const NewsCard = ({ article }) => {
  const defaultImageUrl ="default.png";
  const truncatedTitle = truncateTitle(article.title, 50);

  return (
    <>
      <a
        className={styles.alt}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.cardnewscard}>
          <div className={styles.cardneswtext}>
            <h3>{truncatedTitle}</h3>
          </div>
          {/* <a href={article.url} target="_blank" rel="noopener noreferrer">
        <button className={styles.cardbtn}>Read More</button>
      </a> */}
          {article.urlToImage ? (
            <img
              className={styles.cardpicture}
              src={article.urlToImage}
              alt={article.title}
            />
          ) : (
            <img
              className={styles.cardpicture}
              src={defaultImageUrl}
              alt="Default"
            />
          )}

          {/* You can add more details as needed */}
        </div>
      </a>
    </>
  );
};

export default NewsCard;
