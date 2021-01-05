using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using Hackaton_backend.Models;

namespace Hackaton_backend.Controllers
{
    public class HackatonsController : ApiController
    {
        private HackatonEntities db = new HackatonEntities();

        // GET: api/Hackatons
        //public IQueryable<Hackaton> GetHackatons()
        //{
        //    //return db.Hackatons;
        //}

        [Authorize(Roles = "admin")]
        [HttpGet]
        public IHttpActionResult GetHackatons()
        {
            var hackatons = db.Hackatons.Where(hackaton => !hackaton.IsDeleted).Select(hackaton => new
            {
                hackaton.Id,
                hackaton.Name,
                hackaton.Description,
                hackaton.Link,
                hackaton.Status,
                Teams = hackaton.Teams.Where(team => !team.IsDeleted).Select(team => new
                {
                    team.Id,
                    team.Name

                }).ToList(),
            }).ToList();

            return Ok(hackatons);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/hackatons/public")]
        public IHttpActionResult GetPublicHackatons()
        {
            var hackatons = db.Hackatons.Where(hackaton => !hackaton.IsDeleted).Where(hackaton => hackaton.Status == "after")
                .Select(hackaton => new
            {
                hackaton.Id,
                hackaton.Name,
                hackaton.Description,
                hackaton.Link,
                hackaton.Status,
                Teams = hackaton.Teams.Where(team => !team.IsDeleted).Select(team => new
                {
                    team.Id,
                    team.Name

                }).ToList(),
            }).ToList();

            return Ok(hackatons);
        }

        // GET: api/Hackatons/5
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(Hackaton))]
        public IHttpActionResult GetHackaton(int id)
        {
            Hackaton hackaton = db.Hackatons.Find(id);
            if (hackaton == null)
            {
                return NotFound();
            }

            var tempHackaton = new
            {
                hackaton.Id,
                hackaton.Name,
                hackaton.Description,
                hackaton.Link,
                hackaton.Status,
                Teams = hackaton.Teams.Select(team => new
                {
                    team.Id,
                    team.Name
                }).ToList()
            };

            return Ok(tempHackaton);
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/Hackatons/Teams/{id}")]
        public IHttpActionResult GetHackatonTeams(int id)
        {
            var hackaton = db.Hackatons.Where(tempHackaton => !tempHackaton.IsDeleted)
                .FirstOrDefault(tempHackaton => tempHackaton.Id == id);
            if(hackaton == null)
            {
                return NotFound();
            }

            var result = new
            {
                hackaton.Id,
                hackaton.Name,
                status = hackaton.Status != "before",
                Teams = hackaton.Teams.Where(team => !team.IsDeleted).Select(team => new
                {
                    team.Id,
                    team.Name,
                    team.ProjectTitle,
                    UserCount = team.Users.Count()
                }).ToList()
            };

            return Ok(result);
        }

        [Authorize(Roles = "user")]
        [HttpGet]
        [Route("api/Hackatons/Teams/User")]
        public IHttpActionResult GetHackatonTeamsUser()
        {
            var Tokenuser = (ClaimsIdentity)User.Identity;
            var userId = int.Parse(Tokenuser.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var id = db.Users.Find(userId).Team.HackatonId;
            var hackaton = db.Hackatons.Where(tempHackaton => !tempHackaton.IsDeleted)
                .FirstOrDefault(tempHackaton => tempHackaton.Id == id);
            if (hackaton == null)
            {
                return NotFound();
            }

            var result = new
            {
                hackaton.Id,
                hackaton.Name,
                status = hackaton.Status == "after",
                Teams = hackaton.Teams.Where(team => !team.IsDeleted).Select(team => new
                {
                    team.Id,
                    team.Name,
                    team.ProjectTitle,
                    UserCount = team.Users.Count()
                }).ToList()
            };

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/Hackatons/public/Teams/{id}")]
        public IHttpActionResult GetPublicHackatonTeams(int id)
        {
            var hackaton = db.Hackatons.Where(tempHackaton => !tempHackaton.IsDeleted).Where(tempHackaton => tempHackaton.Status == "after")
                .FirstOrDefault(tempHackaton => tempHackaton.Id == id);
            if (hackaton == null)
            {
                return NotFound();
            }

            var result = new
            {
                hackaton.Id,
                hackaton.Name,
                status = hackaton.Status != "before",
                Teams = hackaton.Teams.Where(team => !team.IsDeleted).Select(team => new
                {
                    team.Id,
                    team.Name,
                    team.ProjectTitle,
                    UserCount = team.Users.Count()
                }).ToList()
            };

            return Ok(result);
        }

        // PUT: api/Hackatons/5
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(void))]
        public async System.Threading.Tasks.Task<IHttpActionResult> PutHackatonAsync(int id, [FromBody]Hackaton hackaton)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hackaton.Id)
            {
                return BadRequest();
            }

