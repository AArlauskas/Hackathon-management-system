using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Hackaton_backend.Models;
using Microsoft.AspNetCore.Http;

namespace Hackaton_backend.Controllers
{
    public class TeamsController : ApiController
    {
        private HackatonEntities db = new HackatonEntities();

        // GET: api/Teams
        //public IQueryable<Team> GetTeams()
        //{
        //    return db.Teams;
        //}
        [Authorize(Roles = "admin")]
        [HttpGet]
        public IHttpActionResult GetTeams()
        {
            var teams = db.Teams.Where(team => !team.IsDeleted).Select(team => new
            {
                team.Id,
                team.Name,
                Hackaton = team.HackatonId == null ? null : new
                {
                    team.HackatonId,
                    team.Hackaton.Name,
                    status = team.Hackaton.Status != "before"
                },
                UserCount = team.Users.Where(user => !user.IsDeleted).Count(),
                team.ProjectTitle
            }).ToList();

            return Ok(teams);
        }

        // GET: api/Teams/5
        [ResponseType(typeof(Team))]
        public IHttpActionResult GetTeam(int id)
        {
            Team team = db.Teams.Find(id);
            if (team == null)
            {
                return NotFound();
            }

            var tempTeam = new
            {
                team.Id,
                team.Name,
                team.ProjectTitle
            };

            return Ok(tempTeam);
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/Teams/untaken-list/{id}")]
        public IHttpActionResult GetUntakenTeams(int id)
        {
            var teams = db.Teams.Where(team => !team.IsDeleted)
                .Where(team => team.HackatonId == id || team.HackatonId == null)
                .Select(team => new
            {
                team.Id,
                team.Name
            }).ToList();

            return Ok(teams);
        }

        [Authorize(Roles = "admin,user")]
        [HttpGet]
        [Route("api/Teams/Users/{id}")]
        public IHttpActionResult GetTeamUsers(int id)
        {
            var team = db.Teams.Where(tempTeam => !tempTeam.IsDeleted)
                .FirstOrDefault(tempTeam => tempTeam.Id == id);
            if (team == null)
            {
                return NotFound();
            }

            var result = new
            {
                team.Id,
                team.Name,
                Users = team.Users.Where(user => !user.IsDeleted && !user.IsAdmin).Select(user => new
                {
                    user.Id,
                    user.Firstname,
                    user.Lastname,
                    user.Email
                }).ToList()
            };

            return Ok(result);
        }


        // PUT: api/Teams/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTeam(int id, Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != team.Id)
            {
                return BadRequest();
            }

            db.Teams.Find(id).Name = team.Name;
            db.Teams.Find(id).ProjectTitle = team.ProjectTitle;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var updatedTeam = new
            {
                team.Id,
                team.Name,
                Hackaton = team.HackatonId == null ? null : new
                {
                    team.HackatonId,
                    team.Hackaton.Name,
                },
                UserCount = team.Users.Where(user => !user.IsDeleted).Count(),
                team.ProjectTitle
            };

            return Ok(updatedTeam);
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("api/Teams/add-user/{id}")]
        public IHttpActionResult AddUsersToTeam(int id, int[] add)
        {
            Team team = db.Teams.Find(id);

            if (team == null)
            {
                return NotFound();
            }

            foreach (var value in add)
            {
                var user = db.Users.Find(value);
                team.Users.Add(user);
            }

            db.SaveChanges();
            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpPut]
        [Route("api/Teams/remove-user/{id}")]
        public IHttpActionResult RemoveUsersFromTeam(int id, int[] add)
        {
            Team team = db.Teams.Find(id);

            if (team == null)
            {
                return NotFound();
            }

            foreach (var value in add)
            {
                var user = db.Users.Find(value);
                team.Users.Remove(user);
            }

            db.SaveChanges();
            return Ok();
        }

