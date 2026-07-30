export default function RoomsPage() {

    const rooms = [
        {
            id: 1,
            code: "P001",
            name: "Phòng 101",
            price: "2.000.000 VNĐ",
            area: "20 m²",
            status: "Đang thuê"
        },
        {
            id: 2,
            code: "P002",
            name: "Phòng 102",
            price: "2.500.000 VNĐ",
            area: "25 m²",
            status: "Trống"
        },
        {
            id: 3,
            code: "P003",
            name: "Phòng 103",
            price: "3.000.000 VNĐ",
            area: "30 m²",
            status: "Đang thuê"
        }
    ];


    return (
        <div>

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Quản lý phòng
                </h1>


                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Thêm phòng
                </button>

            </div>


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
                                Giá thuê
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
                            rooms.map((room)=>(
                                <tr key={room.id}>

                                    <td className="border p-3">
                                        {room.code}
                                    </td>


                                    <td className="border p-3">
                                        {room.name}
                                    </td>


                                    <td className="border p-3">
                                        {room.price}
                                    </td>


                                    <td className="border p-3">
                                        {room.area}
                                    </td>


                                    <td className="border p-3">
                                        {room.status}
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