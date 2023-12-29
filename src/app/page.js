"use client";
// pages/index.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { auth } from "./firebase";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <div>Loading...</div>;
};

export default Home;