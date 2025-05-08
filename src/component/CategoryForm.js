'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/component/sidebar";

export default function CategoryForm({ category = {}, onSubmit }) {
    const router = useRouter();
    const params = useParams();
    const isEdit = Boolean(params?.id);

    const [form, setForm] = useState({
        name: category.name || "",
    });

    useEffect(() => {
        if (isEdit && category.id) {
            setForm({ name: category.name });
        }
    }, [isEdit, category]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kirim data kategori ke server melalui onSubmit
        onSubmit(form);
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">
                    {isEdit ? "✏️ Edit Kategori" : "➕ Tambah Kategori"}
                </h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Nama Kategori</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        {isEdit ? "Update" : "Simpan"}
                    </button>
                </form>
            </div>
        </div>
    );
}
