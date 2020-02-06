namespace WebDirStat.Providers
{
    public interface IFilesystemStats
    {
        string GetFolderStatsJson(string path);
        string GetFileStatsJson(string path);
    }
}
