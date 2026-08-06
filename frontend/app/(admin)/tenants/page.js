"use client";

import { useEffect, useState } from "react";


export default function TenantsPage(){


    const API = "https://localhost:7218/api/Tenants";


    const createEmptyTenant = ()=>({

        fullName:"",
        cccd:"",
        phone:"",
        birthDate:"",
        gender:"",
        address:""

    });



    const [tenants,setTenants] = useState([]);

    const [tenant,setTenant] = useState(createEmptyTenant());

    const [showForm,setShowForm] = useState(false);

    const [editId,setEditId] = useState(null);

    const [loading,setLoading] = useState(true);






    const getTenants = async()=>{


        try{


            const response = await fetch(API);


            const data = await response.json();


            setTenants(data);


        }

        catch(error){


            console.log(error);


            alert("Không thể tải dữ liệu người thuê");


        }

        finally{


            setLoading(false);


        }


    };







    useEffect(()=>{


        getTenants();


    },[]);







    const handleChange = (e)=>{


        setTenant({

            ...tenant,

            [e.target.name]:e.target.value

        });


    };







    const resetForm = ()=>{


        setTenant(createEmptyTenant());


        setEditId(null);


    };







    const saveTenant = async()=>{


        if(

            tenant.fullName.trim()==="" ||

            tenant.cccd.trim()==="" ||

            tenant.phone.trim()==="" ||

            tenant.birthDate===""

        ){

            alert(
                "Vui lòng nhập đầy đủ thông tin (bao gồm ngày sinh)"
            );

            return;

        }






        if(!/^[0-9]{12}$/.test(tenant.cccd)){


            alert("CCCD phải đủ 12 số");


            return;


        }







        const data = {


            FullName:tenant.fullName,

            CCCD:tenant.cccd,

            Phone:tenant.phone,

            BirthDate:tenant.birthDate,

            Gender:tenant.gender,

            Address:tenant.address


        };







        try{


            let response;





            if(editId){



                response = await fetch(

                    `${API}/${editId}`,

                    {

                        method:"PUT",

                        headers:{

                            "Content-Type":"application/json"

                        },

                        body:JSON.stringify({

                            TenantID:editId,

                            ...data

                        })

                    }

                );


            }

            else{


                response = await fetch(

                    API,

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

                    "Cập nhật người thuê thành công"

                    :

                    "Thêm người thuê thành công"

                );



                resetForm();


                setShowForm(false);


                getTenants();


            }

            else{


                const error = await response.json();


                alert(

                    error.message ||

                    error.title ||

                    "Dữ liệu không hợp lệ"

                );


            }


        }

        catch(error){


            console.log(error);


            alert("Không thể kết nối tới máy chủ");


        }


    };







    const editTenant = (item)=>{


        setTenant({

            fullName:item.fullName,

            cccd:item.cccd,

            phone:item.phone,

            birthDate:

                item.birthDate

                ?

                item.birthDate.substring(0,10)

                :

                "",


            gender:item.gender ?? "",


            address:item.address ?? ""


        });



        setEditId(item.tenantID);


        setShowForm(true);


    };
        const deleteTenant = async(id)=>{


        if(!confirm("Bạn có chắc muốn xóa người thuê này?"))

            return;



        try{


            const response = await fetch(

                `${API}/${id}`,

                {

                    method:"DELETE"

                }

            );




            if(response.ok){


                alert("Xóa người thuê thành công");


                getTenants();


            }

            else{


                const error = await response.json();


                alert(

                    error.message ||

                    "Không thể xóa người thuê"

                );


            }



        }

        catch(error){


            console.log(error);


            alert("Không thể kết nối tới máy chủ");


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

                    Quản lý người thuê

                </h1>




                <button

                onClick={()=>{


                    resetForm();


                    setShowForm(true);


                }}

                className="bg-blue-600 text-white px-4 py-2 rounded">


                    + Thêm người thuê


                </button>


            </div>








            {


            showForm &&


            <div className="mt-5 border p-5 rounded">


                <h2 className="font-bold text-xl mb-4">


                    {

                    editId

                    ?

                    "Sửa người thuê"

                    :

                    "Thêm người thuê"

                    }


                </h2>







                <input

                name="fullName"

                value={tenant.fullName}

                onChange={handleChange}

                placeholder="Họ tên"

                className="border p-2 block mb-3 w-full"

                />







                <input

                name="cccd"

                value={tenant.cccd}

                disabled={editId !== null}

                onChange={handleChange}

                placeholder="CCCD (12 số)"

                className="border p-2 block mb-3 w-full"

                />







                <input

                name="phone"

                value={tenant.phone}

                onChange={handleChange}

                placeholder="Số điện thoại"

                className="border p-2 block mb-3 w-full"

                />







                <input

                type="date"

                name="birthDate"

                value={tenant.birthDate}

                onChange={handleChange}

                className="border p-2 block mb-3 w-full"

                />







                <select

                name="gender"

                value={tenant.gender}

                onChange={handleChange}

                className="border p-2 block mb-3 w-full">


                    <option value="">

                        -- Giới tính --

                    </option>


                    <option value="Nam">

                        Nam

                    </option>


                    <option value="Nữ">

                        Nữ

                    </option>


                    <option value="Khác">

                        Khác

                    </option>


                </select>







                <input

                name="address"

                value={tenant.address}

                onChange={handleChange}

                placeholder="Địa chỉ"

                className="border p-2 block mb-3 w-full"

                />








                <button

                onClick={saveTenant}

                className="bg-green-600 text-white px-4 py-2 rounded">


                    Lưu


                </button>






                <button

                onClick={()=>{


                    resetForm();


                    setShowForm(false);


                }}

                className="bg-gray-500 text-white px-4 py-2 rounded ml-3">


                    Hủy


                </button>



            </div>


            }









            <div className="mt-6">


                <table className="w-full border">


                    <thead>


                        <tr className="bg-gray-100">


                            <th className="border p-3">

                                Họ tên

                            </th>


                            <th className="border p-3">

                                CCCD

                            </th>


                            <th className="border p-3">

                                Điện thoại

                            </th>


                            <th className="border p-3">

                                Ngày sinh

                            </th>


                            <th className="border p-3">

                                Giới tính

                            </th>


                            <th className="border p-3">

                                Địa chỉ

                            </th>


                            <th className="border p-3">

                                Thao tác

                            </th>


                        </tr>


                    </thead>








                    <tbody>


                    {


                    tenants.map(item=>(


                        <tr key={item.tenantID}>


                            <td className="border p-3">

                                {item.fullName}

                            </td>


                            <td className="border p-3">

                                {item.cccd}

                            </td>


                            <td className="border p-3">

                                {item.phone}

                            </td>


                            <td className="border p-3">

                                {

                                item.birthDate

                                ?

                                item.birthDate.substring(0,10)

                                :

                                ""

                                }

                            </td>


                            <td className="border p-3">

                                {item.gender}

                            </td>


                            <td className="border p-3">

                                {item.address}

                            </td>


                            <td className="border p-3">


                                <button

                                onClick={()=>editTenant(item)}

                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">


                                    Sửa


                                </button>





                                <button

                                onClick={()=>deleteTenant(item.tenantID)}

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