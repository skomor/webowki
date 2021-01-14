using System;
using System.Collections.Generic;
using System.Linq;
using BackDoAPIN.Entities;

namespace BackDoAPIN.Helpers
{
    public class UserRepo : IUserRepo
    {
        private DataContext _context;

        public UserRepo(DataContext context)
        {
            _context = context;
        }
        
        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public User GetByName(string username)
        {
            return _context.Users.SingleOrDefault(x => x.Username == username);
        }

        public User Create(User user)
        {
            
            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
            
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();

        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
            
        }

        public bool CheckIfExistsByName(string username)
        {
            return _context.Users.Any(x => x.Username == username);
        }
    }
}