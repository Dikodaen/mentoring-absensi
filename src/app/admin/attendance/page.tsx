"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Select } from "@/components/ui/Select";
import { ArrowLeft, Clock, Calendar as CalendarIcon, FileBarChart, User as UserIcon, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

// --- Types ---
type AttendanceStatus = "Hadir" | "Izin" | "Alpha";

interface DailyRecord {
    date: string; // YYYY-MM-DD
    in: string;
    out: string;
    total: string; // "X jam Y menit" or "-"
    status: AttendanceStatus;
    desc: string;
}

interface Employee {
    id: string;
    name: string;
    position: string;
    history: DailyRecord[];
}

// --- Mock Data ---
const EMPLOYEES: Employee[] = [
    {
        id: "1",
        name: "Andreas Santoso",
        position: "Staff IT",
        history: [
            // November 2025
            { date: "2025-11-01", in: "08:00", out: "17:00", total: "9 jam", status: "Hadir", desc: "-" },
            { date: "2025-11-02", in: "08:15", out: "17:10", total: "8 jam 55 menit", status: "Hadir", desc: "-" },
            { date: "2025-11-03", in: "-", out: "-", total: "-", status: "Alpha", desc: "Tidak ada keterangan" },
            { date: "2025-11-04", in: "-", out: "-", total: "-", status: "Izin", desc: "Sakit" },
            { date: "2025-11-05", in: "08:05", out: "17:00", total: "8 jam 55 menit", status: "Hadir", desc: "-" },
            // October 2025
            { date: "2025-10-01", in: "08:00", out: "17:00", total: "9 jam", status: "Hadir", desc: "-" },
        ]
    },
    {
        id: "2",
        name: "Budi Pratama",
        position: "Marketing",
        history: [
            { date: "2025-11-01", in: "08:30", out: "17:30", total: "9 jam", status: "Hadir", desc: "-" },
            { date: "2025-11-02", in: "-", out: "-", total: "-", status: "Izin", desc: "Cuti Tahunan" },
            { date: "2025-11-03", in: "08:30", out: "17:30", total: "9 jam", status: "Hadir", desc: "-" },
        ]
    },
    {
        id: "3",
        name: "Siti Aminah",
        position: "HRD",
        history: [
            { date: "2025-11-01", in: "08:00", out: "17:00", total: "9 jam", status: "Hadir", desc: "-" },
            { date: "2025-11-02", in: "08:00", out: "17:00", total: "9 jam", status: "Hadir", desc: "-" },
            { date: "2025-11-03", in: "08:00", out: "17:00", total: "9 jam", status: "Hadir", desc: "-" },
        ]
    }
];

const MONTHS = [
    { value: "0", label: "Januari" }, { value: "1", label: "Februari" }, { value: "2", label: "Maret" },
    { value: "3", label: "April" }, { value: "4", label: "Mei" }, { value: "5", label: "Juni" },
    { value: "6", label: "Juli" }, { value: "7", label: "Agustus" }, { value: "8", label: "September" },
    { value: "9", label: "Oktober" }, { value: "10", label: "November" }, { value: "11", label: "Desember" },
];

const YEARS = [
    { value: "2024", label: "2024" }, { value: "2025", label: "2025" }, { value: "2026", label: "2026" },
];

// --- Helpers ---
const parseDuration = (str: string): number => {
    // Basic parser for "X jam Y menit" or "X jam"
    if (!str || str === "-") return 0;
    let minutes = 0;
    const jamMatch = str.match(/(\d+)\s*jam/);
    const menitMatch = str.match(/(\d+)\s*menit/);

    if (jamMatch) minutes += parseInt(jamMatch[1]) * 60;
    if (menitMatch) minutes += parseInt(menitMatch[1]);

    return minutes;
};

const formatDuration = (minutes: number): string => {
    if (minutes === 0) return "-";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (m === 0) return `${h} jam`;
    return `${h} jam ${m} menit`;
};

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getMonthName = (m: string) => MONTHS.find(mo => mo.value === m)?.label || "-";

export default function AdminAttendancePage() {
    const [selectedMonth, setSelectedMonth] = useState<string>("10"); // November
    const [selectedYear, setSelectedYear] = useState<string>("2025");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    // --- Derived Data ---

    // Helper to get filtered history for ANY employee based on current month/year selection
    const getFilteredHistory = (employee: Employee) => {
        return employee.history.filter(item => {
            const d = new Date(item.date);
            return d.getMonth().toString() === selectedMonth && d.getFullYear().toString() === selectedYear;
        }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    };

    // Global Stats for Table
    const globalStats = useMemo(() => {
        return EMPLOYEES.map(emp => {
            const history = getFilteredHistory(emp);
            const stats = history.reduce((acc, curr) => {
                if (curr.status === "Hadir") acc.hadir++;
                if (curr.status === "Izin") acc.izin++;
                if (curr.status === "Alpha") acc.alpha++;
                acc.totalMinutes += parseDuration(curr.total);
                return acc;
            }, { hadir: 0, izin: 0, alpha: 0, totalMinutes: 0 });

            return {
                ...emp,
                stats
            };
        });
    }, [selectedMonth, selectedYear]);

    // Detail View Data
    const currentEmployeeStats = useMemo(() => {
        if (!selectedEmployee) return null;
        const history = getFilteredHistory(selectedEmployee);
        const stats = history.reduce((acc, curr) => {
            if (curr.status === "Hadir") acc.hadir++;
            if (curr.status === "Izin") acc.izin++;
            if (curr.status === "Alpha") acc.alpha++;
            return acc;
        }, { hadir: 0, izin: 0, alpha: 0 });

        return { history, stats };
    }, [selectedEmployee, selectedMonth, selectedYear]);


    return (
        <DashboardLayout>
            <div className="w-full space-y-4">
                <Card className="w-full p-8 border-none shadow-sm h-full min-h-[calc(100vh-2rem)]">

                    {/* Header Section */}
                    <div className="mb-8">
                        {selectedEmployee ? (
                            <Button
                                variant="ghost"
                                className="mb-4 pl-0 hover:bg-transparent hover:text-primary"
                                onClick={() => setSelectedEmployee(null)}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali ke Rekap Global
                            </Button>
                        ) : null}

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {selectedEmployee ? "Detail Kehadiran Karyawan" : "Rekap Kehadiran Bulanan"}
                                </h1>
                                <p className="text-sm text-slate-500">
                                    {selectedEmployee ? `${selectedEmployee.name} - ${selectedEmployee.position}` : "Monitoring kehadiran seluruh karyawan"}
                                </p>
                            </div>

                            {/* Month/Year Filter - Always Visible */}
                            <div className="relative">
                                <Button
                                    variant="white"
                                    className="w-full sm:w-auto justify-between min-w-[220px] text-slate-600 relative z-10"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="font-medium">{getMonthName(selectedMonth)} {selectedYear}</span>
                                    <CalendarIcon className="w-4 h-4 ml-2 opacity-50" />
                                </Button>

                                {isDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-0"
                                            onClick={() => setIsDropdownOpen(false)}
                                        />
                                        <div className="absolute top-12 right-0 z-20 bg-white border border-slate-200 shadow-xl rounded-xl p-4 w-[280px] animate-in fade-in zoom-in-95 duration-200">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase">Bulan</label>
                                                    <Select
                                                        options={MONTHS}
                                                        value={selectedMonth}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedMonth(e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-500 uppercase">Tahun</label>
                                                    <Select
                                                        options={YEARS}
                                                        value={selectedYear}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedYear(e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stage 1: Global View */}
                    {!selectedEmployee && (
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="font-semibold text-slate-700">Nama Karyawan</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Hadir</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Izin</TableHead>
                                        <TableHead className="font-semibold text-slate-700 text-center">Alpha</TableHead>
                                        <TableHead className="font-semibold text-slate-700">Total Jam Kerja</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {globalStats.map((emp) => (
                                        <TableRow
                                            key={emp.id}
                                            className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                                            onClick={() => setSelectedEmployee(emp)}
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                        {emp.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900 group-hover:text-primary transition-colors">{emp.name}</p>
                                                        <p className="text-xs text-slate-500">{emp.position}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                    {emp.stats.hadir}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    {emp.stats.izin}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    {emp.stats.alpha}
                                                </span>
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-slate-600">
                                                {formatDuration(emp.stats.totalMinutes)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {globalStats.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                                Tidak ada data karyawan.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {/* Stage 2: Detail View */}
                    {selectedEmployee && currentEmployeeStats && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            {/* Summary Cards for Selected Employee */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-[#00C48C] rounded-[16px] p-6 text-white flex justify-between items-start shadow-green-200 shadow-lg">
                                    <div>
                                        <p className="text-sm font-medium opacity-90 mb-1">Total Hari Hadir</p>
                                        <h3 className="text-3xl font-bold">{currentEmployeeStats.stats.hadir}</h3>
                                    </div>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="bg-[#E67E22] rounded-[16px] p-6 text-white flex justify-between items-start shadow-orange-200 shadow-lg">
                                    <div>
                                        <p className="text-sm font-medium opacity-90 mb-1">Total Hari Izin</p>
                                        <h3 className="text-3xl font-bold">{currentEmployeeStats.stats.izin}</h3>
                                    </div>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <FileBarChart className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="bg-[#FF3636] rounded-[16px] p-6 text-white flex justify-between items-start shadow-red-200 shadow-lg">
                                    <div>
                                        <p className="text-sm font-medium opacity-90 mb-1">Total Hari Alpha</p>
                                        <h3 className="text-3xl font-bold">{currentEmployeeStats.stats.alpha}</h3>
                                    </div>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <CalendarIcon className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Detail Table */}
                            <div>
                                <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                                    Rincian Harian
                                </h3>

                                {currentEmployeeStats.history.length > 0 ? (
                                    <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-slate-50">
                                                <TableRow>
                                                    <TableHead className="font-semibold text-slate-700">Tanggal</TableHead>
                                                    <TableHead className="font-semibold text-slate-700">Check In</TableHead>
                                                    <TableHead className="font-semibold text-slate-700">Check Out</TableHead>
                                                    <TableHead className="font-semibold text-slate-700">Total Jam Kerja</TableHead>
                                                    <TableHead className="font-semibold text-slate-700">Status</TableHead>
                                                    <TableHead className="font-semibold text-slate-700">Keterangan</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {currentEmployeeStats.history.map((item, i) => (
                                                    <TableRow key={i} className="hover:bg-slate-50/50">
                                                        <TableCell className="font-medium text-slate-700">{formatDate(item.date)}</TableCell>
                                                        <TableCell className="text-slate-500">{item.in}</TableCell>
                                                        <TableCell className="text-slate-500">{item.out}</TableCell>
                                                        <TableCell className="text-slate-500">{item.total}</TableCell>
                                                        <TableCell>
                                                            <Badge variant={item.status === 'Hadir' ? 'success' : item.status === 'Izin' ? 'warning' : 'danger'}
                                                                className={item.status === 'Hadir' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                                    item.status === 'Izin' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                                        'bg-red-50 text-red-600 border-red-100'}>
                                                                {item.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-slate-400 italic">{item.desc}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                        <p className="text-slate-500">Tidak ada data kehadiran untuk bulan ini.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </Card>
            </div>
        </DashboardLayout>
    );
}
