using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskList.Models.DTO.Task
{
    public class EditTaskDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? End { get; set; }
    }
}