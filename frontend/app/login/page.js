"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage(){


    const router = useRouter();


    const [username,setUsername] = useState("");

    const [password,setPassword] = useState("");





    const handleLogin = async()=>{


        try{


            const response = await fetch(

                "https://localhost:7218/api/Admins/Login",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        username,

                        password

                    })

                }

            );





            if(response.ok){


                const data = await response.json();



                localStorage.setItem(

                    "admin",

                    JSON.stringify(data)

                );




                alert("Đăng nhập thành công");



                router.push("/dashboard");



            }

            else{


                alert("Sai tài khoản hoặc mật khẩu");


            }



        }

        catch(error){


            console.log(error);


            alert("Không kết nối được API");


        }


    };








    return(

        <div className="min-h-screen flex items-center justify-center">


            <div className="border rounded-lg shadow p-8 w-96">


                <h1 className="text-3xl font-bold text-center mb-6">

                    Đăng nhập

                </h1>





                <input

                    className="border p-3 w-full mb-4"

                    placeholder="Tên đăng nhập"


                    value={username}


                    onChange={

                        e=>setUsername(e.target.value)

                    }

                />






                <input

                    type="password"

                    className="border p-3 w-full mb-4"

                    placeholder="Mật khẩu"


                    value={password}


                    onChange={

                        e=>setPassword(e.target.value)

                    }

                />







                <button

                    onClick={handleLogin}

                    className="bg-blue-600 text-white w-full py-3 rounded"


                >

                    Đăng nhập


                </button>



            </div>


        </div>

    );


}