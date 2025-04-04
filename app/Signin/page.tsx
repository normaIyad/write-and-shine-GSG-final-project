
"use client";

import styles from "../Signup/Signup.module.css";
import Link from "next/link";
import React, { useState } from "react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { email: storedEmail, password: storedPassword } =
        JSON.parse(storedUserData);

      if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
      } else {
        alert(" Invalid email or password!");
      }
    } else {
      alert(" No user found. Please sign up first.");
    }

    setEmail("");
    setPassword("");
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
