"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Signup.module.css";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  type UserRole = "user" | "admin";
const [role, setRole] = useState<UserRole | "">("");

const handleChange = (event: SelectChangeEvent<string>) => {
  setRole(event.target.value as UserRole);
};

  const ApiaddUser = () => {
    const data = {
      username: name,
      email: email,
      password: password,
      role: role,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/auth/signup", options)
      .then(async (res) => {
        const responseData = await res.json();
        if (!res.ok) {
          console.error("Server responded with:", responseData);
          alert(responseData.error || "Signup failed");
          return;
        }

        alert("You are registered successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        router.push("/Signin");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        alert("Network error. Please try again.");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      alert(
        "Password must be at least 8 characters long, include an uppercase letter and a special character."
      );
      return;
    }

    ApiaddUser();
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
        <Select
          id="role"
          value={role}
          onChange={handleChange}
          displayEmpty
          className={styles.input}
        >
          <MenuItem value="">
            <em>Choose role</em>
          </MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>

        <p className={styles.hint}>
          Enter a secure password with at least 8 characters, including one
          uppercase letter and one special character (e.g., !@#$).
        </p>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={styles.footerText}>
          Already have an account? <Link href="/Signin">Sign in now</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
