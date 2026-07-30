export default function BillsPage() {

    const bills = [
        {
            id: 1,
            code: "HD001",
            room: "P001",
            roomMoney: "2.000.000 VNĐ",
            electricity: "350.000 VNĐ",
            water: "150.000 VNĐ",
            total: "2.500.000 VNĐ",
            status: "Đã thanh toán"
        },
        {
            id: 2,
            code: "HD002",
            room: "P002",
            roomMoney: "2.500.000 VNĐ",
            electricity: "400.000 VNĐ",
            water: "180.000 VNĐ",
            total: "3.080.000 VNĐ",
            status: "Chưa thanh toán"
        },
        {
            id: 3,
            code: "HD003",
            room: "P003",
            roomMoney: "3.000.000 VNĐ",
            electricity: "300.000 VNĐ",
            water: "120.000 VNĐ",
            total: "3.420.000 VNĐ",
            status: "Đã thanh toán"
        }
    ];


    return (
        <div>

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Quản lý hóa đơn
                </h1>


                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Tạo hóa đơn
                </button>

            </div>


            <div className="mt-6">

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="border p-3">
                                Mã hóa đơn
                            </th>

                            <th className="border p-3">
                                Phòng
                            </th>

                            <th className="border p-3">
                                Tiền phòng
                            </th>

                            <th className="border p-3">
                                Tiền điện
                            </th>

                            <th className="border p-3">
                                Tiền nước
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
                            bills.map((bill)=>(
                                <tr key={bill.id}>

                                    <td className="border p-3">
                                        {bill.code}
                                    </td>

                                    <td className="border p-3">
                                        {bill.room}
                                    </td>

                                    <td className="border p-3">
                                        {bill.roomMoney}
                                    </td>

                                    <td className="border p-3">
                                        {bill.electricity}
                                    </td>

                                    <td className="border p-3">
                                        {bill.water}
                                    </td>

                                    <td className="border p-3">
                                        {bill.total}
                                    </td>

                                    <td className="border p-3">
                                        {bill.status}
                                    </td>


                                    <td className="border p-3">

                                        <button className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                                            Xem
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