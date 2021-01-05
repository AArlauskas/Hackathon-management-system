using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hackaton_backend.Models
{
    public class UserRepository : IDisposable
    {
        private HackatonEntities context = new HackatonEntities();
        public User ValidateUser(string email, string password)
        {
            return context.Users.FirstOrDefault(user => user.Email == email && user.Password == password);
        }
        public void Dispose()
        {
            context.Dispose();
        }
    }
}