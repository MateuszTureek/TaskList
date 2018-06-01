using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Web;
using TaskList.Models;

namespace TaskList.Db
{
    public class ApplicationUser : IdentityUser
    {
        public async System.Threading.Tasks.Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class AuthContext : IdentityDbContext<ApplicationUser>
    {
        public AuthContext()
            : base("TaskListConn", throwIfV1Schema: false)
        {
            Configuration.LazyLoadingEnabled = false;
            Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Task> Tasks { get; set; }
        public DbSet<ListOfTasks> TaskLists { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ListOfTasks>().HasKey(k => k.Id);
            modelBuilder.Entity<ListOfTasks>().Property(p => p.Name).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<ListOfTasks>().Property(p => p.UserId).HasMaxLength(128).IsRequired();

            modelBuilder.Entity<Task>().HasKey(k => k.Id);
            modelBuilder.Entity<Task>().Property(p => p.Name).HasMaxLength(50);
            modelBuilder.Entity<Task>().Property(p => p.Created).IsRequired();
            modelBuilder.Entity<Task>().Property(p => p.End).IsOptional();
            modelBuilder.Entity<Task>().Property(p => p.IsDone).IsRequired();

            modelBuilder.Entity<Task>().HasRequired(r => r.List).WithMany(m => m.Tasks).WillCascadeOnDelete(true);
        }

        public static AuthContext Create()
        {
            return new AuthContext();
        }
    }
}