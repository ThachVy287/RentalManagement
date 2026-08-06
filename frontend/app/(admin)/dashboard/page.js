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





                if(
                    !roomsRes.ok ||
                    !tenantsRes.ok ||
                    !contractsRes.ok ||
                    !billsRes.ok
                ){

                    throw new Error(
                        "API trả về lỗi"
                    );

                }






                const roomsData =
                    await roomsRes.json();



                const tenantsData =
                    await tenantsRes.json();



                const contractsData =
                    await contractsRes.json();



                const billsData =
                    await billsRes.json();







                setRooms(
                    Array.isArray(roomsData)
                    ? roomsData
                    : []
                );



                setTenants(
                    Array.isArray(tenantsData)
                    ? tenantsData
                    : []
                );



                setContracts(
                    Array.isArray(contractsData)
                    ? contractsData
                    : []
                );



                setBills(
                    Array.isArray(billsData)
                    ? billsData
                    : []
                );





            }

            catch(error){


                console.log(error);


                alert(
                    "Không thể tải dữ liệu Dashboard"
                );


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

        room =>
        room.status === "Đang thuê"

    ).length;




    const emptyRooms = rooms.filter(

        room =>
        room.status === "Còn trống"

    ).length;





    const totalTenants = tenants.length;



    const totalContracts = contracts.length;



    const totalBills = bills.length;






    const paidBills = bills.filter(

        bill =>
        bill.status === "Đã thanh toán"

    ).length;






    const unpaidBills = bills.filter(

        bill =>
        bill.status === "Chưa thanh toán"

    ).length;








    const totalRevenue = bills.reduce(

        (sum,bill)=>

            sum + Number(
                bill.totalAmount || 0
            ),

        0

    );







    const roomPercent = totalRooms > 0

        ?

        Math.round(

            rentedRooms / totalRooms * 100

        )

        :

        0;







    const moneyFormat = (money)=>{


        return Number(money || 0)

        .toLocaleString("vi-VN");


    };








    const recentBills = [

        ...bills

    ]

    .sort(

        (a,b)=>

            b.billID - a.billID

    )

    .slice(0,5);









    return(


        <div>


            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>



            <p className="mt-2 text-gray-600">

                Tổng quan hệ thống quản lý phòng trọ

            </p>









            <div className="grid grid-cols-4 gap-5 mt-8">



                <Card
                    title="Tổng phòng"
                    value={totalRooms}
                />


                <Card
                    title="Đang thuê"
                    value={rentedRooms}
                />


                <Card
                    title="Còn trống"
                    value={emptyRooms}
                />


                <Card
                    title="Người thuê"
                    value={totalTenants}
                />



            </div>









            <div className="grid grid-cols-4 gap-5 mt-5">


                <Card
                    title="Hợp đồng"
                    value={totalContracts}
                />


                <Card
                    title="Hóa đơn"
                    value={totalBills}
                />


                <Card
                    title="Đã thanh toán"
                    value={paidBills}
                />


                <Card
                    title="Chưa thanh toán"
                    value={unpaidBills}
                />


            </div>









            <div className="grid grid-cols-2 gap-5 mt-5">



                <div className="border rounded-lg p-5 shadow bg-white">


                    <h2 className="font-bold text-xl">

                        Doanh thu

                    </h2>



                    <p className="text-4xl font-bold mt-3 text-blue-600">


                        {moneyFormat(totalRevenue)}

                        {" "}VNĐ


                    </p>


                </div>







                <div className="border rounded-lg p-5 shadow bg-white">


                    <h2 className="font-bold text-xl">

                        Tỷ lệ lấp đầy

                    </h2>



                    <p className="text-4xl font-bold mt-3 text-blue-600">

                        {roomPercent}%

                    </p>



                    <p className="text-gray-600 mt-2">

                        {rentedRooms}/{totalRooms} phòng

                    </p>


                </div>



            </div>









            <div className="mt-8">


                <h2 className="text-2xl font-bold mb-4">

                    Hóa đơn gần đây

                </h2>






                <table className="w-full border">


                    <thead>

                        <tr className="bg-gray-100">


                            <th className="border p-3">

                                Phòng

                            </th>


                            <th className="border p-3">

                                Người thuê

                            </th>


                            <th className="border p-3">

                                Số tiền

                            </th>


                            <th className="border p-3">

                                Trạng thái

                            </th>


                        </tr>

                    </thead>





                    <tbody>


                    {

                        recentBills.map(bill=>(


                            <tr key={bill.billID}>


                                <td className="border p-3">

                                    {bill.roomName}

                                </td>



                                <td className="border p-3">

                                    {bill.tenantName}

                                </td>



                                <td className="border p-3">

                                    {moneyFormat(
                                        bill.totalAmount
                                    )}

                                    {" "}VNĐ

                                </td>



                                <td className="border p-3">

                                    {bill.status}

                                </td>



                            </tr>


                        ))

                    }


                    </tbody>


                </table>



            </div>





        </div>


    );


}








function Card({title,value}){


    return(


        <div className="border rounded-lg p-5 shadow bg-white hover:shadow-lg transition">


            <h2 className="font-bold text-xl text-gray-700">

                {title}

            </h2>



            <p className="text-4xl font-bold mt-3 text-blue-600">

                {value}

            </p>


        </div>


    );


}