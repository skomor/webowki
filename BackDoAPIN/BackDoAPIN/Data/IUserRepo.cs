using System.Collections.Generic;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Helpers
{
    public interface IUserRepo
    {
        IEnumerable<User> GetAll();
        User GetById(int id);
        User GetByName(string username);
        User Create(User user);
        void Update(User user);
        void Delete(User user);
        bool CheckIfExistsByName(string username);
    }
}