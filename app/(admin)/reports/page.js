export default function ReportsPage() {

    const reports = [
        {
            title: "Tổng số phòng",
            value: "20"
        },
        {
            title: "Phòng đang thuê",
            value: "15"
        },
        {
            title: "Phòng trống",
            value: "5"
        },
        {
            title: "Người thuê",
            value: "25"
        },
        {
            title: "Doanh thu tháng",
            value: "35.000.000 VNĐ"
        }
    ];


    const revenue = [
        {
            month: "Tháng 1",
            money: "30.000.000 VNĐ"
        },
        {
            month: "Tháng 2",
            money: "35.000.000 VNĐ"
        },
        {
            month: "Tháng 3",
            money: "40.000.000 VNĐ"
        }
    ];


    return (
        <div>

            <h1 className="text-3xl font-bold">
                Báo cáo thống kê
            </h1>


            <div className="grid grid-cols-3 gap-6 mt-6">

                {
                    reports.map((item,index)=>(
                        <div
                            key={index}
                            className="bg-white border rounded-lg p-5 shadow"
                        >

                            <p className="text-gray-500">
                                {item.title}
                            </p>


                            <h2 className="text-2xl font-bold mt-2">
                                {item.value}
                            </h2>

                        </div>
                    ))
                }

            </div>



            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-4">
                    Doanh thu theo tháng
                </h2>


                <table className="w-full border">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="border p-3">
                                Thời gian
                            </th>

                            <th className="border p-3">
                                Doanh thu
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            revenue.map((item,index)=>(
                                <tr key={index}>

                                    <td className="border p-3">
                                        {item.month}
                                    </td>

                                    <td className="border p-3">
                                        {item.money}
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