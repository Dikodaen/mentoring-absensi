"use client";

import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

// Data for the chart
const chartData = [
    { name: 'Jan', value: 900, type: 'hadir' },
    { name: 'Feb', value: 950, type: 'hadir' },
    { name: 'Mar', value: 980, type: 'hadir' },
    { name: 'Apr', value: 960, type: 'hadir' },
    { name: 'Mei', value: 990, type: 'hadir' },
    { name: 'Jun', value: 960, type: 'hadir' },
];

export default function MonitoringPage() {
    const attendanceToday = [
        { name: "Ahmad Rizki", in: "08:00", out: "17:05", status: "Selesai" },
        { name: "Siti Nurhaliza", in: "08:15", out: "17:15", status: "Selesai" },
        { name: "Budi Santoso", in: "08:30", out: "-", status: "Aktif" },
        { name: "Rina Wijaya", in: "-", out: "-", status: "Izin" },
        { name: "Dedi Kurniawan", in: "09:00", out: "-", status: "Aktif" },
    ];

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Monitoring Real-time</h1>
                    <p className="text-sm text-slate-500">Pantau kehadiran karyawan secara langsung</p>
                </div>
                <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                </Button>
            </div>

            <Card className="p-6 mb-8">
                <h3 className="font-semibold mb-6">Kehadiran Hari Ini</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama Karyawan</TableHead>
                            <TableHead>Jam Masuk</TableHead>
                            <TableHead>Jam Keluar</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceToday.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="text-slate-500">{item.in}</TableCell>
                                <TableCell className="text-slate-500">{item.out}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-xs font-medium 
                                ${item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' :
                                            item.status === 'Aktif' ? 'bg-blue-50 text-blue-600' :
                                                'bg-orange-50 text-orange-600'}`}>
                                        {item.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Card className="p-6">
                <h3 className="font-semibold mb-6">Grafik Absensi 6 Bulan Terakhir</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barSize={30}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748B', fontSize: 12 }}
                            />
                            <Bar dataKey="value" fill="#00C48C" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Legend can be added here similar to Image 5 */}
            </Card>
        </DashboardLayout>
    );
}
