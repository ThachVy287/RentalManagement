using System.ComponentModel.DataAnnotations;

namespace RentalManagement.API.Models
{
    public class Tenant
    {

        [Key]
        public int TenantID { get; set; }




        [Required(ErrorMessage = "Họ tên không được để trống")]
        public string FullName { get; set; } = "";




        [Required(ErrorMessage = "CCCD không được để trống")]
        [StringLength(
            12,
            MinimumLength = 12,
            ErrorMessage = "CCCD phải đủ 12 số"
        )]
        public string CCCD { get; set; } = "";




        [Required(ErrorMessage = "Số điện thoại không được để trống")]
        public string Phone { get; set; } = "";




        public DateTime? BirthDate { get; set; }





        public string? Gender { get; set; }





        public string? Address { get; set; }


    }
}