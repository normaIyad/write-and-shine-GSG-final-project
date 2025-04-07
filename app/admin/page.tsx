"use client";

import { useEffect, useState } from "react";

export default function StatsSection() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalComments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/states");
      const data = await res.json();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold">{stats.totalPosts}</h2>
        <p className="text-gray-500">Total Posts</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold">{stats.totalUsers}</h2>
        <p className="text-gray-500">Total Users</p>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold">{stats.totalComments}</h2>
        <p className="text-gray-500">Total Comments</p>
      </div>
    </div>
  );
}
