using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Chat.DataAccessLayer;
using Chat.DataAccessLayer.Models;

namespace Chat.ServiceLayer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ChatController : Controller
    {
        ChatRepository repository;
        public ChatController(ChatRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public JsonResult GetAllMessages(int userAId, int userBId)
        {
            List<Message> messages = new List<Message>();
            try
            {
                messages = repository.GetMessages(userAId,userBId);
            }
            catch (Exception)
            {
                messages = null;
            }
            return Json(messages);
        }

        [HttpPost]
        public JsonResult AddMessage(string messageSent, int senderId, int user2Id)
        {
            int status = 0;
            try
            {
                status =repository.AddMessage(messageSent, senderId, user2Id);
                
            }
            catch (Exception)
            {
                status = -99;
            }
            return Json(status);
        }

        [HttpDelete]
        public JsonResult DeleteMessage(int messageId)
        {
            int status =0;
            try
            {
                status =repository.DeleteMessage(messageId);
            }
            catch (Exception)
            {
                status = -99;
            }
            return Json(status);
        }
    }
}
