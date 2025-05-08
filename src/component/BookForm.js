'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/component/sidebar";

export default function BookForm() {
    const router = useRouter();
    const params = useParams();
    const isEdit = Boolean(params?.id);

    const [form, setForm] = useState({
        title: "",
        author: "",
    });

    useEffect(() => {
        if (isEdit) {
            fetch(`/api/books/${params.id}`)
                .then((res) => res.json())
                .then((data) => setForm({ title: data.title, author: data.author }))
                .catch(() => alert("Gagal mengambil data buku"));
        }
    }, [isEdit, params.id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api/books/${params.id}` : "/api/books";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/"); // Redirect ke dashboard
        } else {
            alert(isEdit ? "Gagal mengedit buku" : "Gagal menambahkan buku");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">
                    {isEdit ? "✏️ Edit Buku" : "➕ Tambah Buku"}
                </h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Judul Buku</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-1">Penulis</label>
                        <input
                            type="text"
                            name="author"
                            value={form.author}
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
