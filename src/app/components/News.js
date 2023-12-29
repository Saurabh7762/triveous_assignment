// pages/index.js
"use client";
import Head from "next/head";
import { useState } from "react";
import NewList from "./NewList";
import useUserData from "./useUserData"; 

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const userData = useUserData(); 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const categories = userData ? userData.categories : [];

  return (
    <div>
      <Head>
        <title>My News App</title>
      </Head>

      <main>
        <h1>Welcome to My News App</h1>
        <input
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {categories.map((category) => (
          <button key={category} value={category} onClick={handleSearch}>
            {category}
          </button>
        ))}
        <NewList searchTerm={searchTerm} />
      </main>
    </div>
  );
}
