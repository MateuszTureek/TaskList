using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskList.Models
{
    public class ListOfTasks
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }

        public IList<Task> Tasks { get; set; }
    }
}