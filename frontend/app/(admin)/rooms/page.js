"use client";

import { useEffect, useState } from "react";


export default function RoomsPage() {


    const [rooms, setRooms] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(true);





    const emptyRoom = {

        roomCode:"",

        roomName:"",

        roomType:"",

        area:"",

        price:"",

        status:"Còn trống"

    };





    const [room, setRoom] = useState(emptyRoom);









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


            alert("Không thể tải dữ liệu phòng");


        }

        finally{


            setLoading(false);


        }


    };









    useEffect(()=>{


        getRooms();


    },[]);









    const handleChange = (e)=>{


        setRoom({

            ...room,

            [e.target.name]:e.target.value

        });


    };









    const resetForm = ()=>{


        setRoom(emptyRoom);


        setEditId(null);


    };









    const saveRoom = async()=>{


        if(

            room.roomCode.trim()==="" ||

            room.roomName.trim()==="" ||

            room.roomType.trim()==="" ||

            room.area==="" ||

            room.price===""

        ){

            alert("Vui lòng nhập đầy đủ thông tin");

            return;

        }






        if(Number(room.area)<=0)

        {

            alert("Diện tích phải lớn hơn 0");

            return;

        }






        if(Number(room.price)<=0)

        {

            alert("Giá thuê phải lớn hơn 0");

            return;

        }







        const data = {


            roomCode:room.roomCode,


            roomName:room.roomName,


            roomType:room.roomType,


            area:Number(room.area),


            price:Number(room.price),


            status:room.status


        };








        let response;





        if(editId){



            response = await fetch(


                `https://localhost:7218/api/Rooms/${editId}`,

                {


                    method:"PUT",


                    headers:{


                        "Content-Type":"application/json"


                    },


                    body:JSON.stringify({

                        roomID:editId,

                        ...data

                    })


                }


            );



        }

        else{



            response = await fetch(


                "https://localhost:7218/api/Rooms",

                {


                    method:"POST",


                    headers:{


                        "Content-Type":"application/json"


                    },


                    body:JSON.stringify(data)


                }


            );


        }







        if(response.ok){



            alert(

                editId

                ?

                "Cập nhật phòng thành công"

                :

                "Thêm phòng thành công"

            );





            resetForm();


            setShowForm(false);


            getRooms();



        }

        else{



            const error = await response.json();


            alert(

                error.message ||

                "Có lỗi xảy ra"

            );


        }



    };









    const editRoom = (item)=>{


        setRoom({

            roomCode:item.roomCode,

            roomName:item.roomName,

            roomType:item.roomType,

            area:item.area,

            price:item.price,

            status:item.status

        });


        setEditId(item.roomID);


        setShowForm(true);


    };









    const deleteRoom = async(id)=>{


        if(!confirm("Bạn có chắc muốn xóa phòng này?"))

            return;





        const response = await fetch(


            `https://localhost:7218/api/Rooms/${id}`,

            {


                method:"DELETE"


            }


        );






        if(response.ok){


            alert("Xóa phòng thành công");


            getRooms();


        }

        else{


            const error = await response.json();


            alert(

                error.message ||

                "Không thể xóa phòng"

            );


        }


    };









    if(loading){


        return(

            <div className="text-xl">

                Đang tải danh sách phòng...

            </div>

        );


    }









    return (


        <div>





            <div className="flex justify-between items-center">


                <h1 className="text-3xl font-bold">

                    Quản lý phòng

                </h1>






                <button


                onClick={()=>{


                    resetForm();


                    setShowForm(true);


                }}


                className="bg-blue-600 text-white px-4 py-2 rounded">


                    + Thêm phòng


                </button>



            </div>









            {


                showForm &&


                <div className="mt-5 border p-5 rounded">



                    <h2 className="font-bold text-xl mb-4">


                        {

                            editId

                            ?

                            "Sửa phòng"

                            :

                            "Thêm phòng mới"


                        }


                    </h2>









                    <input

                    name="roomCode"

                    value={room.roomCode}

                    onChange={handleChange}

                    placeholder="Mã phòng"

                    className="border p-2 block mb-3 w-full"

                    />








                    <input

                    name="roomName"

                    value={room.roomName}

                    onChange={handleChange}

                    placeholder="Tên phòng"

                    className="border p-2 block mb-3 w-full"

                    />








                    <input

                    name="roomType"

                    value={room.roomType}

                    onChange={handleChange}

                    placeholder="Loại phòng"

                    className="border p-2 block mb-3 w-full"

                    />








                    <input

                    name="area"

                    value={room.area}

                    onChange={handleChange}

                    placeholder="Diện tích"

                    className="border p-2 block mb-3 w-full"

                    />








                    <input

                    name="price"

                    value={room.price}

                    onChange={handleChange}

                    placeholder="Giá thuê"

                    className="border p-2 block mb-3 w-full"

                    />








                    <select

                    name="status"

                    value={room.status}

                    onChange={handleChange}

                    className="border p-2 block mb-3 w-full">


                        <option value="Còn trống">

                            Còn trống

                        </option>


                        <option value="Đang thuê">

                            Đang thuê

                        </option>


                    </select>








                    <button


                    onClick={saveRoom}


                    className="bg-green-600 text-white px-4 py-2 rounded">


                        Lưu


                    </button>




                </div>


            }









            <div className="mt-6">



                <table className="w-full border">



                    <thead>


                        <tr className="bg-gray-100">


                            <th className="border p-3">

                                Mã phòng

                            </th>


                            <th className="border p-3">

                                Tên phòng

                            </th>


                            <th className="border p-3">

                                Loại phòng

                            </th>


                            <th className="border p-3">

                                Giá

                            </th>


                            <th className="border p-3">

                                Diện tích

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


                        rooms.map(item=>(



                            <tr key={item.roomID}>


                                <td className="border p-3">

                                    {item.roomCode}

                                </td>


                                <td className="border p-3">

                                    {item.roomName}

                                </td>


                                <td className="border p-3">

                                    {item.roomType}

                                </td>


                                <td className="border p-3">

                                    {item.price?.toLocaleString()}

                                    {" "}VNĐ

                                </td>


                                <td className="border p-3">

                                    {item.area} m²

                                </td>


                                <td className="border p-3">

                                    {item.status}

                                </td>


                                <td className="border p-3">


                                    <button


                                    onClick={()=>editRoom(item)}


                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">


                                        Sửa


                                    </button>






                                    <button


                                    onClick={()=>deleteRoom(item.roomID)}


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