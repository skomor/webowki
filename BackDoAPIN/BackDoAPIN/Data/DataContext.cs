using BackDoAPIN.Entities;
using Microsoft.EntityFrameworkCore;


namespace BackDoAPIN.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<BackDoAPIN.Entities.Product> Product { get; set; }
      //  public DbSet<Product> Products { get; set; }
    }
}