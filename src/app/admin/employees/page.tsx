"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select"; // Assuming this was created in previous steps
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    job: string;
    dept: string;
    role: string;
    status: string;
}

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<Employee[]>([
        { id: 1, name: "Jainudin Ambari", email: "jainudin@gmail.com", phone: "081234567890", job: "Senior Developer", dept: "Engineering", role: "Karyawan", status: "Aktif" },
        { id: 2, name: "Maryam Azizah", email: "maryam@gmail.com", phone: "081234567891", job: "Marketing Manager", dept: "Marketing", role: "Karyawan", status: "Aktif" },
        { id: 3, name: "Bambang Susilo", email: "bambang@gmail.com", phone: "081234567892", job: "Sales Executive", dept: "Sales", role: "Karyawan", status: "Aktif" },
        { id: 4, name: "Putri Susanti", email: "putri@gmail.com", phone: "081234567893", job: "HR Specialist", dept: "HR", role: "Karyawan", status: "Aktif" },
        { id: 5, name: "Dede Sulaiman", email: "dede@gmail.com", phone: "081234567894", job: "UI/UX Designer", dept: "Engineering", role: "Karyawan", status: "Aktif" },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        job: "",
        dept: "Engineering",
        role: "Karyawan",
        status: "Aktif"
    });

    const getDeptColor = (dept: string) => {
        switch (dept) {
            case 'Engineering': return 'bg-blue-50 text-blue-600';
            case 'Marketing': return 'bg-purple-50 text-purple-600';
            case 'Sales': return 'bg-cyan-50 text-cyan-600';
            case 'HR': return 'bg-orange-50 text-orange-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.job) {
            alert("Semua kolom harus diisi!");
            return;
        }

        if (formData.password.length < 8) {
            alert("Password minimal 8 karakter!");
            return;
        }

        // Email uniqueness check
        if (employees.some(emp => emp.email === formData.email)) {
            alert("Email sudah terdaftar!");
            return;
        }

        // Add new employee
        const newEmployee: Employee = {
            id: employees.length + 1,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            job: formData.job,
            dept: formData.dept,
            role: formData.role,
            status: formData.status
        };

        setEmployees([...employees, newEmployee]);
        setIsAddModalOpen(false);
        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            job: "",
            dept: "Engineering",
            role: "Karyawan",
            status: "Aktif"
        });

        // Mock notification
        alert("Karyawan dan akun berhasil dibuat");
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Daftar Karyawan</h1>
                    <p className="text-sm text-slate-500">Kelola data karyawan perusahaan</p>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Karyawan
                </Button>
            </div>

            <div className="bg-white rounded-[16px] border border-slate-100 shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold">Total Karyawan: {employees.length}</h3>
                    <div className="w-64">
                        <Input icon={<Search className="w-4 h-4" />} placeholder="Cari karyawan..." />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Karyawan</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Posisi</TableHead>
                            <TableHead>Departemen</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((emp, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    <div>
                                        <div className="font-bold text-slate-900">{emp.name}</div>
                                        <div className="text-xs text-slate-400">{emp.phone}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-500">{emp.email}</TableCell>
                                <TableCell>{emp.job}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDeptColor(emp.dept)}`}>
                                        {emp.dept}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={emp.status === 'Aktif' ? 'success' : 'default'} className={emp.status === 'Aktif' ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 text-slate-600"}>
                                        {emp.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add Employee Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Tambah Karyawan Baru"
                className="max-w-2xl"
            >
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                        <Input
                            name="name"
                            placeholder="Contoh: Ahmad Rizki"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address (Username)</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="contoh@perusahaan.com"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Password Akun</label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Minimal 8 karakter"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nomor Telepon</label>
                        <Input
                            name="phone"
                            placeholder="081234567890"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Posisi / Jabatan</label>
                        <Input
                            name="job"
                            placeholder="Contoh: Software Engineer"
                            value={formData.job}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Departemen</label>
                        <Select
                            name="dept"
                            value={formData.dept}
                            onChange={handleInputChange}
                            options={[
                                { label: "Engineering", value: "Engineering" },
                                { label: "Marketing", value: "Marketing" },
                                { label: "Sales", value: "Sales" },
                                { label: "HR", value: "HR" },
                            ]}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Role User</label>
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            options={[
                                { label: "Karyawan", value: "Karyawan" },
                                { label: "Admin", value: "Admin" },
                            ]}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Status Akun</label>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            options={[
                                { label: "Aktif", value: "Aktif" },
                                { label: "Nonaktif", value: "Nonaktif" },
                            ]}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
                    <Button
                        variant="white"
                        onClick={() => setIsAddModalOpen(false)}
                    >
                        Batal
                    </Button>
                    <Button
                        className="bg-[#00A3FF] hover:bg-[#0092E6] px-8"
                        onClick={handleSubmit}
                    >
                        Simpan Data
                    </Button>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
