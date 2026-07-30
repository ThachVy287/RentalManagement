export default function TenantsPage() {

    const tenants = [
        {
            id: 1,
            name: "Nguyễn Văn An",
            cccd: "079123456789",
            birthday: "2000-05-10",
            phone: "0901234567"
        },
        {
            id: 2,
            name: "Trần Thị Bình",
            cccd: "079987654321",
            birthday: "1999-08-20",
            phone: "0912345678"
        },
        {
            id: 3,
            name: "Lê Văn Cường",
            cccd: "079555555555",
            birthday: "2001-02-15",
            phone: "0923456789"
        }
    ];


    return (
        <div>

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Quản lý người thuê
                </h1>


                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Thêm người thuê
                </button>

            </div>


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
                                Ngày sinh
                            </th>

                            <th className="border p-3">
                                Số điện thoại
                            </th>

                            <th className="border p-3">
                                Thao tác
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            tenants.map((tenant)=>(
                                <tr key={tenant.id}>

                                    <td className="border p-3">
                                        {tenant.name}
                                    </td>


                                    <td className="border p-3">
                                        {tenant.cccd}
                                    </td>


                                    <td className="border p-3">
                                        {tenant.birthday}
                                    </td>


                                    <td className="border p-3">
                                        {tenant.phone}
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