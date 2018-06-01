using AutoMapper;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskList.Contracts;
using TaskList.Db;
using TaskList.Models;
using TaskList.Models.DTO.Task;

namespace TaskList.Services
{
    public class TaskService : ITaskService
    {
        readonly AuthContext _c;
        
        public TaskService(AuthContext context)
        {
            _c = context;
        }

        [Inject]
        IMapper Mapper { get; set; }

        public void Add(NewTaskDTO dto)
        {
            Task task = Mapper.Map<NewTaskDTO, Task>(dto);
            task.List = _c.TaskLists.Find(dto.ListId);

            _c.Tasks.Add(task);
            _c.SaveChanges();
        }

        public IEnumerable<Task> AllDoneByList(int listId)
        {
            return _c.Tasks
                    .Where(w => w.List.Id == listId && w.IsDone == true)
                    .OrderBy(o => o.Created);
        }

        public IEnumerable<Task> AllToDoByList(int listId)
        {
            return _c.Tasks
                    .Where(w => w.List.Id == listId && w.IsDone == false)
                    .OrderBy(o => o.Created);
        }

        public void Done(int id)
        {
            var task = _c.Tasks.Find(id);
            if (task == null) throw new NullReferenceException();
            task.IsDone = true;
            _c.SaveChanges();
        }

        public void Edit(EditTaskDTO dto)
        {
            Task task = _c.Tasks.Find(dto.Id);
            if (task == null) throw new NullReferenceException();

            task.Name = dto.Name;
            task.End = dto.End;

            _c.Entry<Task>(task).State = System.Data.Entity.EntityState.Modified;
            _c.SaveChanges();

        }

        public ByIdTaskDTO GetById(int id)
        {
            Task task = _c.Tasks.Find(id);
            if (task == null) throw new NullReferenceException();

            var basicDate = new DateTime(1970, 1, 1);

            ByIdTaskDTO dto = Mapper.Map<Task, ByIdTaskDTO>(task);
            dto.CreatedMiliseconds = System.Convert.ToInt64((task.Created - basicDate).TotalMilliseconds);
            dto.EndMiliseconds = System.Convert.ToInt64((task.End.Value - basicDate).TotalMilliseconds);

            return dto;
        }

        public void Remove(int id)
        {
            Task task = _c.Tasks.Find(id);
            if (task == null) throw new NullReferenceException();
            _c.Tasks.Remove(task);
            _c.SaveChanges();
        }
    }
}