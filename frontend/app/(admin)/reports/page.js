"use client";

import { useEffect, useState } from "react";


export default function ReportsPage() {


    const [rooms,setRooms] = useState([]);

    const [tenants,setTenants] = useState([]);

    const [bills,setBills] = useState([]);


    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        const loadData = async()=>{


            try{


                const [

                    roomsRes,

                    tenantsRes,

                    billsRes

                ] = await Promise.all([


                    fetch(
                        "https://localhost:7218/api/Rooms"
                    ),


                    fetch(
                        "https://localhost:7218/api/Tenants"
                    ),


                    fetch(
                        "https://localhost:7218/api/Bills"
                    )


                ]);





                const roomsData = await roomsRes.json();

                const tenantsData = await tenantsRes.json();

                const billsData = await billsRes.json();





                setRooms(roomsData);

                setTenants(tenantsData);

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

                Đang tải báo cáo...

            </div>

        );


    }









    const totalRooms = rooms.length;





    const rentedRooms = rooms.filter(

        room => room.status === "Đang thuê"

    ).length;






    const emptyRooms = rooms.filter(

        room => room.status === "Còn trống"

    ).length;








    const fillRate = totalRooms > 0

        ?

        Math.round(

            rentedRooms / totalRooms * 100

        )

        :

        0;









    const totalRevenue = bills.reduce(

        (sum,bill)=>

            sum + (bill.totalAmount || 0),

        0

    );








    const paidBills = bills.filter(

        bill => bill.status === "Đã thanh toán"

    ).length;








    const unpaidBills = bills.filter(

        bill => bill.status === "Chưa thanh toán"

    ).length;











    return (


        <div>





            <h1 className="text-3xl font-bold">

                Báo cáo thống kê

            </h1>






            <p className="mt-2 text-gray-600">

                Thống kê dữ liệu thực tế từ hệ thống quản lý phòng trọ

            </p>









            <div className="grid grid-cols-3 gap-6 mt-6">







                <div className="bg-white border rounded-lg p-5 shadow">


                    <p className="text-gray-500">

                        Tổng số phòng

                    </p>


                    <h2 className="text-3xl font-bold mt-2">

                        {totalRooms}

                    </h2>


                </div>










                <div className="bg-white border rounded-lg p-5 shadow">


                    <p className="text-gray-500">

                        Phòng đang thuê

                    </p>


                    <h2 className="text-3xl font-bold mt-2">

                        {rentedRooms}

                    </h2>


                </div>










                <div className="bg-white border rounded-lg p-5 shadow">


                    <p className="text-gray-500">

                        Phòng còn trống

                    </p>


                    <h2 className="text-3xl font-bold mt-2">

                        {emptyRooms}

                    </h2>


                </div>










                <div className="bg-white border rounded-lg p-5 shadow">


                    <p className="text-gray-500">

                        Người thuê

                    </p>


                    <h2 className="text-3xl font-bold mt-2">

                        {tenants.length}

                    </h2>


                </div>










                <div className="bg-white border rounded-lg p-5 shadow">


                    <p className="text-gray-500">

                        Hóa đơn đã thanh toán

                    </p>


                    <h2 className="text-3xl font-bold mt-2">

                        {paidBills}

                    </h2>


                </div>










                <div className="bg-white border rounded-lg p-5 shadow">


                    <p className="text-gray-500">

                        Hóa đơn chưa thanh toán

                    </p>


                    <h2 className="text-3xl font-bold mt-2">

                        {unpaidBills}

                    </h2>


                </div>





            </div>









            <div className="grid grid-cols-2 gap-6 mt-8">







                <div className="bg-white border rounded-lg p-5 shadow">


                    <h2 className="text-xl font-bold">

                        Tổng doanh thu

                    </h2>


                    <p className="text-3xl font-bold mt-3">


                        {totalRevenue.toLocaleString()}

                        {" "}VNĐ


                    </p>


                </div>










                <div className="bg-white border rounded-lg p-5 shadow">


                    <h2 className="text-xl font-bold">

                        Tỷ lệ lấp đầy

                    </h2>


                    <p className="text-3xl font-bold mt-3">


                        {fillRate}%


                    </p>


                    <p className="mt-2 text-gray-600">


                        {rentedRooms}/{totalRooms} phòng


                    </p>


                </div>





            </div>









            <div className="mt-10">


                <h2 className="text-2xl font-bold mb-4">

                    Danh sách hóa đơn

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

                                Tháng/Năm

                            </th>




                            <th className="border p-3">

                                Điện

                            </th>



                            <th className="border p-3">

                                Nước

                            </th>




                            <th className="border p-3">

                                Tổng tiền

                            </th>




                            <th className="border p-3">

                                Trạng thái

                            </th>



                        </tr>


                    </thead>









                    <tbody>


                    {

                        bills.map(item=>(


                            <tr key={item.billID}>


                                <td className="border p-3">


                                    {item.roomCode}

                                    <br/>

                                    {item.roomName}


                                </td>





                                <td className="border p-3">


                                    {item.tenantName}


                                </td>





                                <td className="border p-3">


                                    {item.billMonth}/{item.billYear}


                                </td>





                                <td className="border p-3">


                                    {item.electricUsed || 

                                    (
                                        item.electricNew -

                                        item.electricOld

                                    )

                                    }

                                    kWh


                                </td>





                                <td className="border p-3">


                                    {item.waterUsed ||

                                    (

                                        item.waterNew -

                                        item.waterOld

                                    )

                                    }

                                    m³


                                </td>





                                <td className="border p-3">


                                    {(item.totalAmount || 0)

                                    .toLocaleString()}

                                    {" "}VNĐ


                                </td>





                                <td className="border p-3">


                                    {item.status}


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