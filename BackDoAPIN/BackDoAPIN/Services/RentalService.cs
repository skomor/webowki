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
        private IRentalRepo _rentalRepo;

        public RentalService(IRentalRepo rentalRepo)
        {
            _rentalRepo = rentalRepo;
        }

        public Task<List<ProductRental>> GetAll()
        {
            return _rentalRepo.GetAll();
        }

        public Task<List<ProductRental>> GetByUserId(int userId)
        {
            return _rentalRepo.GetByUserId(userId);
        }

        public async Task<List<ProductRental>> CreateRange(List<RentalDto> rentalDto)
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

            await _rentalRepo.CreateRange(productRental);
            return productRental;
        }

        public async Task<bool> Update(int id, ProductRental productRental)
        {
            if (id != productRental.Id){
                return false;
            }

            try{
              await  _rentalRepo.Update(productRental);
            }
            catch (DbUpdateConcurrencyException){
                if (!_rentalRepo.ProductRentalExists(id)){
                    return false;
                }
                else{
                    throw;
                }
            }

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var productRental = await _rentalRepo.FindById(id);
            if (productRental != null){
                await _rentalRepo.Delete(productRental);
                return true;
            }

            return false;
        }

      
    }
}