        // POST: api/Teams
        [Authorize(Roles = "admin")]
        [ResponseType(typeof(Team))]
        public IHttpActionResult PostTeam(Team team)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Teams.Add(team);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TeamExists(team.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            Directory.CreateDirectory(startupPath + "/Uploads/" + team.Id);
            var createdTeam = new
            {
                team.Id,
                team.Name,
                Hackaton = team.HackatonId == null ? null : new
                {
                    team.HackatonId,
                    team.Hackaton.Name,
                },
                UserCount = team.Users.Where(user => !user.IsDeleted).Count(),
                team.ProjectTitle
            };

            return Ok(createdTeam);
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("api/Teams/delete/{id}")]
        public IHttpActionResult MarkDeletedTeam(int id)
        {
            db.Teams.Find(id).IsDeleted = true;
            foreach(var user in db.Teams.Find(id).Users)
            {
                user.TeamId = null;
            }
            db.SaveChanges();

            return Ok(id);
        }

        [HttpGet]
        [Route("api/Teams/Text")]
        [Authorize(Roles = "user")]
        public IHttpActionResult getText()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            
            var text = foundUser.Team.PageContent;
            if(text == null)
            {
                return Ok("");
            }
            return Ok(text);
        }

        [HttpGet]
        [Route("api/Teams/admin/Text/{id}")]
        [Authorize(Roles = "admin")]
        public IHttpActionResult getTextAdmin(int id)
        {
            var text = db.Teams.Find(id).PageContent;
            if (text == null)
            {
                return Ok("");
            }
            return Ok(text);
        }

        [HttpGet]
        [Route("api/Teams/public/Text/{id}")]
        [AllowAnonymous]
        public IHttpActionResult getPublicText(int id)
        {
            var team = db.Teams.Find(id);
            if(team.Hackaton.Status != "after")
            {
                return Unauthorized();
            }
            var text = team.PageContent;
            if (text == null)
            {
                return Ok("");
            }
            return Ok(text);
        }

