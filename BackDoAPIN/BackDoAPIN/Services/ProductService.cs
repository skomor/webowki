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
        private DataContext _context;
        public ProductService(DataContext context)
        {
            _context = context;
        }

        public Task<List<Product>> GetAll()
        {
            return _context.Product.ToListAsync();
            
        }

        public Product GetById(int id)
        {
            return _context.Product.Find(id);
        }

        public async Task<Product> Create(Product product)
        {
            await _context.Product.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }


        public async Task<bool> Update(int id, Product product)
        {
            if (id != product.Id){
                return false;
            }
            _context.Entry(product).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id)){
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
            var product = await _context.Product.FindAsync(id);
            if (product != null)
            {
                _context.Product.Remove(product);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
    
}