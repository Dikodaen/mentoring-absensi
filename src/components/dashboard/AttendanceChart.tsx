"use client";

import { Card } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Sen', value: 45, type: 'hadir' },
    { name: 'Sel', value: 48, type: 'hadir' },
    { name: 'Rab', value: 46, type: 'hadir' },
    { name: 'Kam', value: 44, type: 'hadir' },
    { name: 'Jum', value: 42, type: 'hadir' },
];

export function AttendanceChart() {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Grafik Kehadiran Bulanan</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={20}>
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
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#00C48C" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00C48C]" />
                    <span>Hadir</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFB020]" />
                    <span>Izin</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF3636]" />
                    <span>Terlambat</span>
                </div>
            </div>
        </Card>
    );
}
