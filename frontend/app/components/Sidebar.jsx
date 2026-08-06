"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Sidebar(){


    const router = useRouter();





    const logout = ()=>{


        localStorage.removeItem("admin");


        alert("Đã đăng xuất");


        router.push("/login");


    };







    return(


        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">



            <h1 className="text-2xl font-bold mb-8">

                🏠 Quản lý trọ

            </h1>







            <nav className="space-y-3">



                <Link

                href="/dashboard"

                className="block p-3 rounded hover:bg-gray-700">

                    📊 Trang chủ

                </Link>






                <Link

                href="/rooms"

                className="block p-3 rounded hover:bg-gray-700">

                    🏠 Quản lý phòng

                </Link>







                <Link

                href="/tenants"

                className="block p-3 rounded hover:bg-gray-700">

                    👤 Người thuê

                </Link>







                <Link

                href="/contracts"

                className="block p-3 rounded hover:bg-gray-700">

                    📄 Hợp đồng

                </Link>







                <Link

                href="/services-management"

                className="block p-3 rounded hover:bg-gray-700">

                    ⚡ Dịch vụ

                </Link>







                <Link

                href="/bills"

                className="block p-3 rounded hover:bg-gray-700">

                    💵 Hóa đơn

                </Link>







                <Link

                href="/reports"

                className="block p-3 rounded hover:bg-gray-700">

                    📈 Báo cáo

                </Link>







                <button

                onClick={logout}

                className="w-full text-left p-3 rounded hover:bg-red-600 mt-5">


                    🚪 Đăng xuất


                </button>





            </nav>




        </aside>


    );


}