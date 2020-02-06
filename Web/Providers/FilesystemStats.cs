using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WebDirStat.Providers
{
    public class FilesystemStats : IFilesystemStats
    {
        public string GetFileStatsJson(string path)
        {
            var rootFolderTree = BuildFileTree(path);

            return JsonConvert.SerializeObject(rootFolderTree);
        }

        public string GetFolderStatsJson(string path)
        {
            var rootFolderTree = BuildFolderTree(path);

            return JsonConvert.SerializeObject(rootFolderTree);
        }

        private FilesystemStatNode BuildFileTree(string path)
        {
            var node = new FilesystemStatNode(path);
            var dirs = SafeGetDirectories(path);
            var files = SafeGetFiles(path);

            foreach (var file in files)
            {
                var newNode = new FilesystemStatNode(file.FullName);
                newNode.Size = file.Length;
                node.AddNode(newNode);
            }

            foreach (var dir in dirs)
            {
                var newDirNode = BuildFileTree(dir.FullName);
                node.AddNode(newDirNode);
            }

            return node;
        }

        private FilesystemStatNode BuildFolderTree(string path)
        {
            var node = new FilesystemStatNode(path);
            var dirs = SafeGetDirectories(path);

            if (dirs.Count() == 0)
                node.Size = SafeGetFiles(path).Sum(f => f.Length);

            foreach (var dir in dirs)
            {
                var newNode = BuildFolderTree(dir.FullName);
                node.AddNode(newNode);
            }

            return node;
        }

        private IEnumerable<DirectoryInfo> SafeGetDirectories(string path)
        {
            try
            {
                return new DirectoryInfo(path)
                    .EnumerateDirectories();
            }
            catch (UnauthorizedAccessException)
            {
                return new List<DirectoryInfo>();
            }
        }

        private IEnumerable<FileInfo> SafeGetFiles(string path)
        {
            try
            {
                return new DirectoryInfo(path)
                    .EnumerateFiles();
            }
            catch (UnauthorizedAccessException)
            {
                return new List<FileInfo>();
            }
        }
    }
}
