using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Chat.DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace Chat.DataAccessLayer
{
    public class ChatDbContext:DbContext
    {
        public DbSet<Chats> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB;Initial Catalog=ChatDb;Integrated Security=true");
            }
        }
    }
}
