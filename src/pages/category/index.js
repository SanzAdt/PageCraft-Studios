import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/component/sidebar";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/category")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    const deleteCategory = async (id) => {
        const confirmed = confirm("Yakin ingin menghapus kategori ini?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/category/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                try {
                    await res.json();
                } catch (err) {}

                setCategories((prev) => prev.filter((cat) => cat.id !== id));
            } else {
                alert("Gagal menghapus kategori");
            }
        } catch (error) {
            console.error("Error saat menghapus:", error);
            alert("Terjadi kesalahan saat menghapus kategori");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-4">📂 Category List</h1>

                <div className="mb-4">
                    <Link href="/category/add">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
                            <Plus size={16} className="mr-2" /> Tambah Kategori
                        </button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600">
                                <th className="py-3 px-4">Nama Kategori</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="text-center py-6 text-gray-500">
                                        Tidak ada kategori tersedia.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">{cat.name}</td>
                                        <td className="py-3 px-4">
                                            <Link href={`/category/${cat.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteCategory(cat.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
