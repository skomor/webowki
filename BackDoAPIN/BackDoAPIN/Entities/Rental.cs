using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace BackDoAPIN.Entities
{
    public class Rental
    {
        public int Id { get; set; }
        
        
        public int UserId { get; set; }
        public User User { get; set; }
      
        public DateTime DealTime { get; set; }
        
        public List<CartItem>  CartItems { get; set; }

    }
}