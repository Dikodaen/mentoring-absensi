import { StatsCard } from "@/components/dashboard/StatsCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500">
                    Selamat datang di sistem absensi karyawan
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Karyawan"
                    value="50"
                    subtitle="+2 bulan ini"
                    icon={<Users className="w-6 h-6" />}
                    variant="blue"
                />
                <StatsCard
                    title="Hadir Hari Ini"
                    value="46"
                    subtitle="92% kehadiran"
                    icon={<UserCheck className="w-6 h-6" />}
                    variant="green"
                />
                <StatsCard
                    title="Izin"
                    value="3"
                    icon={<UserX className="w-6 h-6" />}
                    variant="orange"
                />
                <StatsCard
                    title="Terlambat"
                    value="1"
                    icon={<Clock className="w-6 h-6" />}
                    variant="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <AttendanceChart />
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-[16px] p-6 border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Absensi Hari Ini</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Ahmad Rizki", time: "08:00", status: "hadir" },
                                { name: "Siti Nurhaliza", time: "08:15", status: "hadir" },
                                { name: "Budi Santoso", time: "08:30", status: "hadir" },
                                { name: "Rina Wijaya", time: "-", status: "izin" },
                                { name: "Dodi Kurniawan", time: "09:00", status: "terlambat" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{item.name}</p>
                                        <p className="text-xs text-slate-500">{item.time}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium 
                                ${item.status === 'hadir' ? 'bg-[#E6F9F3] text-[#00C48C]' :
                                            item.status === 'izin' ? 'bg-[#FFF8E6] text-[#FFB020]' :
                                                'bg-[#FFEBEB] text-[#FF3636]'}`}>
                                        {item.status === 'hadir' ? 'Hadir' : item.status === 'izin' ? 'Izin' : 'Terlambat'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
