using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
        {
            try
            {
                return await _context.Tasks.ToListAsync();
            }
            catch (Exception ex)
            {
      
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }

    
        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(id);

                if (task == null)
                {
                    return NotFound(new { message = "Task with id not found" });
                }

                return Ok(task);
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }



        // POST: api/Tasks
        [HttpPost]
        public async Task<IActionResult> PostTask(TaskModel task)
        {
            try
            {
                _context.Tasks.Add(task);
                await _context.SaveChangesAsync();

                return Ok(task);
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }


        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, TaskModel task)
        {
            if (id != task.Id)
            {
                return BadRequest(new {message = "Task ID mismatch" });
            }

            try
            {
                _context.Entry(task).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(task);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound(new {message = "Task with id not found" });
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }



        // DELETE: api/Tasks/5

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var task = await _context.Tasks.FindAsync(id);
                if (task == null)
                {
                    return NotFound(new { message = "Task with id not found" });
                }

                _context.Tasks.Remove(task);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Task with id deleted successfully" });
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = $"Internal server error: {ex.Message}" });
            }
        }




        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
