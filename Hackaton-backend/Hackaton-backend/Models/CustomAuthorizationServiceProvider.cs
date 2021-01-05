using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Hackaton_backend.Models
{
    public class CustomAuthorizationServiceProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            using(UserRepository _repository = new UserRepository())
            {
                var user = _repository.ValidateUser(context.UserName, context.Password);
                if(user == null)
                {
                    context.SetError("invalid_grant", "Provided password is not correct");
                    return;
                }

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("Id", user.Id.ToString()));
                identity.AddClaim(new Claim(ClaimTypes.Role, user.IsAdmin ? "admin" : "user"));
                identity.AddClaim(new Claim(ClaimTypes.Name, user.Firstname + " " + user.Lastname));
                identity.AddClaim(new Claim(ClaimTypes.Email, user.Email));

                context.Validated(identity);
            }
        }
    }
}