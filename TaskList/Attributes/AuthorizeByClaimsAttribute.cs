using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using TaskList.Services;

namespace TaskList.Attributes
{
    public class AuthorizeByClaimsAttribute: AuthorizationFilterAttribute
    {
        Claim[] claims = null;

        public override Task OnAuthorizationAsync(HttpActionContext actionContext, System.Threading.CancellationToken cancellationToken)
        {
            var principal = actionContext.RequestContext.Principal as ClaimsPrincipal;

            if (!principal.Identity.IsAuthenticated)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return Task.FromResult<object>(null);
            }

            using (var service = new UserService())
            {
                var userId = principal.FindFirst(ClaimTypes.NameIdentifier).Value;
                var user = service.FindUser(userId);
                if (user == null)
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                    return Task.FromResult<object>(null);
                }
                claims = service.GetUserClaims(user.Id).Result.ToArray();

                int i, lnegth = claims.Length;
                for (i = 0; i < lnegth; i += 1)
                {
                    if (!(principal.HasClaim(x => x.Type == claims[i].Type && x.Value == claims[i].Value)))
                    {
                        actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                        return Task.FromResult<object>(null);
                    }
                }
            }
            //User is Authorized, complete execution
            return Task.FromResult<object>(null);
        }
    }
}