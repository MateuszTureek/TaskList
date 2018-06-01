[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(TaskList.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(TaskList.App_Start.NinjectWebCommon), "Stop")]

namespace TaskList.App_Start
{
    using System;
    using System.Data.Entity;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Threading;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using Ninject.Web.Common.WebHost;
    using TaskList.Contracts;
    using TaskList.Db;
    using TaskList.Provider;
    using TaskList.Services;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            try
            {
                kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
                kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
                RegisterServices(kernel);
                return kernel;
            }
            catch
            {
                kernel.Dispose();
                throw;
            }
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            AutomapperConfig.RegisterMappings(kernel);

            kernel.Bind<AuthContext>().ToSelf();

            kernel.Bind<IHttpContextProvider>().To<HttpContextProvider>().InRequestScope();

            kernel.Bind<UserService>().ToSelf().InRequestScope();
            kernel.Bind<IListOfTasksService>().To<ListOfTasksService>().InRequestScope();
            kernel.Bind<ITaskService>().To<TaskService>().InRequestScope();
        }
    }
}