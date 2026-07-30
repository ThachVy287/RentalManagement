export default function ServicesManagementPage() {

    const services = [
        {
            id: 1,
            name: "Điện",
            price: "3.500 VNĐ",
            unit: "kWh"
        },
        {
            id: 2,
            name: "Nước",
            price: "15.000 VNĐ",
            unit: "m3"
        },
        {
            id: 3,
            name: "Internet",
            price: "100.000 VNĐ",
            unit: "Tháng"
        },
        {
            id: 4,
            name: "Rác",
            price: "30.000 VNĐ",
            unit: "Tháng"
        }
    ];


    return (
        <div>

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Quản lý dịch vụ
                </h1>


                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Thêm dịch vụ
                </button>

            </div>


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
                                Đơn vị tính
                            </th>

                            <th className="border p-3">
                                Thao tác
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            services.map((service)=>(
                                <tr key={service.id}>

                                    <td className="border p-3">
                                        {service.name}
                                    </td>


                                    <td className="border p-3">
                                        {service.price}
                                    </td>


                                    <td className="border p-3">
                                        {service.unit}
                                    </td>


                                    <td className="border p-3">

                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                                            Sửa
                                        </button>


                                        <button className="bg-red-600 text-white px-3 py-1 rounded">
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