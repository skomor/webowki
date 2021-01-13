using System;

namespace BackDoAPIN.Entities
{
    public class ProductRental
    {
        public int Id { get; set; }
        
        public int ProductId { get; set; }
        public Product Product { get; set; }
        
        public int UserId { get; set; }
        public User User { get; set; }
        
        public DateTime StartTime { get; set; }
        
        public DateTime EndTime { get; set; }
        public DateTime RentalTime { get; set; }
       
    }
}