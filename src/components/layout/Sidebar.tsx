"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Clock, Monitor, LogOut } from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        title: "Karyawan",
        icon: Users,
        href: "/admin/employees",
    },
    {
        title: "Absensi",
        icon: Clock,
        href: "/admin/attendance",
    },
    {
        title: "Monitoring",
        icon: Monitor,
        href: "/admin/monitoring",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-slate-100 flex flex-col">
            <div className="flex h-16 items-center px-6 border-b border-slate-50">
                <div className="flex items-center gap-2 text-primary">
                    <Clock className="h-6 w-6" />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold leading-none text-slate-900">Absensi</span>
                        <span className="text-[10px] text-slate-500">Admin Panel</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    )
                })}
            </div>

            <div className="p-4 border-t border-slate-50">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        AD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">Admin User</span>
                        <span className="text-xs text-slate-400">admin@gmail.com</span>
                    </div>
                </div>
                <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
