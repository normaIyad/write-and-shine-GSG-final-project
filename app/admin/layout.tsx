import React from "react"

import type { Metadata } from 'next';
import Sidebar from "../Components/adminComponents/Sidebar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'This is admin dashboard',
}

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
        <div className="h-screen overflow-height w-15 lg:w-1/7 bg-white border-gray-300 border-r-2 text-gray-800 p-1 lg:p-5">
          <Sidebar />
        </div>
        <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
          {children}
        </div>
    </div>
  )
}

export default AdminDashboardLayout;