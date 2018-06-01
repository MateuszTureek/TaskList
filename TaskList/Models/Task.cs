using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskList.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime? End { get; set; }
        public bool IsDone { get; set; }

        // navigation property
        public ListOfTasks List { get; set; }
    }
}