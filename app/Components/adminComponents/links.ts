import {
  ClipboardPlus,
  User,
  UserRound,
  Home,
  NotepadText,
  Package,
  PackagePlus,
  Settings,
  ShoppingBag,
  UserCheck,
  UserPlus,
  Users,
  Store,
  BriefcaseMedical,
  HousePlus,
  House,
  GraduationCap,
  BookText,
  MessageSquareText
} from "lucide-react";



export const links: Array<{ label: string; icon: typeof Home; path: string }> = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/admin",
  },
  {
    label: "Posts",
    icon: BookText,
    path: "/admin/posts",
  },
  {
    label: "Comments",
    icon: MessageSquareText,
    path: "/admin/comments",
  },
];
