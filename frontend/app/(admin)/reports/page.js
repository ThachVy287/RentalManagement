"use client";

import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";



export default function ReportsPage(){


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




                setRooms(
                    await roomsRes.json()
                );


                setTenants(
                    await tenantsRes.json()
                );


                setContracts(
                    await contractsRes.json()
                );


                setBills(
                    await billsRes.json()
                );



            }

            catch(error){

                console.log(error);

                alert(
                    "Không thể tải báo cáo"
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

                Đang tải báo cáo...

            </div>

        );

    }







    const totalRooms = rooms.length;


    const rentedRooms = rooms.filter(

        r=>r.status==="Đang thuê"

    ).length;



    const emptyRooms = rooms.filter(

        r=>r.status==="Còn trống"

    ).length;





    const totalRevenue = bills.reduce(

        (sum,b)=>

        sum + Number(b.totalAmount || 0),

        0

    );





    const paidBills = bills.filter(

        b=>b.status==="Đã thanh toán"

    ).length;



    const unpaidBills = bills.filter(

        b=>b.status==="Chưa thanh toán"

    ).length;





    const totalElectric = bills.reduce(

        (sum,b)=>

        sum +

        (

            b.electricNew -

            b.electricOld

        ),

        0

    );




    const totalWater = bills.reduce(

        (sum,b)=>

        sum +

        (

            b.waterNew -

            b.waterOld

        ),

        0

    );






    const fillRate = totalRooms

    ?

    Math.round(

        rentedRooms /

        totalRooms *

        100

    )

    :

    0;






    // biểu đồ phòng


    const roomChartData=[

        {
            name:"Đang thuê",
            value:rentedRooms
        },


        {
            name:"Còn trống",
            value:emptyRooms
        }

    ];






    // biểu đồ hóa đơn


    const billChartData=[


        {
            name:"Đã thanh toán",
            value:paidBills
        },


        {
            name:"Chưa thanh toán",
            value:unpaidBills
        }


    ];







    // doanh thu theo tháng


    const revenueChartData = [];


    bills.forEach(bill=>{


        let month =

        bill.billMonth + "/" + bill.billYear;



        let item =

        revenueChartData.find(

            x=>x.name===month

        );



        if(item){


            item.value +=

            Number(
                bill.totalAmount || 0
            );


        }

        else{


            revenueChartData.push({

                name:month,

                value:Number(
                    bill.totalAmount || 0
                )

            });


        }



    });







    const money = (value)=>

        Number(value)

        .toLocaleString("vi-VN");









    return(


    <div>


        <h1 className="text-3xl font-bold">

            Báo cáo thống kê

        </h1>


        <p className="mt-2 text-gray-600">

            Tổng hợp dữ liệu hệ thống quản lý phòng trọ

        </p>







        <div className="grid grid-cols-4 gap-5 mt-8">


            <Card title="Tổng phòng" value={totalRooms}/>


            <Card title="Đang thuê" value={rentedRooms}/>


            <Card title="Còn trống" value={emptyRooms}/>


            <Card title="Người thuê" value={tenants.length}/>



        </div>







        <div className="grid grid-cols-4 gap-5 mt-5">


            <Card title="Hợp đồng" value={contracts.length}/>


            <Card title="Hóa đơn" value={bills.length}/>


            <Card title="Điện tiêu thụ" value={totalElectric+" kWh"}/>


            <Card title="Nước tiêu thụ" value={totalWater+" m³"}/>


        </div>







        <div className="grid grid-cols-2 gap-5 mt-5">


            <Card

            title="Doanh thu"

            value={money(totalRevenue)+" VNĐ"}

            />



            <Card

            title="Tỷ lệ lấp đầy"

            value={fillRate+"%"}

            />



        </div>









        <div className="grid grid-cols-3 gap-5 mt-10">



            <ChartBox title="Trạng thái phòng">


                <PieChart width={350} height={300}>


                    <Pie

                    data={roomChartData}

                    dataKey="value"

                    nameKey="name"

                    outerRadius={100}

                    >

                    {
                        roomChartData.map(
                            (e,i)=>
                            <Cell key={i}/>
                        )
                    }


                    </Pie>


                    <Tooltip/>

                    <Legend/>


                </PieChart>


            </ChartBox>






            <ChartBox title="Trạng thái hóa đơn">


                <PieChart width={350} height={300}>


                    <Pie

                    data={billChartData}

                    dataKey="value"

                    nameKey="name"

                    outerRadius={100}

                    >


                    {
                        billChartData.map(
                            (e,i)=>
                            <Cell key={i}/>
                        )
                    }


                    </Pie>


                    <Tooltip/>

                    <Legend/>


                </PieChart>


            </ChartBox>








            <ChartBox title="Doanh thu theo tháng">


            <ResponsiveContainer width="100%" height={300}>


                <BarChart data={revenueChartData}>


                    <CartesianGrid/>


                    <XAxis dataKey="name"/>


                    <YAxis/>


                    <Tooltip/>


                    <Bar dataKey="value"/>


                </BarChart>


            </ResponsiveContainer>



            </ChartBox>



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
                Tháng
            </th>


            <th className="border p-3">
                Tiền
            </th>


            <th className="border p-3">
                Trạng thái
            </th>


        </tr>


        </thead>




        <tbody>


        {
            bills.map(b=>(


            <tr key={b.billID}>


                <td className="border p-3">

                    {b.roomName}

                </td>


                <td className="border p-3">

                    {b.tenantName}

                </td>


                <td className="border p-3">

                    {b.billMonth}/{b.billYear}

                </td>


                <td className="border p-3">

                    {money(b.totalAmount)}
                    {" "}VNĐ

                </td>


                <td className="border p-3">

                    {b.status}

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


<div className="border rounded-lg p-5 shadow">


<p className="text-gray-500">

{title}

</p>


<h2 className="text-3xl font-bold mt-2">

{value}

</h2>


</div>


);


}





function ChartBox({title,children}){


return(


<div className="border rounded-lg p-5 shadow">


<h2 className="text-xl font-bold mb-5">

{title}

</h2>


{children}


</div>


);


}