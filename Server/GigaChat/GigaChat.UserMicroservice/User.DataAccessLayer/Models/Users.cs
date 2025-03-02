using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace User.DataAccessLayer.Models
{
    public class Users
    {
        public Users()
        {
           ContactLists = new HashSet<ContactList>();
        }
      
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
      
        public string UserName { get; set; }
        public string Email { get; set; }
     
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool Blocked { get; set; }
        [JsonIgnore]
        public ICollection<ContactList> ContactLists { get; set; }
    }
}
