using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.DataAccessLayer.Models
{
    public class Message
    {
        [Key]
        public int MessageId { get; set; }
        public int ChatId { get; set; }
        public int SenderId { get; set; }
        public string MessageText { get; set; }=string.Empty;
        public DateTime SendAt { get; set; }
        public Chats? chat { get; set; }
    }
}
