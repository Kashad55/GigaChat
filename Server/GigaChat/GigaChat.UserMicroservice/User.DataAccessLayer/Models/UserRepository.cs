using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace User.DataAccessLayer.Models
{
    public class UserRepository
    {
        private UserDbContext _context; 
        public UserRepository(UserDbContext context)
        {
            this._context = context;
        }

        private string GenerateJwtToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public int AddUser(Users user,out int userId)
        {
            int status = 0;
            userId = 0;
            Users User = new Users();
            User = (from users in _context.Users
                    where users.Email == user.Email
                    select users).FirstOrDefault();
            try
            {
                if (User == null)
                {
                    User = user;
                    _context.Users.Add(User);
                    _context.SaveChanges();
                    userId = User.UserId;
                    status = 1;
                }
                else
                {
                    status = -1;
                }
            }
            catch (Exception e)
            {
                status = -99;
            }
            return status;  
        }

        public int Userlogin(string username, string password, out int userId) {
            int status = 0;
            string res = "";
            userId = 0;
            
            Users user = (from users in _context.Users
                          where users.Email == username &&  users.Password == password
                          select users).FirstOrDefault();
            try
            {
                if (user != null)
                {
                    userId = user.UserId;
                    //res = GenerateJwtToken(user);
                    status = 1;
                }
                else
                {
                    status = -1;
                }
            }
            catch (Exception e)
            {
                status = -99;
            }
            return status;
        }

        public List<Users> GetUserContacts(int userId)
        {
            List<ContactList> contactlists = null;
            List<Users> users = new List<Users>();
            List<int>contactId = new List<int>();

            try
            {
                contactlists = (from contact in _context.ContactLists
                                where contact.UserId == userId || contact.UserBId == userId
                                select contact).ToList();

                contactlists.ForEach(contact => {
                    contactId.Add(contact.UserBId == userId ? contact.UserId : contact.UserBId);
                });
                contactId.ForEach(contact =>
                {
                    Users temp = null;
                    temp = (from user in _context.Users
                            where contact == user.UserId
                            select user).FirstOrDefault();
                    users.Add(temp);
                });
            }
            catch (Exception)
            {
                contactlists = null;

                users = null;

            }
            return users;
        }

        public List<Users> SearchUsers(string pattern)
        {
            List<Users> users = new List<Users>();
            string matchpattern = "%"+pattern+"%";
            try
            {
                users = (from p in _context.Users
                         where EF.Functions.Like(p.UserName, matchpattern)
                            select p).ToList();
            }
            catch (Exception e)
            {
                users = null;
            }
            return users;
        }


        public int AddContact(int userBid, int userId) {
            int status = -1;
            ContactList contactlist = new ContactList();
            contactlist.UserBId= userBid;
            contactlist.UserId= userId;

            Users isPresent = null;
            isPresent= (from users in _context.Users
                        where users.UserId == userBid
                        select users).FirstOrDefault();
            try
            {
                if (isPresent != null)
                {
                    ContactList isInContactlist = null;
                    isInContactlist = (from contact in _context.ContactLists
                                 where (contact.UserBId == userBid && contact.UserId == userId)||
                                 (contact.UserBId == userId && contact.UserId == userBid)
                                       select contact).FirstOrDefault();
                    if (isInContactlist==null)
                    {
                        _context.ContactLists.Add(contactlist);
                        _context.SaveChanges();
                        status = 1;
                        
                    }
                }
                else
                {
                    status = -1;
                }
            }
            catch (Exception e)
            {

                status = -99;
            }
            return status;
        }

        //public int DeleteContact(string email, int userId) {
        //    int status = -1;
        //    ContactList contactlist = new ContactList();
        //    contactlist.Email = email;
        //    contactlist.UserId = userId;

        //    ContactList isInContactlist = null;
        //    isInContactlist = (from contact in _context.ContactLists
        //                       where contact.Email == email && contact.UserId == userId
        //                       select contact).FirstOrDefault();
        //    try
        //    {
        //        if (isInContactlist != null)
        //        {
        //            _context.ContactLists.Remove(isInContactlist);
        //            _context.SaveChanges();
        //            status = 1;
        //        }
        //        else
        //        {
        //            status = -1;
        //        }
        //    }
        //    catch (Exception e)
        //    {

        //        status = -99;
        //    }
        //    return status;
        //}
        public bool BlockUnblock(int userId)
        {
            bool status = false;
            try
            {
                Users userObj = _context.Users.Find(userId);
                if (userObj != null)
                {
                    if(userObj.Blocked)
                    {
                        userObj.Blocked = false ;
                    }
                    else
                    {
                        userObj.Blocked = true;
                    }
                    _context.Users.Update(userObj);
                    _context.SaveChanges();
                    status = true;
                }
            }
            catch (Exception)
            {
                status=false;
            }
            return status;
        }
    }
}
