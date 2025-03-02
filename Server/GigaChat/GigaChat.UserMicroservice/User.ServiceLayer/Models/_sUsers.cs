using System.ComponentModel.DataAnnotations;

namespace UserServices.Models
{
    public class _sUsers
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
