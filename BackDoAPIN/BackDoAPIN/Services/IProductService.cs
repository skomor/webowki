using System.Collections.Generic;
using System.Threading.Tasks;
using BackDoAPIN.Dtos;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAll();
        Product GetById(int id);
        Task<Product> Create(Product product);
        Task<bool> Update(int id, Product product);
        Task<bool> Delete(int id);
    }
}