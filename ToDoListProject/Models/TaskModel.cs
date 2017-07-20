using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoListProject.Models
{
    public class TaskModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime date { get; set; }
        public byte is_done { get; set; }
    }
}