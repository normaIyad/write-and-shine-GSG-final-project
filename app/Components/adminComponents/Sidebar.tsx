"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";

const links = [
  { label: "Dashboard", icon: <CgMenuGridR size={22} />, href: "/admin" },
  {
    label: "Posts",
    icon: <MdOutlineArticle size={22} />,
    href: "/admin/posts",
  },
  {
    label: "Comments",
    icon: <FaRegComments size={22} />,
    href: "/admin/comments",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col px-4 py-6 bg-white w-full max-w-[240px] border-r border-gray-200 shadow-sm h-screen">
      <div className="mb-10">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-2xl font-semibold text-[#3674b5] hover:text-blue-600 transition"
        >
          <CgMenuGridR className="text-3xl" />
          <span className="hidden lg:inline">Admin Panel</span>
        </Link>
      </div>

      <ul className=" w-full">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center sm:gap-0 lg:gap-3 md:px-3 md:py-2 rounded-lg text-base transition 
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#3674b5]"
                  }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
