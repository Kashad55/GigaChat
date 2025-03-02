using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.DataAccessLayer.Models
{
    public class Chats
    {
        [Key]
        public int ChatId { get; set; }
        public int UserAId { get; set; }
        public int UserBId { get; set; }
        public DateTime CreatedAt { get; set; }= DateTime.UtcNow;

        public ICollection<Message>? Messages { get; set; }


    }
}
