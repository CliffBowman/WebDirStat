using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
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
    }

    public class FolderStatsRequest
    {
        public string Path { get; set; }
    }
}
