"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await authService.login(formData.email, formData.password);

            // Redirect based on role
            if (response.user.role === 'admin') {
                router.push("/admin/dashboard");
            } else if (response.user.role === 'karyawan') {
                router.push("/employee/attendance");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Terjadi kesalahan saat login");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
            <Card className="w-full max-w-[400px] p-8 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Masuk</h1>
                    <p className="text-sm text-slate-500">
                        Masukan email dan password untuk melanjutkan
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email atau Username</label>
                        <Input
                            type="text"
                            placeholder="Contoh: user@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <Input
                            type="password"
                            placeholder="Masukan password anda"
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6"
                        size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Memproses..." : "Masuk"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
