using System.ComponentModel.DataAnnotations;

namespace RentalManagement.API.Models
{
    public class Service
    {
        [Key]
        public int ServiceID { get; set; }

        public string? ServiceName { get; set; }

        public decimal? UnitPrice { get; set; }

        public string? Unit { get; set; }
    }
}