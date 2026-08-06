"use client";

import { useEffect, useState } from "react";


export default function RoomDetailPage({ params }) {


    const [room, setRoom] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => {


        const getRoom = async () => {


            try {


                // Next.js 16 params là Promise
                const { id } = await params;



                const response = await fetch(

                    `https://localhost:7218/api/Rooms/${id}`

                );



                if(!response.ok){

                    throw new Error(
                        "Không tìm thấy phòng"
                    );

                }



                const data = await response.json();



                setRoom(data);



            }


            catch(error){


                console.log(error);


                setRoom(null);


            }


            finally{


                setLoading(false);


            }


        };



        getRoom();



    }, [params]);








    if(loading){


        return(

            <div className="p-10 text-xl">

                Đang tải thông tin phòng...

            </div>

        );

    }







    if(!room){


        return(

            <div className="p-10 text-xl text-red-600">

                Không tìm thấy phòng trọ

            </div>

        );

    }









    return(


        <div className="p-6">



            <h1 className="text-3xl font-bold">

                {room.roomName}

            </h1>





            <div className="mt-6 border rounded-lg p-6 shadow bg-white">





                <img

                    src={`/images/${room.roomCode}.jpg`}

                    alt={room.roomName}

                    className="w-full h-80 object-cover rounded-lg"

                />







                <div className="mt-6 space-y-3">



                    <p>

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

                        {room.area}

                        {" "}m²

                    </p>





                    <p className="text-xl font-bold">

                        Giá:

                        {" "}

                        {Number(room.price).toLocaleString("vi-VN")}

                        {" "}VNĐ/tháng

                    </p>





                    <p>

                        <b>Trạng thái:</b>

                        {" "}

                        <span className={

                            room.status === "Còn trống"

                            ?

                            "text-green-600 font-bold"

                            :

                            "text-red-600 font-bold"

                        }>

                            {room.status}

                        </span>

                    </p>



                </div>








                <div className="mt-8 border-t pt-5">


                    <h2 className="text-xl font-bold">

                        Liên hệ thuê phòng

                    </h2>



                    <p className="mt-3">

                        Chủ trọ: Admin

                    </p>


                    <p>

                        Điện thoại: 0900000000

                    </p>


                    <p>

                        Email: admin@gmail.com

                    </p>



                </div>





            </div>





        </div>


    );


}