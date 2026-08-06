"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";


export default function AdminLayout({ children }) {


    const router = useRouter();



    useEffect(()=>{


        const admin = localStorage.getItem("admin");



        if(!admin){


            router.push("/login");


        }


    },[router]);







    const logout = ()=>{


        localStorage.removeItem("admin");


        router.push("/login");


    };







    return (

        <div className="flex">


            <Sidebar />



            <div className="flex-1">


                <Header />



                <main className="p-6 bg-gray-100 min-h-screen">



                    <div className="flex justify-end mb-4">


                        <button

                            onClick={logout}

                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"

                        >

                            Đăng xuất

                        </button>


                    </div>





                    {children}



                </main>


            </div>


        </div>

    );

}