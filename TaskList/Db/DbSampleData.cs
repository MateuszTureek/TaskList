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
    public class DbSampleData : DropCreateDatabaseIfModelChanges<AuthContext>
    {
        protected override void Seed(AuthContext context)
        {
            //UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>());
            //var user = userManager.FindByName("superUser@fake.com");

            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new AuthContext()));

            ApplicationUser user = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "superUser@fake.com",
                Email = "superUser@fake.com",
                PasswordHash = userManager.PasswordHasher.HashPassword("123456"),
            };
            userManager.Create(user);
            userManager.AddClaim(user.Id, new Claim(ClaimTypes.NameIdentifier, user.Id, ClaimValueTypes.String));

            ListOfTasks list1 = new ListOfTasks()
            {
                Id = 1,
                Name = "My list 1",
                UserId=user.Id,
                Tasks = new List<Task>
                {
                    new Task()
                    {
                        Id=1,
                        Name="Task 1.1",
                        Created=DateTime.Now.AddDays(-2),
                        End=DateTime.Now,
                        IsDone=false
                    }
                }
            };

            ListOfTasks list2 = new ListOfTasks()
            {
                Id = 2,
                Name = "Today",
                UserId = user.Id,
                Tasks = new List<Task>
                {
                    new Task()
                    {
                        Id=2,
                        Name="Task 2.1",
                        Created=DateTime.Now.AddDays(-1),
                        End=DateTime.Now.AddDays(3),
                        IsDone=false
                    },
                    new Task()
                    {
                        Id=3,
                        Name="Task 2.2",
                        Created=DateTime.Now.AddMinutes(-45),
                        End=DateTime.Now.AddMinutes(45),
                        IsDone=true
                    },
                    new Task()
                    {
                        Id=4,
                        Name="Task 2.3",
                        Created=DateTime.Now.AddMinutes(-15),
                        End=DateTime.Now.AddMinutes(30),
                        IsDone=true
                    }
                }
            };

            ListOfTasks list3 = new ListOfTasks()
            {
                Id = 3,
                Name = "Home",
                UserId = user.Id,
                Tasks = new List<Task> {
                    new Task()
                    {
                        Id = 5,
                        Name = "Task 3.1",
                        Created = DateTime.Now,
                        End = DateTime.Now.AddDays(4),
                        IsDone = false
                    },
                    new Task()
                    {
                        Id = 6,
                        Name = "Task 3.2",
                        Created = DateTime.Now,
                        End = DateTime.Now.AddMinutes(57),
                        IsDone = false
                    }
                }
            };

            context.TaskLists.Add(list1);
            context.TaskLists.Add(list2);
            context.TaskLists.Add(list3);
        }

        public void Init(AuthContext context)
        {
            Seed(context);
        }
    }
}