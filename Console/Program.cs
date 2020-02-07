using System;
using System.IO;
using WebDirStat.Providers;

namespace Console
{
    class Program
    {
        static void Main(string[] args)
        {
            var fss = new FilesystemStats();
            //var result = fss.BuildFileTree(@"C:\\Temp");

            DriveInfo.GetDrives();
        }
    }
}
