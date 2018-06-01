using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskList.Models;
using TaskList.Models.DTO.Task;

namespace TaskList.Profile
{
    public class TaskListProfile : AutoMapper.Profile
    {
        public TaskListProfile()
        {
            CreateMap<NewTaskDTO, Task>()
                .ForMember(d => d.Created, o => o.UseValue(DateTime.Now))
                .ForMember(d => d.IsDone, o => o.UseValue(false))
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.List, o => o.Ignore());
            CreateMap<Task, ByIdTaskDTO>();
        }
    }
}