using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentalManagement.API.Models
{
    public class Room
    {
        [Key]
        public int RoomID { get; set; }

        public string RoomCode { get; set; }

        public string RoomName { get; set; }

        public string RoomType { get; set; }

        public double Area { get; set; }

        public decimal Price { get; set; }

        public string Status { get; set; }
    }
}