            db.Hackatons.Find(id).Name = hackaton.Name;
            db.Hackatons.Find(id).Link = hackaton.Link;
            db.Hackatons.Find(id).Description = hackaton.Description;
            var status = db.Hackatons.Find(id).Status;

            if (hackaton.Status == "middle" && status == "before")
            {
                foreach (var team in db.Hackatons.Find(id).Teams)
                {
                    foreach(var user in team.Users)
                    {
                        await EmailSender.SendStartMail(user.Email, hackaton.Name, hackaton.Link, user.Email, user.Password);
                    }
                }
            }
            else if(hackaton.Status == "after" && status == "middle")
            {
                foreach (var team in db.Hackatons.Find(id).Teams)
                {
                    foreach (var user in team.Users)
                    {
                        await EmailSender.SendEndMail(user.Email, hackaton.Name);
                    }
                }
            }

            db.Hackatons.Find(id).Status = hackaton.Status;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HackatonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var tempHackaton = new
            {
                hackaton.Id,
                hackaton.Name,
                hackaton.Description,
                hackaton.Link,
                hackaton.Status,
                Teams = hackaton.Teams.Select(team => new
                {
                    team.Id,
                    team.Name
                }).ToList()
            };

            return Ok(tempHackaton);
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route ("api/Hackatons/add-team/{id}")]
        public IHttpActionResult AddTeamsToHackaton(int id, int[] add)
        {
            Hackaton hackaton = db.Hackatons.Find(id);

            if(hackaton == null)
            {
                return NotFound();
            }

            foreach(var value in add)
            {
                var team = db.Teams.Find(value);
                hackaton.Teams.Add(team);
            }

            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("api/Hackatons/remove-team/{id}")]
        public IHttpActionResult RemoveTeamsFromHackaton(int id, int[] remove)
        {
            Hackaton hackaton = db.Hackatons.Find(id);

            if (hackaton == null)
            {
                return NotFound();
            }

            foreach (var value in remove)
            {
                var team = db.Teams.Find(value);
                hackaton.Teams.Remove(team);
            }

            db.SaveChanges();
            return Ok();
        }

        // POST: api/Hackatons
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(Hackaton))]
        public IHttpActionResult PostHackaton([FromBody]Hackaton hackaton)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            hackaton.Status = "before";

            db.Hackatons.Add(hackaton);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (HackatonExists(hackaton.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            var tempHackaton = new
            {
                hackaton.Id,
                hackaton.Name,
                hackaton.Description,
                hackaton.Link,
                hackaton.Status,
                Teams = hackaton.Teams.Select(team => new
                {
                    team.Id,
                    team.Name
                }).ToList()
            };

            return Ok(tempHackaton);
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("api/Hackatons/delete/{id}")]
        public IHttpActionResult MarkDeletedHackaton(int id)
        {
            db.Hackatons.Find(id).IsDeleted = true;
            db.SaveChanges();

            return Ok(id);
        }

        // DELETE: api/Hackatons/5
        //[ResponseType(typeof(Hackaton))]
        //public IHttpActionResult DeleteHackaton(int id)
        //{
        //    Hackaton hackaton = db.Hackatons.Find(id);
        //    if (hackaton == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Hackatons.Remove(hackaton);
        //    db.SaveChanges();

        //    return Ok(hackaton);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HackatonExists(int id)
        {
            return db.Hackatons.Count(e => e.Id == id) > 0;
        }
    }
}