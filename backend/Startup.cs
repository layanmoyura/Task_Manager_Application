using backend.Context;
using backend.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Linq;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TaskContext>(opt =>
                                        opt.UseInMemoryDatabase("TaskList"));
            services.AddControllers();

            services.AddCors(options => options.AddDefaultPolicy(

                builder => builder.WithOrigins("http://localhost:4201").AllowAnyMethod().AllowAnyHeader()));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, TaskContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "backend v1"));
            }

            // Seed the database with some initial data
            if (!context.Tasks.Any())
            {
                var task1 = new TaskModel { Id = 1, Title = "Task 1", Description = "First task", DueDate = DateTime.Now.AddDays(1) };
                var task2 = new TaskModel { Id = 2, Title = "Task 2", Description = "Second task", DueDate = DateTime.Now.AddDays(2) };

                context.Tasks.Add(task1);
                context.Tasks.Add(task2);
                context.SaveChanges();

            }
            app.UseCors();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
