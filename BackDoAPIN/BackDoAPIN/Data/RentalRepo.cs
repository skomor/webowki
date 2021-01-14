using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackDoAPIN.Dtos;
using BackDoAPIN.Entities;
using Microsoft.EntityFrameworkCore;

namespace BackDoAPIN.Helpers
{
    public class RentalRepo : IRentalRepo
    {
        private DataContext _context;

        public RentalRepo(DataContext context)
        {
            _context = context;
        }

        public Task<List<ProductRental>> GetAll()
        {
            return _context.ProductRental.ToListAsync();
        }

        public Task<List<ProductRental>> GetByUserId(int id)
        {
            return _context.ProductRental.Where(rental => rental.UserId == id).ToListAsync();
        }

        public ValueTask<ProductRental> FindById(int id)
        {
         return   _context.ProductRental.FindAsync(id);
            
        }

        public async Task CreateRange(List<ProductRental> productRental)
        {
            await _context.ProductRental.AddRangeAsync(productRental);
            await _context.SaveChangesAsync();
        }

        public async Task Update( ProductRental productRental)
        {
            _context.Entry(productRental).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public async Task Delete(ProductRental productRental)
        {
            _context.ProductRental.Remove(productRental);
           await _context.SaveChangesAsync();
        }

        public bool ProductRentalExists(int id)
        {
            return _context.ProductRental.Any(e => e.Id == id);
        }
    }
}