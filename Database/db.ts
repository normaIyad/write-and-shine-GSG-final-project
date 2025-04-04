import mysql from "mysql2/promise";
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "NOT SET");
console.log("DB_NAME:", process.env.DB_NAME);

// Database connection settings
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Ensure port is a number
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4_unicode_ci",
});

// Test the database connection
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database connection successful!");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();

export default db;
