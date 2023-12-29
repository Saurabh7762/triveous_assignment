"use client";
import styles from "../styles/TopNewsList.module.css";
import NewsCard from "./NewCards";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useUserData from "./useUserData";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";


export default function TopNewsList() {
  const [news, setNews] = useState([]);
  const userData = useUserData();
  const router = useRouter(); 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (userData && userData.categories && userData.categories.length > 0) {
          const results = await Promise.allSettled(
            userData.categories.map((category) =>
              axios.get(
                `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=0f1bcdf3cf5e4359b4da4eaebd85ceaa`
              )
            )
          );

          const mixedNews = results
            .filter((result) => result.status === "fulfilled")
            .flatMap((result) => result.value.data.articles || []);

          const shuffledNews = mixedNews.sort(() => Math.random() - 0.5);

          setNews(shuffledNews);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [userData]);
   const handleLogout = async () => {
     auth.signOut().then(() => {
       router.push("/login"); // Using Next.js router
     });
   };

  return (
    <div>
      <div className={styles.header}>
        <button className={styles.loginbtn} onClick={handleLogout}>
          Logout
        </button>
        <h1>Top News</h1>
        <h1>Hi {userData && userData.name}!</h1>
      </div>
      <div className={styles.cardnewscontainer}>
        {news.map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}
      </div>
    </div>
  );
}