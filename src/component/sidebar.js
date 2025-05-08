import React from "react";
import { Book, List } from "lucide-react"; // Tambahkan ikon jika perlu
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-64 bg-white shadow-md h-screen flex flex-col">
            <div className="text-2xl font-bold text-center py-6 border-b">📚 PageCraft Studios</div>
            <nav className="flex-1">
                <SidebarItem icon={<List size={18} />} label="Daftar Buku" href="/" />
                <SidebarItem icon={<Book size={18} />} label="Kategori" href="/category" />
            </nav>
        </div>
    );
}

function SidebarItem({ icon, label, href }) {
    return (
        <Link href={href} className="w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition">
            {icon}
            {label}
        </Link>
    );
}
