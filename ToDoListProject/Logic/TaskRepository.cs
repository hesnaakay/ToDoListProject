using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ToDoListProject.Models;

namespace ToDoListProject.Logic
{
    public class TaskRepository
    {
        ToDoListEntities db = new ToDoListEntities();
 
        public List<Task> GetAll()
        {
            return db.Tasks.ToList();
        }

        public Task Add(Task task)
        {
            try
            {
                if (task == null)
                    throw new Exception("Eklenecek görev null olamaz!");
                 if(task.date == null)
                     task.date = DateTime.Now;
                db.Tasks.Add(task);
                db.SaveChanges();
                return task;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<Task> Update(Task task)
        {
            if (task == null)
                throw new Exception("Null olamaz!");

            db.Entry(task).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return GetAll();
        }

        public List<Task> Delete(IdsModel deleteTaskId)
        {
            int i = 1;
            while (db.Tasks.Where(x => x.is_done == i).Count() != 0)
            {
                Task t = db.Tasks.Where(x => x.is_done == i).FirstOrDefault();
                db.Tasks.Remove(t);
                db.SaveChanges();
            }

            return GetAll();
        }
    }
}