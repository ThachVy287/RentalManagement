using System.ComponentModel.DataAnnotations;

namespace RentalManagement.API.Models
{
    public class Bill
    {
        [Key]
        public int BillID { get; set; }


        public int ContractID { get; set; }


        public int BillMonth { get; set; }


        public int BillYear { get; set; }


        public int ElectricOld { get; set; }


        public int ElectricNew { get; set; }


        public int WaterOld { get; set; }


        public int WaterNew { get; set; }


        public decimal TotalAmount { get; set; }


        public string? Status { get; set; } = "Chưa thanh toán";

    }
}