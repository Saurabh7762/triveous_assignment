"use client";
/* eslint-disable react/no-unescaped-entities */ 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Link from "next/link";
import styles from "./login.module.css";


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home"); // Redirect to dashboard or any other page after successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <div className={styles.loginbody}>
        <div className={styles.logincard}>
          <h1>Login</h1>
          <label className={styles.loginemail}>
            Email:
            <input
              className={styles.loginemailinp}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.loginemail}>
            Password:
            <input
              className={styles.loginemailinp}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className={styles.loginbtn} onClick={handleLogin}>
            Login
          </button>
          <Link href="/signup">Don't have an Account?</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
