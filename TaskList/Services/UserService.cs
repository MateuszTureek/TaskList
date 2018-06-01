using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using TaskList.Db;
using TaskList.Models;

namespace TaskList.Services
{
    public class UserService : IDisposable
    {
        private AuthContext _dbContext;

        private UserManager<ApplicationUser> _userManager;

        public UserService()
        {
            _dbContext = new AuthContext();
            _userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(_dbContext));
        }

        public IdentityUser FindUser(string userId)
        {
            IdentityUser user = _userManager.FindById(userId);

            return user;
        }

        public async Task<IEnumerable<Claim>> GetUserClaims(string userId)
        {
            var claims = await _userManager.GetClaimsAsync(userId);
            return claims;
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            ApplicationUser user = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Email = userModel.UserName,
                UserName = userModel.UserName
            };
            // create user
            var result = await _userManager.CreateAsync(user, userModel.Password);

            _userManager.AddClaim(user.Id, new Claim(ClaimTypes.NameIdentifier, user.Id));

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _dbContext.Dispose();
            _userManager.Dispose();
        }
    }
}