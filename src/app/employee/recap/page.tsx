"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ArrowLeft, Clock, Calendar as CalendarIcon, FileBarChart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";

export default function RecapPage() {
    const router = useRouter();

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            router.push("/login");
        }
    }, [router]);

    const history = [
        { date: "1 Nov 2025", in: "08:00", out: "17:00", total: "9 jam", status: "Hadir", desc: "-" },
        { date: "2 Nov 2025", in: "08:15", out: "17:10", total: "8 jam 55 menit", status: "Hadir", desc: "-" },
        { date: "3 Nov 2025", in: "-", out: "-", total: "-", status: "Alpha", desc: "Tidak ada keterangan" },
        { date: "4 Nov 2025", in: "-", out: "-", total: "-", status: "Izin", desc: "Sakit" },
        { date: "5 Nov 2025", in: "08:05", out: "17:00", total: "8 jam 55 menit", status: "Hadir", desc: "-" },
        { date: "6 Nov 2025", in: "08:00", out: "17:05", total: "9 jam 5 menit", status: "Hadir", desc: "-" },
        { date: "7 Nov 2025", in: "08:10", out: "17:00", total: "8 jam 50 menit", status: "Hadir", desc: "-" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-4">
                <Link href="/employee/attendance" className="inline-flex items-center text-slate-400 hover:text-slate-600 mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Absensi
                </Link>

                <Card className="w-full p-8 border-none shadow-sm bg-white">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">Rekap Kehadiran Bulanan</h1>
                        <p className="text-sm text-slate-500">Ahmad Hidayat - Staff IT</p>
                    </div>

                    <div className="mb-8">
                        <Button variant="white" className="w-full sm:w-auto justify-between min-w-[200px] text-slate-600">
                            <span>November 2025</span>
                            <CalendarIcon className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-[#00C48C] rounded-[16px] p-6 text-white flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium opacity-90 mb-1">Total Hari Hadir</p>
                                <h3 className="text-3xl font-bold">5</h3>
                            </div>
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="bg-[#E67E22] rounded-[16px] p-6 text-white flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium opacity-90 mb-1">Total Hari Izin</p>
                                <h3 className="text-3xl font-bold">1</h3>
                            </div>
                            <div className="bg-white/20 p-2 rounded-lg">
                                <FileBarChart className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="bg-[#FF3636] rounded-[16px] p-6 text-white flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium opacity-90 mb-1">Total Hari Alpha</p>
                                <h3 className="text-3xl font-bold">1</h3>
                            </div>
                            <div className="bg-white/20 p-2 rounded-lg">
                                <CalendarIcon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-6 text-slate-900">Detail Kehadiran</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Check Out</TableHead>
                                    <TableHead>Total Jam Kerja</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Keterangan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium text-slate-700">{item.date}</TableCell>
                                        <TableCell className="text-slate-500">{item.in}</TableCell>
                                        <TableCell className="text-slate-500">{item.out}</TableCell>
                                        <TableCell className="text-slate-500">{item.total}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === 'Hadir' ? 'success' : item.status === 'Izin' ? 'warning' : 'danger'}
                                                className={item.status === 'Hadir' ? 'bg-emerald-50 text-emerald-600' :
                                                    item.status === 'Izin' ? 'bg-orange-50 text-orange-600' :
                                                        'bg-red-50 text-red-600'}>
                                                {item.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-400">{item.desc}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </Card>
            </div>
        </div>
    );
}
