using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace User.DataAccessLayer.Models
{
    
    public class ContactList
    {
        
      
        [Key]
        public int contactId { get; set; }
        public int UserBId { get; set; }
       
        public int UserId { get; set; }

        public Users User { get; set; }
    }
}
