using System.Collections.Generic;
using System.Threading.Tasks;
using BackDoAPIN.Dtos;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Helpers
{
    public interface IRentalRepo
    {
        Task<List<ProductRental>> GetAll();
        Task<List<ProductRental>> GetByUserId(int id);
        ValueTask<ProductRental> FindById(int id);
        Task CreateRange(List<ProductRental> productRental);
        Task Update(ProductRental productRental);
        Task Delete(ProductRental productRental);
        bool ProductRentalExists(int id);

    }
}