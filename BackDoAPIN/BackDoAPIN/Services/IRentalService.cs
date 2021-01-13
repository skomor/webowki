using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackDoAPIN.Dtos;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Services
{
    public interface IRentalService
    {
        Task<List<ProductRental>> GetAll();
        Task<List<ProductRental>> GetByUserId(int id);
        Task<List<ProductRental>> CreateRange(List<RentalDto> rentalDto);
        Task<bool> Update(int id, ProductRental productRental);
        Task<bool> Delete(int id);
    }
}