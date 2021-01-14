using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackDoAPIN.Entities;
using BackDoAPIN.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BackDoAPIN.Services
{
    public class ProductService : IProductService
    {
        private IProductRepo _productRepo;
        public ProductService(DataContext context, IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }

        public Task<List<Product>> GetAll()
        {
            return _productRepo.GetAll();
            
        }

        public Product GetById(int id)
        {
            return _productRepo.GetById(id);
        }

        public async Task<Product> Create(Product product)
        {
            return _productRepo.Create(product);

        }


        public async Task<bool> Update(int id, Product product)
        {
            if (id != product.Id){
                return false;
            }
            try
            {
                await  _productRepo.Update(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_productRepo.ProductExists(id)){
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
            var product = await _productRepo.FindById(id);
            if (product != null)
            {
                await _productRepo.Delete(product);
                return true;
            }
            return false;
        }
   
    }
    
}