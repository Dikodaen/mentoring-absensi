"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";
import { Calendar as CalendarIcon, Upload, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

interface AttendanceRecord {
    day: string;
    time: string;
    status: "hadir" | "izin" | "alpha" | "telat";
    date: string;
}

export default function EmployeeAttendancePage() {
    const router = useRouter();
    // Timer State
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    // Attendance State
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [todayStatus, setTodayStatus] = useState<"none" | "hadir" | "izin">("none");

    // Sample history for Employee
    const [history, setHistory] = useState<AttendanceRecord[]>([
        { day: "Senin", time: "08:00 - 17:00", status: "hadir", date: "2024-01-01" },
        { day: "Selasa", time: "08:00 - 17:00", status: "hadir", date: "2024-01-02" },
        { day: "Rabu", time: "08:00 - 17:00", status: "hadir", date: "2024-01-03" },
    ]);

    // Modal State
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [permissionForm, setPermissionForm] = useState({
        type: "Sakit",
        date: "",
        reason: "",
    });

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            router.push("/login");
        }
    }, [router]);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).replace(/\./g, ":");
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const handleCheckIn = () => {
        if (!currentTime) return;
        const now = currentTime;
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const newRecord: AttendanceRecord = {
            day: now.toLocaleDateString("id-ID", { weekday: "long" }),
            time: `${timeString} - --`,
            status: "hadir",
            date: now.toISOString().split('T')[0]
        };

        setHistory([newRecord, ...history]);
        setIsCheckedIn(true);
        setTodayStatus("hadir");
    };

    const handleCheckOut = () => {
        if (!currentTime) return;
        const now = currentTime;
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const updatedHistory = [...history];
        if (updatedHistory.length > 0 && updatedHistory[0].date === now.toISOString().split('T')[0]) {
            const startTime = updatedHistory[0].time.split(' - ')[0];
            updatedHistory[0].time = `${startTime} - ${timeString}`;
            setHistory(updatedHistory);
        }

        setIsCheckedOut(true);
    };

    const handlePermissionSubmit = () => {
        const permissionDate = new Date(permissionForm.date || new Date());

        const newRecord: AttendanceRecord = {
            day: permissionDate.toLocaleDateString("id-ID", { weekday: "long" }),
            time: "Izin",
            status: "izin",
            date: permissionForm.date
        };

        const todayStr = new Date().toISOString().split('T')[0];
        if (permissionForm.date === todayStr) {
            setTodayStatus("izin");
        }

        setHistory([newRecord, ...history]);
        setIsPermissionModalOpen(false);
        setPermissionForm({ type: "Sakit", date: "", reason: "" });

        alert("Pengajuan izin berhasil dikirim.");
    };

    const handleLogout = () => {
        authService.logout();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div>
                        <h1 className="font-bold text-lg text-slate-800">Sistem Absensi</h1>
                        <p className="text-xs text-slate-500">Karyawan</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4" />
                        Keluar
                    </Button>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
                <Card className="w-full p-6 md:p-8 border border-slate-100 shadow-sm bg-white rounded-xl">
                    <div className="bg-slate-50 rounded-[16px] p-8 mb-8 border border-slate-100 relative">
                        {/* Realtime Clock */}
                        <div className="flex flex-col items-center justify-center mb-8 text-center">
                            <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">Waktu Sekarang</p>
                            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight tabular-nums mb-2">
                                {currentTime ? formatTime(currentTime) : "00:00:00"}
                            </h2>
                            <p className="text-lg text-slate-600 font-medium">
                                {currentTime ? formatDate(currentTime) : "..."}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        {todayStatus !== "izin" && (
                            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mt-8">
                                <Button
                                    className="h-14 text-lg w-full bg-[#00A3FF] hover:bg-[#0092E6]"
                                    onClick={handleCheckIn}
                                    disabled={isCheckedIn}
                                >
                                    {isCheckedIn ? "Sudah Check In" : "Check In"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-14 text-lg w-full bg-white"
                                    onClick={handleCheckOut}
                                    disabled={!isCheckedIn || isCheckedOut}
                                >
                                    {isCheckedOut ? "Sudah Check Out" : "Check Out"}
                                </Button>
                            </div>
                        )}

                        <div className="max-w-lg mx-auto mt-4">
                            <Button
                                variant="white"
                                className="w-full text-slate-500 hover:text-slate-700 bg-transparent border-0 hover:bg-slate-100/50"
                                onClick={() => setIsPermissionModalOpen(true)}
                            >
                                Ajukan Izin
                            </Button>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-900">Riwayat Kehadiran Minggu Ini</h3>
                            <Link href="/employee/recap">
                                <Button variant="ghost" size="sm" className="text-[#00A3FF] hover:text-[#0092E6] hover:bg-blue-50">
                                    Lihat Rekap Bulanan
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {history.map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{item.day}</p>
                                        <p className="text-xs text-slate-400">{item.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="mb-1">
                                            <Badge
                                                variant={item.status === 'hadir' ? 'success' : item.status === 'izin' ? 'warning' : 'danger'}
                                                className={
                                                    item.status === 'hadir' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                        item.status === 'izin' ? "bg-yellow-50 text-yellow-600 border-yellow-100" :
                                                            "bg-red-50 text-red-600 border-red-100"
                                                }
                                            >
                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-slate-500">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 md:hidden">
                            <Link href="/employee/recap">
                                <Button variant="white" className="w-full text-slate-600 border border-slate-200">
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    Lihat Rekap Bulanan
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </main>

            {/* Permission Modal */}
            <Modal
                isOpen={isPermissionModalOpen}
                onClose={() => setIsPermissionModalOpen(false)}
                title="Ajukan Izin"
            >
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Jenis Izin</label>
                        <Select
                            options={[
                                { label: "Sakit", value: "Sakit" },
                                { label: "Cuti", value: "Cuti" },
                                { label: "Izin Pribadi", value: "Izin Pribadi" },
                            ]}
                            value={permissionForm.type}
                            onChange={(e) => setPermissionForm({ ...permissionForm, type: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Tanggal Izin</label>
                        <Input
                            type="date"
                            value={permissionForm.date}
                            onChange={(e) => setPermissionForm({ ...permissionForm, date: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Alasan</label>
                        <Textarea
                            placeholder="Jelaskan alasan izin anda..."
                            value={permissionForm.reason}
                            onChange={(e) => setPermissionForm({ ...permissionForm, reason: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Upload Bukti (Opsional)</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors cursor-pointer text-center">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-xs">Klik untuk upload surat dokter atau bukti lainnya</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                        <Button
                            variant="default"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                            onClick={() => setIsPermissionModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            className="bg-[#00A3FF] hover:bg-[#0092E6] text-white"
                            onClick={handlePermissionSubmit}
                        >
                            Kirim Izin
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
