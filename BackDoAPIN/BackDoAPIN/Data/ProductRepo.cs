using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackDoAPIN.Entities;
using BackDoAPIN.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BackDoAPIN.Helpers
{
    public class ProductRepo : IProductRepo
    {
        private DataContext _context;

        public ProductRepo(DataContext context)
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

        public ValueTask<Product> FindById(int id)
        {
            return   _context.Product.FindAsync(id);
            
        }

      

        public async Task Update( Product product)
        {
            _context.Entry(product).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }

        public Product Create(Product product)
        {
            _context.Product.Add(product);
            _context.SaveChanges();

            return product;
        }

        public async Task Delete(Product product)
        {
            _context.Product.Remove(product);
            await _context.SaveChangesAsync();
        }

        public bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}