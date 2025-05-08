import { useEffect, useState } from "react";
import { Plus } from "lucide-react"; // Ikon dari lucide-react
import Link from "next/link";
import Sidebar from "@/component/sidebar"; 

export default function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    const deleteBook = async (id) => {
        const confirmed = confirm("Yakin ingin menghapus buku ini?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });

            // Pastikan respons sukses
            if (res.ok) {
                // Jika server mengirim JSON, kita bisa tangkap
                try {
                    await res.json(); // bisa di-skip kalau kamu ubah API jadi status 204
                } catch (err) {
                    // Tidak ada JSON? Tidak masalah. Abaikan error-nya.
                }

                // Perbarui daftar buku di state (hapus dari tampilan)
                setBooks((prev) => prev.filter((books) => books.id !== id));
            } else {
                alert("Gagal menghapus buku");
            }
        } catch (error) {
            console.error("Error saat menghapus:", error);
            alert("Terjadi kesalahan saat menghapus buku");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
                <h1 className="text-3xl font-bold mb-4">📚 Book List</h1>

                <div className="mb-4">
                    <Link href="/books/add">
                        <button icon className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
                            <Plus size={16} className="mr-2" /> Tambah Buku
                        </button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm uppercase text-gray-600">
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Author</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-500">
                                        No books available.
                                    </td>
                                </tr>
                            ) : (
                                books.map((books) => (
                                    <tr key={books.id} className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">{books.title}</td>
                                        <td className="py-3 px-4">{books.author}</td>
                                        <td className="py-3 px-4">
                                            <Link href={`/books/${books.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteBook(books.id)}
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