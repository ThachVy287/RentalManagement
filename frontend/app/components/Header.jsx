"use client";


import { useEffect,useState } from "react";


export default function Header(){


    const [admin,setAdmin] = useState(null);




    useEffect(()=>{


        const data = localStorage.getItem("admin");


        if(data){


            setAdmin(JSON.parse(data));


        }


    },[]);







    return(


        <header className="h-16 bg-white shadow flex items-center justify-between px-6">



            <h1 className="text-xl font-semibold">

                Hệ thống quản lý phòng trọ

            </h1>





            <div className="flex items-center gap-3">



                <div className="text-right">


                    <p className="font-semibold">

                        {
                            admin?.fullName || "Admin"
                        }

                    </p>



                    <p className="text-sm text-gray-500">

                        Quản trị viên

                    </p>



                </div>





                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">

                    👤

                </div>




            </div>




        </header>


    );


}