namespace TaskList.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using TaskList.Db;

    internal sealed class Configuration : DbMigrationsConfiguration<TaskList.Db.AuthContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(TaskList.Db.AuthContext context)
        {
            DbSampleData data = new DbSampleData();
            data.Init(context);
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.
        }
    }
}
