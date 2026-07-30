import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
export default function AdminLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1">
                <Header />

                <main className="p-6 bg-gray-100 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}