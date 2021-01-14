using System.Collections.Generic;
using System.Threading.Tasks;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Helpers
{
    public interface IProductRepo
    {
        Task<List<Product>> GetAll();
        Product GetById(int id);
        ValueTask<Product> FindById(int id);
        Task Update(Product product);
        Product Create(Product product);

        Task Delete(Product product);
        bool ProductExists(int id);
    }
}