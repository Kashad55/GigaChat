using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using User.DataAccessLayer.Models;
using UserServices.Models;

namespace UserServices.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : Controller
    {
        private UserRepository _repository;
        public UserController(UserRepository repository)
        {
            this._repository = repository;
        }

        [HttpPost]
        public int AccountCreation(Models._sUsers user)
        {
            int status = 0;
            int userId;
            Users users = new Users();

            try
            {
                users.UserName = user.UserName;
                users.Password = user.Password;
                users.Email = user.Email;
                users.DateOfBirth = user.DateOfBirth;
                if (ModelState.IsValid)
                {
                    status = _repository.AddUser(users, out userId);
                }
                else
                {
                    return status = -2;
                }

            }
            catch (Exception e)
            {
                status = -99;
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            return status;
        }

        [HttpPost]
        public int UserLogin(Users user)
        {
            int status = 0;
            //string res;
            int userId = 0;
            try
            {
                status = _repository.Userlogin(user.Email, user.Password, out userId);
                if(status==1)
                {
                    status = userId;
                    //Response.Cookies.Append("jwt", res,
                    //    new CookieOptions
                    //    {
                    //        HttpOnly = true,
                    //        Secure = true,
                    //        Expires = DateTime.UtcNow.AddHours(1)
                    //    }
                    //    );
                }
                else
                {
                    status = -1;
                }
            }
            catch (Exception e)
            {
                status = -99;
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            return status;
        }

        [HttpGet]
        public JsonResult GetUserContacts(int userId)
        {
            List<Users> contactList = new List<Users>();
            try
            {
                contactList = _repository.GetUserContacts(userId);
            }
            catch (Exception e)
            {
                contactList = null;
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            return Json(contactList);
        }

        [HttpGet]
        public List<Users> searchUser(string pattern)
        {
            List<Users> userList = new List<Users>();
            try
            {
                userList = _repository.SearchUsers(pattern);
            }
            catch (Exception e)
            {
                userList = null;
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            return userList;
        }

        [HttpPost]
        public int AddContact(int userBid, int userId)
        {
            int status = 0;

            try
            {
                if(ModelState.IsValid)
                {
                    _repository.AddContact(userBid, userId);
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
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            return status;
        }

        //[HttpPost]
        //public int RemoveContact(string emailId, int userId)
        //{
        //    int status = 0;

        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            _repository.DeleteContact(emailId, userId);
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
        //        Console.WriteLine(e.Message);
        //        Console.WriteLine(e.StackTrace);
        //    }
        //    return status;
        //}
        [HttpPut]
        public bool BlockUnBlock(Users user)
        {
            bool status=false;
            try
            {
                status = _repository.BlockUnblock(user.UserId);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
    }
}
