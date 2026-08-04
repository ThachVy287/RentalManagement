"use client";

import { useEffect, useState } from "react";


export default function ServicesManagementPage() {


    const [services, setServices] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editId, setEditId] = useState(null);

    const [loading, setLoading] = useState(true);



    const [service, setService] = useState({

        serviceName:"",

        unitPrice:"",

        unit:""

    });






    const getServices = async()=>{


        try{


            const response = await fetch(

                "https://localhost:7218/api/Services"

            );


            const data = await response.json();


            setServices(data);


        }

        catch(error){


            console.log(error);

            alert("Không thể tải dữ liệu dịch vụ");


        }

        finally{


            setLoading(false);


        }


    };







    useEffect(()=>{


        getServices();


    },[]);









    const handleChange = (e)=>{


        setService({

            ...service,

            [e.target.name]:e.target.value

        });


    };









    const resetForm = ()=>{


        setService({

            serviceName:"",

            unitPrice:"",

            unit:""

        });


        setEditId(null);


    };









    const openAddForm = ()=>{


        resetForm();

        setShowForm(true);


    };









    const saveService = async()=>{



        if(
            service.serviceName.trim()==="" ||
            service.unitPrice==="" ||
            service.unit===""
        ){

            alert("Vui lòng nhập đầy đủ thông tin");

            return;

        }






        if(Number(service.unitPrice)<=0)
        {

            alert("Đơn giá phải lớn hơn 0");

            return;

        }







        const data = {


            ServiceName:service.serviceName,


            UnitPrice:Number(service.unitPrice),


            Unit:service.unit


        };







        let response;





        if(editId){



            response = await fetch(

                `https://localhost:7218/api/Services/${editId}`,

                {

                    method:"PUT",

                    headers:{


                        "Content-Type":"application/json"


                    },


                    body:JSON.stringify({

                        ServiceID:editId,

                        ...data

                    })

                }

            );



        }

        else{



            response = await fetch(

                "https://localhost:7218/api/Services",

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

                "Cập nhật dịch vụ thành công"

                :

                "Thêm dịch vụ thành công"

            );



            resetForm();


            setShowForm(false);


            getServices();



        }

        else{


            const error = await response.text();


            console.log(error);


            alert("Có lỗi xảy ra khi lưu dịch vụ");


        }



    };









    const editService = (item)=>{


        setService({

            serviceName:item.serviceName,

            unitPrice:item.unitPrice,

            unit:item.unit

        });


        setEditId(item.serviceID);


        setShowForm(true);


    };









    const deleteService = async(id)=>{


        if(!confirm("Bạn có chắc muốn xóa dịch vụ này?"))

            return;





        const response = await fetch(

            `https://localhost:7218/api/Services/${id}`,

            {

                method:"DELETE"

            }

        );





        if(response.ok){


            alert("Xóa dịch vụ thành công");


            getServices();


        }

        else{


            alert("Không thể xóa dịch vụ");


        }


    };









    if(loading){


        return(

            <div className="text-xl">

                Đang tải dữ liệu dịch vụ...

            </div>

        );


    }









    return (


        <div>





            <div className="flex justify-between items-center">


                <h1 className="text-3xl font-bold">

                    Quản lý dịch vụ

                </h1>





                <button


                onClick={openAddForm}


                className="bg-blue-600 text-white px-4 py-2 rounded">


                    + Thêm dịch vụ


                </button>


            </div>









            {
                showForm &&


                <div className="mt-5 border p-5 rounded">


                    <h2 className="font-bold text-xl mb-4">


                        {

                            editId

                            ?

                            "Sửa dịch vụ"

                            :

                            "Thêm dịch vụ"


                        }


                    </h2>







                    <input

                    name="serviceName"

                    value={service.serviceName}

                    onChange={handleChange}

                    placeholder="Tên dịch vụ"

                    className="border p-2 block mb-3 w-full"

                    />








                    <input

                    name="unitPrice"

                    value={service.unitPrice}

                    onChange={handleChange}

                    placeholder="Đơn giá"

                    className="border p-2 block mb-3 w-full"

                    />








                    <input

                    name="unit"

                    value={service.unit}

                    onChange={handleChange}

                    placeholder="Đơn vị tính"

                    className="border p-2 block mb-3 w-full"

                    />









                    <button


                    onClick={saveService}


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

                                Tên dịch vụ

                            </th>


                            <th className="border p-3">

                                Đơn giá

                            </th>


                            <th className="border p-3">

                                Đơn vị

                            </th>


                            <th className="border p-3">

                                Thao tác

                            </th>


                        </tr>


                    </thead>








                    <tbody>


                    {

                        services.map(item=>(


                            <tr key={item.serviceID}>


                                <td className="border p-3">

                                    {item.serviceName}

                                </td>




                                <td className="border p-3">

                                    {item.unitPrice?.toLocaleString()}

                                    {" "}VNĐ

                                </td>





                                <td className="border p-3">

                                    {item.unit}

                                </td>





                                <td className="border p-3">



                                    <button


                                    onClick={()=>editService(item)}


                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">


                                        Sửa


                                    </button>





                                    <button


                                    onClick={()=>deleteService(item.serviceID)}


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