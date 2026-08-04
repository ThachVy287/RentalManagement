import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-800 text-white p-5">
            <h2 className="text-2xl font-bold mb-8">
                Rental Admin
            </h2>

            <nav className="flex flex-col gap-4">

                <Link href="/dashboard">
                    Dashboard
                </Link>

                <Link href="/rooms">
                    Rooms
                </Link>

                <Link href="/tenants">
                    Tenants
                </Link>

                <Link href="/contracts">
                    Contracts
                </Link>

                <Link href="/services-management">
    Services
</Link>

                <Link href="/bills">
                    Bills
                </Link>

                <Link href="/reports">
                    Reports
                </Link>

            </nav>
        </aside>
    );
}