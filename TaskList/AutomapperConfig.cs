using AutoMapper;
using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskList.Profile;

namespace TaskList
{
    public class AutomapperConfig
    {
        public static void RegisterMappings(IKernel kernel)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TaskListProfile>();
            });

            var mapper = config.CreateMapper();

            kernel.Bind<IMapper>().ToConstant(mapper);
        }
    }
}