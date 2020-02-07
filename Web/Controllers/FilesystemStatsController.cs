using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WebDirStat.Providers;

namespace WebDirStat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilesystemStatsController : ControllerBase
    {
        private readonly ILogger<FilesystemStatsController> _logger;
        private readonly IFilesystemStats _filesystemStats;
        private readonly IMemoryCache _cache;

        public FilesystemStatsController(ILogger<FilesystemStatsController> logger, IFilesystemStats filesystemStats, IMemoryCache cache)
        {
            _logger = logger;
            _filesystemStats = filesystemStats;
            _cache = cache;
        }

        [HttpPost]
        [Route("GetFolderStats")]
        public string GetFolderStats(FolderStatsRequest request)
        {
            return _cache.GetOrCreate($"{nameof(FilesystemStatsController)}_{nameof(GetFolderStats)}_{request.Path}", (ce) => _filesystemStats.GetFolderStatsJson(request.Path));
        }

        [HttpPost]
        [Route("GetFileStats")]
        public string GetFileStats(FolderStatsRequest request)
        {
            return _cache.GetOrCreate($"{nameof(FilesystemStatsController)}_{nameof(GetFileStats)}_{request.Path}", (ce) => _filesystemStats.GetFileStatsJson(request.Path));
        }

        [HttpGet]
        [Route("GetDrives")]
        public IEnumerable<DriveInfoDesc> GetDrives()
        {
            return DriveInfo.GetDrives()
                .Where(di => di.IsReady)
                .Select(di => new DriveInfoDesc
                {
                    Name = di.Name,
                    VolumeLabel = di.VolumeLabel,
                })
                .AsEnumerable();
        }
    }

    public class FolderStatsRequest
    {
        public string Path { get; set; }
    }

    public class DriveInfoDesc
    {
        public string Name { get; set; }
        public string VolumeLabel { get; set; }
    }
}