        [HttpPut]
        [Route("api/Teams/Text")]
        [Authorize(Roles = "user")]
        public IHttpActionResult postText(SiteContentModel model)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            db.Teams.Find(foundUser.TeamId).PageContent = model.Text;
            db.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "user")]
        [Route("api/Teams/file-list")]
        public IHttpActionResult getFileList()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var fileRoutes = Directory.GetFiles(startupPath + "/Uploads/" + foundUser.TeamId);
            List<string> files = new List<string>();
            foreach (string route in fileRoutes)
            {
                files.Add(Path.GetFileName(route));
            }
            if(files.Count() == 0)
            {
                return Ok("");
            }
            return Ok(files);
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        [Route("api/Teams/admin/file-list/{id}")]
        public IHttpActionResult getFileListAdmin(int id)
        {
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var fileRoutes = Directory.GetFiles(startupPath + "/Uploads/" + id);
            List<string> files = new List<string>();
            foreach (string route in fileRoutes)
            {
                files.Add(Path.GetFileName(route));
            }
            if (files.Count() == 0)
            {
                return Ok("");
            }
            return Ok(files);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/Teams/public/file-list/{id}")]
        public IHttpActionResult getPublicFileList(int id)
        {
            if(db.Teams.Find(id).Hackaton.Status != "after")
            {
                return Unauthorized();
            }
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var fileRoutes = Directory.GetFiles(startupPath + "/Uploads/" + id);
            List<string> files = new List<string>();
            foreach (string route in fileRoutes)
            {
                files.Add(Path.GetFileName(route));
            }
            if (files.Count() == 0)
            {
                return Ok("");
            }
            return Ok(files);
        }

        [HttpGet]
        [Route("api/Teams/download-file")]
        [Authorize(Roles = "user")]
        public HttpResponseMessage DownloadFile([FromUri]string fileName)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var fileRoutes = Directory.GetFiles(startupPath + "/Uploads/" + foundUser.TeamId);
            List<string> files = new List<string>();
            var file = fileRoutes.FirstOrDefault(temp => temp.Contains(fileName));
            if(file == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            var fileBytes = File.ReadAllBytes(file);
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var fileMemoryStream = new MemoryStream(fileBytes);
            response.Content = new StreamContent(fileMemoryStream);
            var headers = response.Content.Headers;
            headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            headers.ContentDisposition.FileName = fileName;
            headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            headers.ContentLength = fileMemoryStream.Length;
            return response;

        }

        [HttpGet]
        [Route("api/Teams/admin/download-file/{id}")]
        [Authorize(Roles = "admin")]
        public HttpResponseMessage DownloadFileAdmin(int id,[FromUri] string fileName)
        {
            if (db.Teams.Find(id).Hackaton.Status != "after")
            {
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var fileRoutes = Directory.GetFiles(startupPath + "/Uploads/" + id);
            List<string> files = new List<string>();
            var file = fileRoutes.FirstOrDefault(temp => temp.Contains(fileName));
            if (file == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            var fileBytes = File.ReadAllBytes(file);
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var fileMemoryStream = new MemoryStream(fileBytes);
            response.Content = new StreamContent(fileMemoryStream);
            var headers = response.Content.Headers;
            headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            headers.ContentDisposition.FileName = fileName;
            headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            headers.ContentLength = fileMemoryStream.Length;
            return response;

        }


        [HttpGet]
        [Route("api/Teams/public/download-file/{id}")]
        [AllowAnonymous]
        public HttpResponseMessage DownloadPublicFile(int id, [FromUri] string fileName)
        {
            var startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var fileRoutes = Directory.GetFiles(startupPath + "/Uploads/" + id);
            List<string> files = new List<string>();
            var file = fileRoutes.FirstOrDefault(temp => temp.Contains(fileName));
            if (file == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }

            var fileBytes = File.ReadAllBytes(file);
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var fileMemoryStream = new MemoryStream(fileBytes);
            response.Content = new StreamContent(fileMemoryStream);
            var headers = response.Content.Headers;
            headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            headers.ContentDisposition.FileName = fileName;
            headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/octet-stream");
            headers.ContentLength = fileMemoryStream.Length;
            return response;

        }

        [Authorize(Roles = "user")]
        [HttpPost]
        [Route("api/Teams/upload-files")]
        public HttpResponseMessage UploadFiles()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count < 1)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            var root = HttpContext.Current.Server.MapPath("~/Uploads/" + foundUser.TeamId + "/");
            var fileRoutes = Directory.GetFiles(root).ToList();
            List<string> currentFiles = new List<string>();
            foreach (string file in httpRequest.Files)
            {
                var postedFile = httpRequest.Files[file];
                var filePath = root + postedFile.FileName;
                currentFiles.Add(filePath);
                if(fileRoutes.Contains(filePath))
                {
                    continue;
                }
                postedFile.SaveAs(filePath);
            }
            fileRoutes.RemoveAll(temp => currentFiles.Contains(temp));
            foreach(var temp in fileRoutes)
            {
                File.Delete(temp);
            }

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [Authorize (Roles = "user")]
        [HttpGet]
        [Route("api/Teams/team-details")]
        public IHttpActionResult GetDetails()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            var result = new
            {
                foundUser.Team.Name,
                foundUser.Team.ProjectTitle
            };
            return Ok(result);
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        [Route("api/Teams/admin/team-details/{id}")]
        public IHttpActionResult GetDetailsAdmin(int id)
        {
            var team = db.Teams.Find(id);
            var result = new
            {
                team.Name,
                team.ProjectTitle
            };
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("api/Teams/public/team-details/{id}")]
        public IHttpActionResult GetPublicDetails(int id)
        {
            var team = db.Teams.Find(id);
            if(team.Hackaton.Status != "after")
            {
                return Unauthorized();
            }
            var result = new
            {
                team.Name,
                team.ProjectTitle
            };
            return Ok(result);
        }

        [Authorize(Roles = "user")]
        [HttpPut]
        [Route("api/Teams/team-details")]
        public IHttpActionResult SetDetails(TeamDetailsRequest request)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int id = int.Parse(identity.Claims.FirstOrDefault(c => c.Type == "Id").Value);
            var foundUser = db.Users.FirstOrDefault(user => user.Id == id);
            db.Teams.Find(foundUser.TeamId).Name = request.name;
            db.Teams.Find(foundUser.TeamId).ProjectTitle = request.title;
            db.SaveChanges();
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TeamExists(int id)
        {
            return db.Teams.Count(e => e.Id == id) > 0;
        }
    }
}