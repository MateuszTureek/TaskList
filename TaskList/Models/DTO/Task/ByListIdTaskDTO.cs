using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskList.Models.DTO.Task
{
    public class ByListIdTaskDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Created { get; set; }
        public double End { get; set; }
    }
}