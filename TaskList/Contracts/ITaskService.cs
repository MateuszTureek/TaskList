using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaskList.Models;
using TaskList.Models.DTO.Task;

namespace TaskList.Contracts
{
    public interface ITaskService
    {
        void Add(NewTaskDTO dto);
        void Edit(EditTaskDTO dto);
        void Remove(int id);
        ByIdTaskDTO GetById(int id);
        IEnumerable<Task> AllToDoByList(int listId);
        IEnumerable<Task> AllDoneByList(int listId);
        void Done(int id);
    }
}
