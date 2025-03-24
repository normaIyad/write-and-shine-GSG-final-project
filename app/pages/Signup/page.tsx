"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Signup.module.css";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("userData", JSON.stringify({ name, email, password }));

    alert("you are login sucssfully !");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Write & Shine</h1>
      <p className={styles.subtitle}>
        Sign up to share and interact with the blogging community.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <p className={styles.hint}>
          Enter a secure password with at least 8 characters, including one
          uppercase letter and one special character (e.g., !@#$).
        </p>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.footerText}>
          Already have an account? <Link href="/Signup">Sign in now</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
