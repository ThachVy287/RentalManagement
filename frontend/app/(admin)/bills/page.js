"use client";

import { useEffect, useState } from "react";


export default function BillsPage(){


    const API = "https://localhost:7218/api/Bills";

    const CONTRACT_API = "https://localhost:7218/api/Contracts";



    const emptyBill = {

        contractID:"",

        billMonth:"",

        billYear:"",

        electricOld:"",

        electricNew:"",

        waterOld:"",

        waterNew:"",

        status:"Chưa thanh toán"

    };





    const [bills,setBills] = useState([]);


    const [contracts,setContracts] = useState([]);


    const [bill,setBill] = useState(emptyBill);



    const [showForm,setShowForm] = useState(false);


    const [editID,setEditID] = useState(null);


    const [loading,setLoading] = useState(true);







    const getBills = async()=>{


        try{


            const response = await fetch(API);


            const data = await response.json();


            setBills(data);


        }

        catch(error){


            console.log(error);


            alert("Không thể tải hóa đơn");


        }


    };







    const getContracts = async()=>{


        try{


            const response = await fetch(CONTRACT_API);


            const data = await response.json();


            setContracts(data);


        }

        catch(error){


            console.log(error);


            alert("Không thể tải hợp đồng");


        }


    };









    useEffect(()=>{


        const loadData = async()=>{


            await Promise.all([

                getBills(),

                getContracts()

            ]);


            setLoading(false);


        };



        loadData();


    },[]);









    const handleChange = (e)=>{


        setBill({

            ...bill,

            [e.target.name]:e.target.value

        });


    };









    const resetForm = ()=>{


        setBill(emptyBill);


        setEditID(null);


    };









    const saveBill = async()=>{


        if(bill.contractID==="")

        {

            alert("Vui lòng chọn hợp đồng");

            return;

        }





        if(

            Number(bill.electricNew)

            <

            Number(bill.electricOld)

        )

        {

            alert("Điện mới phải lớn hơn điện cũ");

            return;

        }





        if(

            Number(bill.waterNew)

            <

            Number(bill.waterOld)

        )

        {

            alert("Nước mới phải lớn hơn nước cũ");

            return;

        }







        const data = {


            contractID:Number(bill.contractID),


            billMonth:Number(bill.billMonth),


            billYear:Number(bill.billYear),


            electricOld:Number(bill.electricOld),


            electricNew:Number(bill.electricNew),


            waterOld:Number(bill.waterOld),


            waterNew:Number(bill.waterNew),


            status:bill.status


        };









        const url = editID

        ?

        `${API}/${editID}`

        :

        API;





        const method = editID

        ?

        "PUT"

        :

        "POST";








        const response = await fetch(

            url,

            {

                method,


                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(data)

            }

        );








        if(response.ok){



            alert(

                editID

                ?

                "Cập nhật hóa đơn thành công"

                :

                "Thêm hóa đơn thành công"

            );



            resetForm();


            setShowForm(false);


            getBills();



        }

        else{


            const error = await response.json();


            alert(

                error.message ||

                "Có lỗi xảy ra"

            );


        }



    };









    const editBill = (item)=>{


        setBill({


            contractID:item.contractID,


            billMonth:item.billMonth,


            billYear:item.billYear,


            electricOld:item.electricOld,


            electricNew:item.electricNew,


            waterOld:item.waterOld,


            waterNew:item.waterNew,


            status:item.status


        });



        setEditID(item.billID);


        setShowForm(true);


    };









    const deleteBill = async(id)=>{


        if(!confirm("Bạn có chắc muốn xóa hóa đơn?"))

            return;





        const response = await fetch(

            `${API}/${id}`,

            {

                method:"DELETE"

            }

        );





        if(response.ok){


            alert("Xóa hóa đơn thành công");


            getBills();


        }


    };








    if(loading){


        return(

            <div className="text-xl">

                Đang tải dữ liệu...

            </div>

        );


    }
        return(

        <div>



            <div className="flex justify-between items-center">


                <h1 className="text-3xl font-bold">

                    Quản lý hóa đơn

                </h1>





                <button


                onClick={()=>{


                    resetForm();


                    setShowForm(true);


                }}


                className="bg-blue-600 text-white px-4 py-2 rounded">


                    + Thêm hóa đơn


                </button>



            </div>









            {


                showForm &&



                <div className="mt-5 border p-5 rounded">



                    <h2 className="text-xl font-bold mb-4">


                        {

                            editID

                            ?

                            "Sửa hóa đơn"

                            :

                            "Thêm hóa đơn"

                        }


                    </h2>









                    <select


                    name="contractID"


                    value={bill.contractID}


                    onChange={handleChange}


                    className="border p-2 block mb-3 w-full">


                        <option value="">


                            -- Chọn hợp đồng --


                        </option>







                        {


                            contracts.map(contract=>(


                                <option


                                key={contract.contractID}


                                value={contract.contractID}>


                                    {


                                    contract.roomName

                                    ||

                                    `Hợp đồng ${contract.contractID}`


                                    }



                                    {


                                    contract.tenantName

                                    &&

                                    ` - ${contract.tenantName}`


                                    }


                                </option>


                            ))


                        }



                    </select>









                    <input


                    name="billMonth"


                    value={bill.billMonth}


                    onChange={handleChange}


                    placeholder="Tháng"


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    name="billYear"


                    value={bill.billYear}


                    onChange={handleChange}


                    placeholder="Năm"


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    name="electricOld"


                    value={bill.electricOld}


                    onChange={handleChange}


                    placeholder="Điện cũ"


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    name="electricNew"


                    value={bill.electricNew}


                    onChange={handleChange}


                    placeholder="Điện mới"


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    name="waterOld"


                    value={bill.waterOld}


                    onChange={handleChange}


                    placeholder="Nước cũ"


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    name="waterNew"


                    value={bill.waterNew}


                    onChange={handleChange}


                    placeholder="Nước mới"


                    className="border p-2 block mb-3 w-full"


                    />









                    <select


                    name="status"


                    value={bill.status}


                    onChange={handleChange}


                    className="border p-2 block mb-3 w-full">



                        <option value="Chưa thanh toán">


                            Chưa thanh toán


                        </option>





                        <option value="Đã thanh toán">


                            Đã thanh toán


                        </option>



                    </select>









                    <div className="flex gap-3">



                        <button


                        onClick={saveBill}


                        className="bg-green-600 text-white px-4 py-2 rounded">



                            {

                            editID

                            ?

                            "Cập nhật hóa đơn"

                            :

                            "Lưu hóa đơn"

                            }



                        </button>









                        <button


                        onClick={()=>{


                            resetForm();


                            setShowForm(false);


                        }}


                        className="bg-gray-500 text-white px-4 py-2 rounded">



                            Hủy



                        </button>




                    </div>






                </div>



            }
                        <div className="mt-6">



                <table className="w-full border">



                    <thead>


                        <tr className="bg-gray-100">


                            <th className="border p-3">

                                ID

                            </th>



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



                            <th className="border p-3">

                                Thao tác

                            </th>



                        </tr>


                    </thead>









                    <tbody>


                    {


                        bills.map(item=>(



                            <tr key={item.billID}>


                                <td className="border p-3">


                                    {item.billID}


                                </td>







                                <td className="border p-3">


                                    <b>

                                        {item.roomCode}

                                    </b>


                                    <br/>


                                    {item.roomName}


                                </td>







                                <td className="border p-3">


                                    {item.tenantName}


                                </td>







                                <td className="border p-3">


                                    {item.billMonth}

                                    /

                                    {item.billYear}


                                </td>







                                <td className="border p-3">


                                    {item.electricOld}


                                    {" → "}


                                    {item.electricNew}


                                    <br/>


                                    Dùng:


                                    {" "}


                                    {item.electricUsed}


                                    kWh


                                </td>







                                <td className="border p-3">


                                    {item.waterOld}


                                    {" → "}


                                    {item.waterNew}


                                    <br/>


                                    Dùng:


                                    {" "}


                                    {item.waterUsed}


                                    m³


                                </td>







                                <td className="border p-3">


                                    {


                                    item.totalAmount

                                    ?

                                    item.totalAmount.toLocaleString()

                                    :

                                    0


                                    }


                                    {" "}VNĐ


                                </td>







                                <td className="border p-3">


                                    {item.status}


                                </td>







                                <td className="border p-3">



                                    <button


                                    onClick={()=>editBill(item)}


                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">



                                        Sửa



                                    </button>









                                    <button


                                    onClick={()=>deleteBill(item.billID)}


                                    className="bg-red-600 text-white px-3 py-1 rounded">



                                        Xóa



                                    </button>



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