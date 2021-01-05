using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hackaton_backend.Models
{
    public class RegisterRequest
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string School { get; set; }
        public string Programme { get; set; }
        public string PhoneNumber { get; set; }
    }
}