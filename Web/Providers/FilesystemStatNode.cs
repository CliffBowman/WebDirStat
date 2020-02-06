using Newtonsoft.Json;
using System.Collections.Generic;

namespace WebDirStat.Providers
{
    public class FilesystemStatNode
    {
        [JsonProperty(PropertyName = "name")]
        public string Path { get; set; }

        [JsonProperty(PropertyName = "value", NullValueHandling = NullValueHandling.Ignore)]
        public long? Size { get; set; }

        [JsonProperty(PropertyName = "children", NullValueHandling = NullValueHandling.Ignore)]
        public List<FilesystemStatNode> Nodes { get; set; }

        public FilesystemStatNode(string path)
        {
            Path = path;
        }

        public void AddNode(FilesystemStatNode newNode)
        {
            if (Nodes == null)
                Nodes = new List<FilesystemStatNode>();

            Nodes.Add(newNode);
        }

#if DEBUG
        public override string ToString() => Path;
#endif
    }
}
