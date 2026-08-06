"use client";

import { useEffect, useState } from "react";


export default function RoomsPage(){


    const [rooms,setRooms] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        const getRooms = async()=>{


            try{


                const response = await fetch(

                    "https://localhost:7218/api/Rooms"

                );


                const data = await response.json();


                setRooms(data);


            }


            catch(error){


                console.log(error);


            }


            finally{


                setLoading(false);


            }


        };



        getRooms();



    },[]);







    if(loading){


        return(

            <div className="p-10 text-xl">

                Đang tải danh sách phòng...

            </div>

        );

    }







    return(


        <div className="p-6">



            <h1 className="text-3xl font-bold">

                Danh sách phòng trọ

            </h1>





            <p className="mt-2 text-gray-600">

                Xem thông tin các phòng đang cho thuê

            </p>









            <div className="grid grid-cols-3 gap-6 mt-8">



            {


                rooms.map(room=>(


                    <div

                    key={room.roomID}

                    className="border rounded-lg p-5 shadow bg-white"

                    >






                        {/* Ảnh phòng */}

                        <img

                        src={`/images/${room.roomCode}.jpg`}

                        alt={room.roomName}

                        className="w-full h-48 object-cover rounded-lg mb-4"

                        />








                        <h2 className="text-xl font-bold">

                            {room.roomName}

                        </h2>








                        <p className="mt-2">

                            <b>Mã phòng:</b>

                            {" "}

                            {room.roomCode}

                        </p>








                        <p>

                            <b>Loại phòng:</b>

                            {" "}

                            {room.roomType}

                        </p>








                        <p>

                            <b>Diện tích:</b>

                            {" "}

                            {room.area} m²

                        </p>








                        <p className="text-lg font-bold mt-3">

                            Giá:

                            {" "}

                            {Number(room.price)

                            .toLocaleString("vi-VN")}

                            {" "}VNĐ/tháng

                        </p>








                        <p

                        className={

                            room.status === "Còn trống"

                            ?

                            "text-green-600 font-bold mt-3"

                            :

                            "text-red-600 font-bold mt-3"

                        }

                        >


                            {room.status}


                        </p>









                        <a

                        href={`/phong-tro/${room.roomID}`}

                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

                        >

                            Xem chi tiết

                        </a>







                    </div>


                ))


            }



            </div>





        </div>


    );


}