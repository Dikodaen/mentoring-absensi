"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState<"admin" | "employee">("admin");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (activeTab === "admin") {
            router.push("/admin/dashboard");
        } else {
            router.push("/employee/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
            <Card className="w-full max-w-[480px] p-8 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Masuk</h1>
                    <p className="text-sm text-slate-500">
                        Silakan masuk untuk melanjutkan ke akun Anda.
                    </p>
                </div>

                <div className="flex mb-8 border-b border-slate-100">
                    <button
                        className={`flex-1 pb-4 text-sm font-medium transition-colors relative ${activeTab === "admin"
                                ? "text-primary"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                        onClick={() => setActiveTab("admin")}
                    >
                        Sebagai Admin
                        {activeTab === "admin" && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                        )}
                    </button>
                    <button
                        className={`flex-1 pb-4 text-sm font-medium transition-colors relative ${activeTab === "employee"
                                ? "text-primary"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                        onClick={() => setActiveTab("employee")}
                    >
                        Sebagai Karyawan
                        {activeTab === "employee" && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                        )}
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="email"
                            placeholder={activeTab === 'admin' ? "admin@gmail.com" : "karyawan@email.com"}
                            defaultValue={activeTab === 'admin' ? "admin@gmail.com" : "jamudin@gmail.com"}
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            defaultValue="password"
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4" size="lg">
                        Masuk
                    </Button>

                    <div className="text-center mt-4">
                        <Link href="#" className="text-xs text-slate-400 hover:text-slate-600">
                            Buat akun
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}
