using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskList.Contracts;

namespace TaskList.Provider
{
    public class HttpContextProvider : IHttpContextProvider
    {
        public HttpContextWrapper Http
        {
            get { return new HttpContextWrapper(HttpContext.Current); }
        }
    }
}