"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, doc, setDoc } from "../firebase"; // Update the import statement
import Link from "next/link";
import styles from "./signup.module.css";

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateCategories(user.uid);
      console.log("Sucess");

      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const updateCategories = async (userId) => {
    try {
      // Use setDoc to add user data to Firestore
      await setDoc(doc(db, "users", userId), {
        name,
        categories: selectedCategories,
      });
    } catch (error) {
      console.error("Error updating categories:", error.message);
    }
  };

  return (
    <>
      <div className={styles.loginbody}>
        <div className={styles.Signupcard}>
          <h1>Signup</h1>
          <label className={styles.loginemail}>
            Name:
            <input
              className={styles.loginemailinp}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <div>
            <p>Select Categories:</p>
            <label>
              Sports
              <input
                type="checkbox"
                checked={selectedCategories.includes("Sports")}
                onChange={() => handleCategoryChange("Sports")}
              />
            </label>
            <label>
              Business
              <input
                type="checkbox"
                checked={selectedCategories.includes("Business")}
                onChange={() => handleCategoryChange("Business")}
              />
            </label>
            <label>
              Health
              <input
                type="checkbox"
                checked={selectedCategories.includes("Health")}
                onChange={() => handleCategoryChange("Health")}
              />
            </label>
            <label>
              Science
              <input
                type="checkbox"
                checked={selectedCategories.includes("Science")}
                onChange={() => handleCategoryChange("Science")}
              />
            </label>
          </div>
          <button className={styles.loginbtn} onClick={handleSignup}>
            Signup
          </button>
          <Link href="/login">Have an Account?</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
