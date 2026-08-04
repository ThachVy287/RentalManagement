"use client";

import { useEffect, useState } from "react";


export default function DashboardPage(){


    const [rooms,setRooms] = useState([]);

    const [tenants,setTenants] = useState([]);

    const [contracts,setContracts] = useState([]);

    const [bills,setBills] = useState([]);


    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        const loadData = async()=>{


            try{


                const [

                    roomsRes,

                    tenantsRes,

                    contractsRes,

                    billsRes

                ] = await Promise.all([


                    fetch(
                        "https://localhost:7218/api/Rooms"
                    ),


                    fetch(
                        "https://localhost:7218/api/Tenants"
                    ),


                    fetch(
                        "https://localhost:7218/api/Contracts"
                    ),


                    fetch(
                        "https://localhost:7218/api/Bills"
                    )


                ]);






                const roomsData = await roomsRes.json();

                const tenantsData = await tenantsRes.json();

                const contractsData = await contractsRes.json();

                const billsData = await billsRes.json();





                setRooms(roomsData);

                setTenants(tenantsData);

                setContracts(contractsData);

                setBills(billsData);



            }

            catch(error){


                console.log(error);


            }


            finally{


                setLoading(false);


            }


        };



        loadData();


    },[]);








    if(loading){


        return(

            <div className="text-xl">

                Đang tải dữ liệu...

            </div>

        );

    }









    const totalRooms = rooms.length;




    const rentedRooms = rooms.filter(

        room=>room.status==="Đang thuê"

    ).length;






    const emptyRooms = rooms.filter(

        room=>room.status==="Còn trống"

    ).length;







    const totalRevenue = bills.reduce(

        (sum,bill)=>

            sum + (bill.totalAmount || 0),

        0

    );







    const paidBills = bills.filter(

        bill=>bill.status==="Đã thanh toán"

    ).length;







    const unpaidBills = bills.filter(

        bill=>bill.status==="Chưa thanh toán"

    ).length;







    return(


        <div>



            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>




            <p className="mt-2 text-gray-600">

                Tổng quan hệ thống quản lý phòng trọ

            </p>









            <div className="grid grid-cols-4 gap-5 mt-8">





                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Tổng phòng

                    </h2>


                    <p className="text-3xl mt-3">

                        {totalRooms}

                    </p>


                </div>








                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Đang thuê

                    </h2>


                    <p className="text-3xl mt-3">

                        {rentedRooms}

                    </p>


                </div>








                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Còn trống

                    </h2>


                    <p className="text-3xl mt-3">

                        {emptyRooms}

                    </p>


                </div>








                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Người thuê

                    </h2>


                    <p className="text-3xl mt-3">

                        {tenants.length}

                    </p>


                </div>





            </div>









            <div className="grid grid-cols-4 gap-5 mt-5">





                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Hợp đồng

                    </h2>


                    <p className="text-3xl mt-3">

                        {contracts.length}

                    </p>


                </div>








                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Hóa đơn

                    </h2>


                    <p className="text-3xl mt-3">

                        {bills.length}

                    </p>


                </div>








                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Đã thanh toán

                    </h2>


                    <p className="text-3xl mt-3">

                        {paidBills}

                    </p>


                </div>








                <div className="border rounded p-5 shadow">

                    <h2 className="font-bold text-xl">

                        Doanh thu

                    </h2>


                    <p className="text-3xl mt-3">


                        {totalRevenue.toLocaleString()}

                        {" "}VNĐ


                    </p>


                </div>





            </div>





        </div>


    );


}