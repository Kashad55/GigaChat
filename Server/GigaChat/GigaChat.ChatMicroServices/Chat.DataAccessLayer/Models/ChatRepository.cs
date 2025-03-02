using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chat.DataAccessLayer.Models
{
    public class ChatRepository
    {
        private ChatDbContext context;
        public ChatRepository(ChatDbContext context)
        {
            this.context = context;
        }

        public List<Message> GetMessages(int userAId , int userBId) { 
            List<Message> messages = new List<Message>();
            try
            {
                var chat = (from chats in context.Chats
                            where (chats.UserAId == userAId && chats.UserBId == userBId) || (chats.UserAId == userBId && chats.UserBId == userAId)
                            select chats).FirstOrDefault();

                if(chat == null)
                {
                    messages = null;
                }
                else
                {
                    messages = context.Messages.Where(m => m.ChatId == chat.ChatId).OrderBy(m => m.SendAt).ToList();
                }
            }
            catch (Exception)
            {
                messages = null;
            }
            return messages;
        }

        public int AddMessage(string messageSent, int senderId, int user2Id)
        {
            int status = 0;
            try
            {
                var chat = (from chats in context.Chats
                            where (chats.UserAId == senderId && chats.UserBId == user2Id) || (chats.UserAId == user2Id && chats.UserBId == senderId)
                            select chats).FirstOrDefault();
                if (chat == null)
                {
                    chat = new Chats
                    {
                        UserAId = senderId,
                        UserBId = user2Id,
                        CreatedAt = DateTime.Now,
                    };
                    context.Chats.Add(chat);
                    context.SaveChanges();
                }

                var message = new Message
                {
                    ChatId = chat.ChatId,
                    SenderId = senderId,
                    MessageText = messageSent,
                    SendAt = DateTime.Now
                };
                context.Messages.Add(message);
                context.SaveChanges();
                status = 1;
            }
            catch (Exception)
            {
                status = -99;
            }
           return status;
        }

        public int DeleteMessage(int messageId)
        {
            int status = 0;
            try
            {
                var msg = (from message in context.Messages
                           where message.MessageId == messageId
                           select message).FirstOrDefault();

                if (msg == null) {
                    status = -1;
                    return status;
                }
                context.Messages.Remove(msg);
                context.SaveChanges();
                status = 1;
            }
            catch (Exception)
            {

                status = -99;
            }
            return status;
        }

    }
}
