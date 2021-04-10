using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using vega.Extensions;

namespace vega.Core
{
    public class AzurePhotoStorage : IPhotoStorage
    {
        private readonly string configuration;
        private const string CONTAINER = "vegaphotos";
        public AzurePhotoStorage(IConfiguration configuration)
        {
            this.configuration = configuration["KeyAzureStorage"];
        }
        public async Task<string> StorePhoto(IFormFile file)
        {
            var fileName = file.FileName.ChangeFileName();
            var containerClient = new BlobContainerClient(configuration, CONTAINER);
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(file.OpenReadStream());
            return blobClient.Uri.ToString();
        }
    }
}