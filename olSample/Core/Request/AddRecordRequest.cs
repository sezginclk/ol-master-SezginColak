using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace olSample.Core.Request
{
    public class AddRecordRequest
    {
        public string CoordinateX { get; set; }
        public string CoordinateY { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
    }
}