using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
        Task AddAsync(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        void Update(Vehicle vehicle);
    }
}