using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackDoAPIN.Dtos;
using BackDoAPIN.Entities;
using BackDoAPIN.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace BackDoAPIN.Services
{
    [Authorize]
    public class RentalService : IRentalService
    {
        private DataContext _context;
        
        public RentalService(DataContext context)
        {
            _context = context;
        }

        public Task<List<ProductRental>> GetAll()
        {
            return _context.ProductRental.ToListAsync();
        }

        public Task<List<ProductRental>> GetByUserId(int userId)
        {
            return _context.ProductRental.Where(rental => rental.UserId == userId).ToListAsync();
        }

        public async  Task<List<ProductRental>> CreateRange(List<RentalDto> rentalDto)
        {
            List<ProductRental> productRental = new List<ProductRental>();
            
            foreach (var dto in rentalDto){
                var product = new ProductRental();
                product.ProductId = dto.ProductId;
                product.UserId = dto.UserId;
                product.StartTime = dto.StartDate;
                product.EndTime = dto.EndDate;
                product.RentalTime = DateTime.Now;
                productRental.Add(product);
              

            }
            await _context.ProductRental.AddRangeAsync(productRental);
             await _context.SaveChangesAsync();
            return productRental;
        }

        public async Task<bool> Update(int id, ProductRental productRental)
        {
            if (id != productRental.Id){
                return false;
            }
            _context.Entry(productRental).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductRentalExists(id)){
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var productRental = await _context.ProductRental.FindAsync(id);
            if (productRental != null)
            {
                _context.ProductRental.Remove(productRental);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        
        private bool ProductRentalExists(int id)
        {
            return _context.ProductRental.Any(e => e.Id == id);
        }
    }
}