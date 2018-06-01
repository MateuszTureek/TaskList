using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using TaskList.Attributes;
using TaskList.Contracts;
using TaskList.Db;
using TaskList.Models;
using TaskList.Models.DTO.List;
using TaskList.Services;

namespace TaskList.Controllers.api
{
    [AuthorizeByClaims]
    public class TaskListController : ApiController
    {
        IListOfTasksService _service;

        public TaskListController(IListOfTasksService service)
        {
            _service = service;
        }

        [HttpGet]
        public IHttpActionResult Get(int? id)
        {
            if (id == null) return BadRequest();
            ListOfTasks list = _service.GetById(Convert.ToInt32(id));
            if (list == null) return NotFound();
            return Ok(list);
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            List<ListOfTasks> lists = _service.All().ToList();
            if (lists == null) return NotFound();
            return Ok(lists);
        }

        [HttpGet]
        public IHttpActionResult Get(string name)
        {
            List<ListOfTasks> lists = _service.AllBy(name).ToList();
            if (lists == null) return NotFound();
            return Ok(lists);
        }

        [HttpPost]
        public IHttpActionResult Post(string listName)
        {
            if (!ModelState.IsValid) return BadRequest();
            _service.Add(listName);
            return Ok("");
        }

        [HttpPut]
        public IHttpActionResult Put([FromBody]EditListDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest();

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
    }
}