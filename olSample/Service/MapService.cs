using olSample.Core.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace olSample.Service
{
    public class MapService
    {
        public int AddRecord(AddRecordRequest request)
        {
            var response = 1;

            try
            {
                if (Directory.Exists(@"C:\JsonIslemlerim\"))
                {
                    // ilgili klasor var ise herhangi bir işlem yapmıyoruz. 
                }
                else
                {
                    Directory.CreateDirectory(@"C:\JsonIslemlerim\");
                }

                string JsonOkunanData = File.ReadAllText(@"C:\JsonIslemlerim\MapRecord.json");
                List<AddRecordRequest> okunanJson = JsonConvert.DeserializeObject<List<AddRecordRequest>>(JsonOkunanData);

                if (okunanJson == null) okunanJson = new List<AddRecordRequest>();

                okunanJson.Add(request);


                string JsonRecord = JsonConvert.SerializeObject(okunanJson);
                File.WriteAllText(@"C:\JsonIslemlerim\MapRecord.json", JsonRecord);
                return response;
            }
            catch (Exception)
            {

                response = 0;
                return response;
            }
        }

        public List<AddRecordRequest> GetMapRecord()
        {
            List<AddRecordRequest> okunanJson = new List<AddRecordRequest>();


            try
            {
                string JsonOkunanData = File.ReadAllText(@"C:\JsonIslemlerim\MapRecord.json");

                List<AddRecordRequest> willAdd = JsonConvert.DeserializeObject<List<AddRecordRequest>>(JsonOkunanData);
                if (willAdd != null)
                {
                    return willAdd;
                }
                else
                {
                    return okunanJson;
                }


            }
            catch (Exception ex)
            {

                return okunanJson;
            }

        }
    }
}