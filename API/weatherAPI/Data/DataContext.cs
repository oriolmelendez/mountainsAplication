using Microsoft.EntityFrameworkCore;

namespace weatherAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Mountain> MountainsCat { get; set; }
    }
}
