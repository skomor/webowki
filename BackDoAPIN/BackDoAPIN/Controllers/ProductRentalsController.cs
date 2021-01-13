using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackDoAPIN.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackDoAPIN.Entities;
using BackDoAPIN.Helpers;

namespace BackDoAPIN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductRentalsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductRentalsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/ProductRentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductRental>>> GetProductRental()
        {
            return await _context.ProductRental.ToListAsync();
        }

        // GET: api/ProductRentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductRental>> GetProductRental(int id)
        {
            var productRental = await _context.ProductRental.FindAsync(id);

            if (productRental == null)
            {
                return NotFound();
            }

            return productRental;
        }

        // PUT: api/ProductRentals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductRental(int id, ProductRental productRental)
        {
            if (id != productRental.Id)
            {
                return BadRequest();
            }

            _context.Entry(productRental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductRentalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProductRentals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductRental>> PostProductRental(List<RentalDto> rentalDto)
        {
            
            List<ProductRental> productRental = new List<ProductRental>();
            
            foreach (var dto in rentalDto){
                var product = new ProductRental();
                product.ProductId = dto.ProductId;
                product.UserId = dto.UserId;
                product.StartTime = dto.StartDate;
                product.EndTime = dto.EndDate;
                product.RentalTime = new DateTime();
                productRental.Add(product);
              

            }
            _context.ProductRental.AddRange(productRental);
            await _context.SaveChangesAsync();
           
            
     
            return CreatedAtAction("GetProductRental",  productRental);
        }

        // DELETE: api/ProductRentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductRental(int id)
        {
            var productRental = await _context.ProductRental.FindAsync(id);
            if (productRental == null)
            {
                return NotFound();
            }

            _context.ProductRental.Remove(productRental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductRentalExists(int id)
        {
            return _context.ProductRental.Any(e => e.Id == id);
        }
    }
    
    
}
