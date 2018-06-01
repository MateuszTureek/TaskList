using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskList.Models.DTO.Task
{
    public class ByIdTaskDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double CreatedMiliseconds { get; set; }
        public double EndMiliseconds { get; set; }
    }
}