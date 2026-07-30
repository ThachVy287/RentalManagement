export default function ContractsPage() {

    const contracts = [
        {
            id: 1,
            contractCode: "HD001",
            room: "P001",
            tenant: "Nguyễn Văn An",
            startDate: "01/01/2026",
            endDate: "01/01/2027"
        },
        {
            id: 2,
            contractCode: "HD002",
            room: "P002",
            tenant: "Trần Thị Bình",
            startDate: "15/02/2026",
            endDate: "15/02/2027"
        },
        {
            id: 3,
            contractCode: "HD003",
            room: "P003",
            tenant: "Lê Văn Cường",
            startDate: "10/03/2026",
            endDate: "10/03/2027"
        }
    ];


    return (
        <div>

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Quản lý hợp đồng
                </h1>


                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Thêm hợp đồng
                </button>

            </div>


            <div className="mt-6">

                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="border p-3">
                                Mã hợp đồng
                            </th>

                            <th className="border p-3">
                                Phòng
                            </th>

                            <th className="border p-3">
                                Người thuê
                            </th>

                            <th className="border p-3">
                                Ngày bắt đầu
                            </th>

                            <th className="border p-3">
                                Ngày kết thúc
                            </th>

                            <th className="border p-3">
                                Thao tác
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            contracts.map((contract)=>(
                                <tr key={contract.id}>

                                    <td className="border p-3">
                                        {contract.contractCode}
                                    </td>

                                    <td className="border p-3">
                                        {contract.room}
                                    </td>

                                    <td className="border p-3">
                                        {contract.tenant}
                                    </td>

                                    <td className="border p-3">
                                        {contract.startDate}
                                    </td>

                                    <td className="border p-3">
                                        {contract.endDate}
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