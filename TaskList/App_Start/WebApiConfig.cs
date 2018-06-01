using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace TaskList
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(
                new System.Net.Http.Headers.MediaTypeHeaderValue("text/html"));
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DoneTask",
                routeTemplate: "api/task/done/{id}",
                defaults: new { controller = "Task" }
            );

            config.Routes.MapHttpRoute(
                name: "EditTask",
                routeTemplate: "api/task/edit",
                defaults: new { controller = "Task" }
            );

            config.Routes.MapHttpRoute(
                name: "TasksToDoByListName",
                routeTemplate: "api/task/byList/{listId}/{type}",
                defaults: new { controller = "Task" }
            );
            
            config.Routes.MapHttpRoute(
                name: "AddList",
                routeTemplate: "api/list/add/{listName}",
                defaults: new { controller = "TaskList" }
            );

            config.Routes.MapHttpRoute(
                name: "EditList",
                routeTemplate: "api/list/edit",
                defaults: new { controller = "TaskList" }
            );

            config.Routes.MapHttpRoute(
                name: "ListOfTaskByName",
                routeTemplate: "api/list/name/{name}",
                defaults: new { controller = "TaskList" }
            );

            config.Routes.MapHttpRoute(
                name: "ListOfTask",
                routeTemplate: "api/list/{id}",
                defaults: new { controller = "TaskList", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}