using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;
using TaskList.Contracts;
using TaskList.Db;
using TaskList.Models;
using TaskList.Models.DTO.List;

namespace TaskList.Services
{
    public class ListOfTasksService : IListOfTasksService
    {
        readonly AuthContext _dbContext;
        readonly ClaimsIdentity _claimsIdentity;

        public ListOfTasksService(AuthContext dbContext, IHttpContextProvider httpContext)
        {
            _dbContext = dbContext;
            _claimsIdentity = httpContext.Http.User.Identity as ClaimsIdentity;
        }

        public void Add(string listName)
        {
            var userId = _claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            ListOfTasks list = new ListOfTasks
            {
                Name = listName,
                UserId = userId
            };
            _dbContext.TaskLists.Add(list);
            _dbContext.SaveChanges();
        }

        public IEnumerable<ListOfTasks> All()
        {
            var userId = _claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _dbContext.TaskLists.Where(w => w.UserId == userId).OrderBy(o => o.Name).ToList();
        }

        public IEnumerable<ListOfTasks> AllBy(string name)
        {
            var userId = _claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _dbContext.TaskLists
                .Where(w => w.UserId == userId && w.Name.ToLower().Contains(name.ToLower()))
                .OrderBy(o => o.Name).ToList();
        }

        public void Remove(int id)
        {
            var userId = _claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            ListOfTasks list = _dbContext.TaskLists.Where(w => w.UserId == userId && w.Id == id).FirstOrDefault();
            if (list == null) throw new NullReferenceException();
            _dbContext.TaskLists.Remove(list);
            _dbContext.SaveChanges();
        }

        public void Edit(EditListDTO dto)
        {
            var userId = _claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;

            var list = _dbContext.TaskLists.Where(w => w.UserId == userId && w.Id == dto.Id).FirstOrDefault();
            if (list == null) throw new NullReferenceException();
            list.Name = dto.Name;
            _dbContext.Entry<ListOfTasks>(list).State = System.Data.Entity.EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public ListOfTasks GetById(int id)
        {
            var userId = _claimsIdentity.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _dbContext.TaskLists.Where(w => w.UserId == userId && w.Id == id).FirstOrDefault();
        }
    }
}