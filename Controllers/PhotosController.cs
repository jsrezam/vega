using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IWebHostEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IMapper mapper;
        private readonly IOptionsSnapshot<PhotoSettings> options;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;

        public PhotosController(IWebHostEnvironment host
        , IVehicleRepository repository
        , IMapper mapper
        , IOptionsSnapshot<PhotoSettings> options
        , IPhotoRepository photoRepository
        , IPhotoService photoService)
        {
            this.photoSettings = options.Value;
            this.mapper = mapper;
            this.options = options;
            this.repository = repository;
            this.host = host;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);
            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file.");
            if (file.Length == 0) return BadRequest("Empty file.");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded.");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type.");

            var photo = await photoService.UploadPhoto(vehicle, file);

            return Ok(mapper.Map<Photo, PhotoResource>(photo));

        }
    }
}