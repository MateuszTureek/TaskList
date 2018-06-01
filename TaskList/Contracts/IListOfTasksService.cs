using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TaskList.Models;
using TaskList.Models.DTO.List;

namespace TaskList.Contracts
{
    public interface IListOfTasksService
    {
        void Add(string listName);
        void Edit(EditListDTO dto);
        void Remove(int id);
        ListOfTasks GetById(int id);
        IEnumerable<ListOfTasks> AllBy(string name);
        IEnumerable<ListOfTasks> All();
    }
}
