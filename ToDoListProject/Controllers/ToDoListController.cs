using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToDoListProject.Logic;
using ToDoListProject.Models;

namespace ToDoListProject.Controllers
{
    [RoutePrefix("api/tasks")]
    public class ToDoListController : ApiController
    {
        TaskRepository repo = new TaskRepository();
        ToDoListEntities db = new ToDoListEntities();

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetAll()
        {
            return Ok(repo.GetAll());
        }
        [Route("add")]
        [HttpPost]
        public IHttpActionResult PostTask([FromBody]Task task)
        {
            var data = repo.Add(task);
            if (data == null)
                return BadRequest("İşlem gerçekleştirilemedi!");
            return Ok(data);
        }
        [HttpPut]
        [Route("update")]
        public IHttpActionResult Update([FromBody]Task task)
        {
            var data = repo.Update(task);
            if (data == null)
                return BadRequest("İşlem Gerçekleşmedi!");

            return Ok(data);
        }
        
        [HttpDelete]
        [Route("delete")]
        public IHttpActionResult Delete(IdsModel deleteTaskId)
        {
            var data = repo.Delete(deleteTaskId);
            if (data == null)
                return BadRequest("İşlem Gerçekleşmedi!");

            return Ok(data);
        }
    }
}
