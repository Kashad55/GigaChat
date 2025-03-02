using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using User.DataAccessLayer.Models;

namespace User.DataAccessLayer
{
    public class UserDbContext:DbContext
    {
        public DbSet<Users> Users { get; set; }

        public DbSet<ContactList> ContactLists { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GigaChatUserDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContactList>().HasOne(cl => cl.User).WithMany(u => u.ContactLists).HasForeignKey(cl => cl.UserId).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Users>().Property(u => u.UserId).ValueGeneratedOnAdd();
        }
    }
}
