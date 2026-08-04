"use client";

import { useEffect, useState } from "react";


export default function ContractsPage() {


    const [contracts, setContracts] = useState([]);

    const [rooms, setRooms] = useState([]);

    const [tenants, setTenants] = useState([]);


    const [showForm, setShowForm] = useState(false);


    // lưu ID hợp đồng đang sửa
    const [editID, setEditID] = useState(null);



    const [contract, setContract] = useState({

        roomID: "",

        tenantID: "",

        startDate: "",

        endDate: "",

        deposit: ""

    });






    const getContracts = async()=>{

        const response = await fetch(
            "https://localhost:7218/api/Contracts"
        );


        const data = await response.json();


        setContracts(data);

    };







    const getRooms = async()=>{


        const response = await fetch(

            "https://localhost:7218/api/Rooms"

        );


        const data = await response.json();


        setRooms(data);


    };









    const getTenants = async()=>{


        const response = await fetch(

            "https://localhost:7218/api/Tenants"

        );


        const data = await response.json();


        setTenants(data);


    };








    useEffect(()=>{


        getContracts();

        getRooms();

        getTenants();


    },[]);









    const handleChange = (e)=>{


        setContract({

            ...contract,

            [e.target.name]: e.target.value

        });


    };









    const saveContract = async()=>{


        if(
            contract.roomID === "" ||
            contract.tenantID === ""
        ){

            alert("Vui lòng chọn phòng và người thuê");

            return;

        }








        const data = {


            roomID:Number(contract.roomID),


            tenantID:Number(contract.tenantID),


            startDate:contract.startDate,


            endDate:contract.endDate,


            deposit:Number(contract.deposit)



        };








        const url = editID

        ? `https://localhost:7218/api/Contracts/${editID}`

        : "https://localhost:7218/api/Contracts";





        const method = editID ? "PUT" : "POST";







        const response = await fetch(

            url,

            {

                method:method,

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(data)

            }

        );









        if(response.ok){


            alert(

                editID

                ? "Cập nhật hợp đồng thành công"

                : "Thêm hợp đồng thành công"

            );




            setContract({

                roomID:"",

                tenantID:"",

                startDate:"",

                endDate:"",

                deposit:""

            });




            setEditID(null);


            setShowForm(false);



            getContracts();


        }

        else{


            const error = await response.text();


            console.log(error);


            alert("Có lỗi xảy ra");


        }



    };












    const editContract = (item)=>{


        setContract({

            roomID:item.roomID,

            tenantID:item.tenantID,

            startDate:item.startDate?.substring(0,10),

            endDate:item.endDate?.substring(0,10),

            deposit:item.deposit

        });



        setEditID(item.contractID);


        setShowForm(true);


    };









    const deleteContract = async(id)=>{


        if(!confirm("Bạn có chắc muốn xóa?"))

            return;






        await fetch(

            `https://localhost:7218/api/Contracts/${id}`,

            {

                method:"DELETE"

            }

        );



        getContracts();


    };
    return (


        <div>



            <div className="flex justify-between items-center">


                <h1 className="text-3xl font-bold">

                    Quản lý hợp đồng

                </h1>





                <button


                onClick={()=>{


                    setShowForm(!showForm);


                    if(showForm){

                        setEditID(null);

                    }


                }}


                className="bg-blue-600 text-white px-4 py-2 rounded">


                    + Thêm hợp đồng


                </button>



            </div>









            {
                showForm &&


                <div className="mt-5 border p-5 rounded">



                    <h2 className="text-xl font-bold mb-4">


                        {editID ? "Sửa hợp đồng" : "Thêm hợp đồng"}


                    </h2>










                    <select


                    name="roomID"


                    value={contract.roomID}


                    onChange={handleChange}


                    className="border p-2 block mb-3 w-full">


                        <option value="">-- Chọn phòng --</option>



                        {

                            rooms.map(room=>(


                                <option

                                key={room.roomID}

                                value={room.roomID}>


                                    {room.roomCode} - {room.roomName}


                                </option>


                            ))

                        }


                    </select>









                    <select


                    name="tenantID"


                    value={contract.tenantID}


                    onChange={handleChange}


                    className="border p-2 block mb-3 w-full">


                        <option value="">-- Chọn người thuê --</option>




                        {

                            tenants.map(tenant=>(


                                <option

                                key={tenant.tenantID}

                                value={tenant.tenantID}>


                                    {tenant.fullName}


                                </option>


                            ))

                        }



                    </select>









                    <input


                    type="date"


                    name="startDate"


                    value={contract.startDate}


                    onChange={handleChange}


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    type="date"


                    name="endDate"


                    value={contract.endDate}


                    onChange={handleChange}


                    className="border p-2 block mb-3 w-full"


                    />









                    <input


                    name="deposit"


                    value={contract.deposit}


                    onChange={handleChange}


                    placeholder="Tiền cọc"


                    className="border p-2 block mb-3 w-full"


                    />









                    <button


                    onClick={saveContract}


                    className="bg-green-600 text-white px-4 py-2 rounded">


                        {editID ? "Cập nhật hợp đồng" : "Lưu hợp đồng"}


                    </button>





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
                                Bắt đầu
                            </th>


                            <th className="border p-3">
                                Kết thúc
                            </th>


                            <th className="border p-3">
                                Tiền cọc
                            </th>


                            <th className="border p-3">
                                Thao tác
                            </th>


                        </tr>


                    </thead>









                    <tbody>


                    {


                        contracts.map(item=>(


                            <tr key={item.contractID}>


                                <td className="border p-3">

                                    {item.contractID}

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


                                    {item.startDate?.substring(0,10)}


                                </td>








                                <td className="border p-3">


                                    {item.endDate?.substring(0,10)}


                                </td>








                                <td className="border p-3">


                                    {item.deposit?.toLocaleString()} VNĐ


                                </td>








                                <td className="border p-3">



                                    <button


                                    onClick={()=>editContract(item)}


                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">


                                        Sửa


                                    </button>







                                    <button


                                    onClick={()=>deleteContract(item.contractID)}


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