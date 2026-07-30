export default function DashboardPage() {

    const stats = [
        {
            title: "Tổng số phòng",
            value: "20",
            icon: "🏠"
        },
        {
            title: "Phòng đang thuê",
            value: "15",
            icon: "🔑"
        },
        {
            title: "Phòng trống",
            value: "5",
            icon: "🚪"
        },
        {
            title: "Người thuê",
            value: "25",
            icon: "👥"
        },
        {
            title: "Doanh thu tháng",
            value: "35.000.000 VNĐ",
            icon: "💰"
        }
    ];


    return (
        <div>

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>


            <p className="mt-3 text-gray-600">
                Tổng quan hệ thống quản lý phòng trọ
            </p>


            <div className="grid grid-cols-3 gap-6 mt-8">

                {
                    stats.map((item,index)=>(
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
                        >

                            <div className="text-4xl">
                                {item.icon}
                            </div>


                            <div>

                                <p className="text-gray-500">
                                    {item.title}
                                </p>


                                <h2 className="text-2xl font-bold mt-1">
                                    {item.value}
                                </h2>

                            </div>


                        </div>
                    ))
                }

            </div>


        </div>
    );
}