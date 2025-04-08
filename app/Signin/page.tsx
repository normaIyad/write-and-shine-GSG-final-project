"use client";

import styles from "../Signup/Signup.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/useUserStore";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setLoginFromToken } = useUserStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Server responded with:", responseData);
        alert(responseData.error || "Login failed");
        return;
      }

      alert("Login successful!");
      localStorage.setItem("userToken", responseData.token);
      setLoginFromToken(responseData.token);
      setEmail("");
      setPassword("");
      router.push("/"); 

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Write & Shine</h1>
      <p className={styles.subtitle}>Sign in to your account</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Sign In
        </button>
        <p className={styles.footerText}>
          Don’t have an account? <Link href="/Signup">Sign up now</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
