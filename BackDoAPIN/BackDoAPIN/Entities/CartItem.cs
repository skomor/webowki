using System;

namespace BackDoAPIN.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        
        public int ProductId { get; set; }
        public Product Product { get; set; }
       
        public int RentalId { get; set; }
        public Rental Rental { get; set; }
        
        public DateTime StartTime { get; set; }
        
        public DateTime EndTime { get; set; }
  
    }
}