using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskList.Models.DTO.Task
{
    public class NewTaskDTO
    {
        public int ListId { get; set; }
        public string Name { get; set; }
        public DateTime? End { get; set; }
    }
}