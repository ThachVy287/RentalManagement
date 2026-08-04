using System.ComponentModel.DataAnnotations;

namespace RentalManagement.API.Models
{
    public class Contract
    {
        [Key]
        public int ContractID { get; set; }


        public int RoomID { get; set; }


        public int TenantID { get; set; }


        public DateTime? StartDate { get; set; }


        public DateTime? EndDate { get; set; }


        public decimal? Deposit { get; set; }

    }
}