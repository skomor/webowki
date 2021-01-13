using System;

namespace BackDoAPIN.Dtos
{
    public class RentalDto
    {
        public int ProductId { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDate { get; set; }
      
        public int UserId { get; set; }
    }
}