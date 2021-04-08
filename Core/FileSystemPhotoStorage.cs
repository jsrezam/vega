using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using vega.Core.Models;
using vega.Extensions;

namespace vega.Core
{
    public class FileSystemPhotoStorage : IPhotoStorage
    {
        private readonly IWebHostEnvironment host;
        private readonly IOptionsSnapshot<PhotoSettings> options;
        private readonly PhotoSettings photoSettings;
        public FileSystemPhotoStorage(IWebHostEnvironment host, IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoSettings = options.Value;
            this.options = options;
            this.host = host;
        }
        public async Task<string> StorePhoto(IFormFile file)
        {
            var uploadsFolderPath = Path.Combine(host.WebRootPath, photoSettings.LocalFolder);

            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = file.FileName.ChangeFileName();
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/{photoSettings.LocalFolder}/{fileName}";
        }
    }
}