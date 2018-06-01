using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using TaskList.Attributes;
using TaskList.Contracts;
using TaskList.Db;
using TaskList.Models;
using TaskList.Models.DTO.Task;
using TaskList.Services;

namespace TaskList.Controllers.api
{
    [AuthorizeByClaims]
    public class TaskController : ApiController
    {
        ITaskService _service;

        public TaskController(ITaskService service)
        {
            _service = service;
        }

        [HttpGet]
        public IHttpActionResult Get(int? id)
        {
            if (id == null) return BadRequest();
            var dto = _service.GetById(Convert.ToInt32(id));
            return Ok(dto);
        }

        [HttpGet]
        public IHttpActionResult GetToDoTasksByList(int? listId, TaskType type)
        {
            if (listId == null) return BadRequest();

            DateTime basicDate = new DateTime(1970, 1, 1);
            List<Task> tasks = new List<Task>();
            List<ByListIdTaskDTO> dtoTasks = new List<ByListIdTaskDTO>();

            if (type == TaskType.todo)
                tasks = _service.AllToDoByList(Convert.ToInt32(listId)).ToList();
            if (type == TaskType.done)
                tasks = _service.AllDoneByList(Convert.ToInt32(listId)).ToList();

            foreach (var task in tasks)
            {
                dtoTasks.Add(new ByListIdTaskDTO
                {
                    Id = task.Id,
                    Name = task.Name,
                    Created = System.Convert.ToInt64((TimeZoneInfo.ConvertTimeToUtc(task.Created) - basicDate).TotalMilliseconds),
                    End = System.Convert.ToInt64((TimeZoneInfo.ConvertTimeToUtc(task.End.Value) - basicDate).TotalMilliseconds)
                });
            }
            return Ok(dtoTasks);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]NewTaskDTO dto)
        {
            if (dto == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _service.Add(dto);
            return Ok("");
        }

        [HttpPut]
        public IHttpActionResult Put(EditTaskDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            _service.Edit(dto);
            return Ok("");
        }

        [HttpDelete]
        public IHttpActionResult Delete(int? id)
        {
            if (id == null) return BadRequest();
            _service.Remove(Convert.ToInt32(id));
            return Ok("");
        }

        [HttpPost]
        public IHttpActionResult Done(int? id)
        {
            if (id == null) return BadRequest();
            _service.Done(Convert.ToInt32(id));
            return Ok("");
        }
    }
}