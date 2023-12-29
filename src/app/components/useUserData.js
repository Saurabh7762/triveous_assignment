// useUserData.js
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

const useUserData = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userUID = authUser.uid;
        //console.log(userUID)
        const docRef = doc(db, "users", userUID);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        const userData = docSnap.data();
        setUser(userData);
      } else {
        console.log("Sign out");
        <Link href="/login">Login</Link>;
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useUserData;
