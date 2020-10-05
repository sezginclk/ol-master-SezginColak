using olSample.Core.Request;
using olSample.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace olSample.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        MapService service = new MapService();
        public JsonResult AddRecord(AddRecordRequest request)
        {
            var response = service.AddRecord(request);
            return Json(response);
        }


        [HttpPost]
        public JsonResult GetMapRecord()
        {
            var response = service.GetMapRecord();
            return Json(response);
        }

    }
}