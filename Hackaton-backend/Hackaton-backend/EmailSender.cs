using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace Hackaton_backend
{
    public static class EmailSender
    {
        public static async Task SendRegistrationMailUser(string To)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(To + "<" + To + ">"));
            message.From = new MailAddress("<--Hackathon--> <hackathon@belgiumcampus.ac.za>");
            message.Subject = "Hackathon registration";
            message.Body = "Congratulations! \n" +
                "You have been registered to the Hackathon" + ".\n" +
                "You will receive sign in Credentials once the Hackathon has started.\n";
            using(var smtp = new SmtpClient())
            {
                await smtp.SendMailAsync(message);
                await Task.FromResult(0);
            }

        }

        public static async Task SendRegistrationMailAdmin(string email, string password)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(email + "<" + email + ">"));
            message.From = new MailAddress("<--Hackathon--> <hackathon@belgiumcampus.ac.za>");
            message.Subject = "Hackathon registration";
            message.Body = "Congratulations! \n" +
                "You have been registered to the " + "Hackathon" + ".\n" +
                "Your credentials: \n" +
                "Email: " + email + "\n" +
                "Password: " + password + "\n" +
                "You can change your credentials once you login.";

            using (var smtp = new SmtpClient())
            {
                await smtp.SendMailAsync(message);
                await Task.FromResult(0);
            }

        }

        public static async Task SendPasswordReset(string email, string password)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(email + "<" + email + ">"));
            message.From = new MailAddress("<--Hackathon--> <hackathon@belgiumcampus.ac.za>");
            message.Subject = "Hackathon password reset";
            message.Body = "Congratulations! \n" +
                "Your password has been reseted.\n" +
                "Your new password: " + password + "\n" +
                "You can change your credentials once you login.";

            using (var smtp = new SmtpClient())
            {
                await smtp.SendMailAsync(message);
                await Task.FromResult(0);
            }

        }

        public static async Task SendStartMail(string To, string HackathonTitle, string HackathonLink, string email, string password)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(To + "<" + To + ">"));
            message.From = new MailAddress("<--Hackathon--> <hackathon@belgiumcampus.ac.za>");
            message.Subject = "Hackathon has started!";
            message.Body = "Congratulations! \n" +
                "You have been registered to the " + HackathonTitle + ".\n" +
                "The link: " + HackathonLink + "\n" +
                "Your credentials: \n" +
                "Email: " + email + "\n" +
                "Password: " + password + "\n" +
                "You can change your credentials once you login.";

            using (var smtp = new SmtpClient())
            {
                await smtp.SendMailAsync(message);
                await Task.FromResult(0);
            }

        }

        internal static async Task SendEndMail(string To, string HackathonTitle)
        {
            var message = new MailMessage();
            message.To.Add(new MailAddress(To + "<" + To + ">"));
            message.From = new MailAddress("<--Hackathon--> <hackathon@belgiumcampus.ac.za>");
            message.Subject = "Hackathon has ended!";
            message.Body = "Dear participant, \n" +
                "we want to inform you that the " + HackathonTitle + " has ended" + ".\n" +
                "Thank you for your participation. You will hear about the results soon.";

            using (var smtp = new SmtpClient())
            {
                await smtp.SendMailAsync(message);
                await Task.FromResult(0);
            }
        }
    }
}