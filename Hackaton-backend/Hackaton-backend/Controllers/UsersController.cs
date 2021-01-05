using System;
using System.Data;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Hackaton_backend.Models;

namespace Hackaton_backend.Controllers
{
    public class UsersController : ApiController
    {
        private HackatonEntities db = new HackatonEntities();

        [Authorize(Roles = "admin")]
        [HttpGet]
        public IHttpActionResult GetUsers()
        {
            var users = db.Users.Where(user => !user.IsDeleted).Select(user => new
            {
                user.Id,
                user.Firstname,
                user.Lastname,
                user.Email,
                user.IsAdmin,
                user.PhoneNumber,
                user.School,
                user.Programme,
                Team = user.TeamId == null ? null : new
                {
                    user.Team.Id,
                    user.Team.Name,
                },
            }).ToList();

            return Ok(users);
        }

        [HttpGet]
        [Route("api/Users/personal")]
        public IHttpActionResult GetMyself()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var user = db.Users.Find(id);
            if(user.IsAdmin)
            {
                var foundUser = new
                {
                    Name = user.Firstname + " " + user.Lastname,
                    user.Email,
                    Role = user.IsAdmin ? "admin" : "user"
                };

                return Ok(foundUser);
            }
            else
            {
                if(user.TeamId != null && user.Team.HackatonId != null)
                {
                    if(user.Team.Hackaton.Status == "after")
                    {
                        return Unauthorized();
                    }
                    var foundUser = new
                    {
                        Name = user.Firstname + " " + user.Lastname,
                        user.Email,
                        Role = user.IsAdmin ? "admin" : "user"
                    };

                    return Ok(foundUser);
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

        [Authorize(Roles = "admin,user")]
        [HttpGet]
        [Route("api/Users/get-credentials")]
        public IHttpActionResult GetCredentials()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            if(foundUser == null)
            {
                return NotFound();
            }
            var result = new
            {
                foundUser.Firstname,
                foundUser.Lastname,
                foundUser.Email,
                foundUser.Password
            };
            return Ok(result);
        }

        // GET: api/Users/5
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            var tempUser = new
            {
                user.Id,
                Name = user.Firstname + " " + user.Lastname,
                Role = user.IsAdmin ? "admin" : "user",
                Team = new
                {
                    user.Team.Id,
                    user.Team.Name,
                }
            };

            return Ok(tempUser);
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/Users/untaken-list/{id}")]
        public IHttpActionResult GetUntakenUsers(int id)
        {
            var users = db.Users.Where(user => !user.IsDeleted && !user.IsAdmin)
                .Where(user => user.TeamId == id || user.TeamId == null)
                .Select(user => new
                {
                    user.Id,
                    Name = user.Firstname + " " + user.Lastname
                }).ToList();

            return Ok(users);
        }

        // PUT: api/Users/5
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Users.Find(id).IsAdmin = user.IsAdmin;
            db.Users.Find(id).Firstname = user.Firstname;
            db.Users.Find(id).Lastname = user.Lastname;
            db.Users.Find(id).Email = user.Email;
            db.Users.Find(id).PhoneNumber = user.PhoneNumber;
            db.Users.Find(id).School = user.School;
            db.Users.Find(id).Programme = user.Programme;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var tempUser = new
            {
                user.Id,
                user.Firstname,
                user.Lastname,
                user.Email,
                user.IsAdmin,
                user.PhoneNumber,
                user.School,
                user.Programme,
                Team = user.TeamId == null ? null : new
                {
                    user.Team.Id,
                    user.Team.Name,
                }
            };

            return Ok(tempUser);
        }

        [Authorize(Roles = "admin,user")]
        [HttpPut]
        [Route("api/Users/update-credentials")]
        public IHttpActionResult UpdateCredentials(UpdateCredentialsRequest request)
        {
            var user = (ClaimsIdentity)User.Identity;
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            db.Users.Find(id).Firstname = request.Firstname;
            db.Users.Find(id).Lastname = request.Lastname;
            db.Users.Find(id).Email = request.Email;
            db.Users.Find(id).Password = request.Password;

            db.SaveChanges();
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Users/Register")]
        public async Task<IHttpActionResult> RegisterUserAsync(RegisterRequest request)
        {
            if(db.Users.Where(tempUser => !tempUser.IsDeleted && tempUser.Email == request.Email).Count() != 0)
            {
                return BadRequest();
            }
            var user = new User()
            {
                Firstname = request.Firstname,
                Lastname = request.Lastname,
                Email = request.Email,
                School = request.School,
                Programme = request.Programme,
                PhoneNumber = request.PhoneNumber,
                IsAdmin = false,
            };

            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string password = new string(Enumerable.Repeat(chars, 8)
            .Select(s => s[random.Next(s.Length)]).ToArray());
            user.Password = password;

            await EmailSender.SendRegistrationMailUser(user.Email);

            db.Users.Add(user);
            db.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("api/Users/delete/{id}")]
        public IHttpActionResult MarkDeletedUser(int id)
        {
            db.Users.Find(id).IsDeleted = true;
            db.SaveChanges();

            return Ok(id);
        }

        // POST: api/Users
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(User))]
        public async System.Threading.Tasks.Task<IHttpActionResult> PostUserAsync(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string password = new string(Enumerable.Repeat(chars, 8)
            .Select(s => s[random.Next(s.Length)]).ToArray());
            user.Password = password;

            db.Users.Add(user);
            if(user.IsAdmin)
            {
                await EmailSender.SendRegistrationMailAdmin(user.Email, password);
            }
            else
            {
                await EmailSender.SendRegistrationMailUser(user.Email);
            }

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            var createdUser = new
            {
                user.Id,
                user.Firstname,
                user.Lastname,
                user.PhoneNumber,
                user.Programme,
                user.School,
                user.Email,
                user.IsAdmin,
                Team = user.TeamId == null ? null : new
                {
                    user.Team.Id,
                    user.Team.Name,
                }
            };
            return Ok(createdUser);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("api/Users/reset-password")]
        public async Task<IHttpActionResult> ResetPasswordAsync(string email)
        {
            var user = db.Users.Where(temp => !temp.IsDeleted).FirstOrDefault(temp => temp.Email == email);
            if(user == null)
            {
                return NotFound();
            }

            Random random = new Random();
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string password = new string(Enumerable.Repeat(chars, 8)
            .Select(s => s[random.Next(s.Length)]).ToArray());
            user.Password = password;

            try
            {
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return NotFound();
            }

            await EmailSender.SendPasswordReset(email, password);
            return Ok();
        }



        // DELETE: api/Users/5
        //[ResponseType(typeof(User))]
        //public IHttpActionResult DeleteUser(int id)
        //{
        //    User user = db.Users.Find(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Users.Remove(user);
        //    db.SaveChanges();

        //    return Ok(user);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}