using Microsoft.EntityFrameworkCore;
using RentalManagement.API.Models;

namespace RentalManagement.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options
        ) : base(options)
        {

        }


        public DbSet<Room> Rooms { get; set; } = null!;

        public DbSet<Tenant> Tenants { get; set; } = null!;
        public DbSet<Contract> Contracts { get; set; } = null!;
        public DbSet<Service> Services { get; set; } = null!;
        public DbSet<Bill> Bills { get; set; }
    }
}