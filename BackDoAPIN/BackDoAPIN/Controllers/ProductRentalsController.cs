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
using BackDoAPIN.Services;

namespace BackDoAPIN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductRentalsController : ControllerBase
    {
        private IRentalService _rentalService;


        public ProductRentalsController(DataContext context,IRentalService rentalService)
        {
            _rentalService = rentalService;

        }

        // GET: api/ProductRentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductRental>>> GetProductRental()
        {
            return  await _rentalService.GetAll();
        }

        // GET: api/ProductRentals/5
        [HttpGet("{userId}")]
        public  Task<List<ProductRental>> GetProductRental(int userId)
        {
            var productRental =  _rentalService.GetByUserId(userId);
            

            return productRental;
        }

        // PUT: api/ProductRentals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductRental(int id, ProductRental productRental)
        {
            bool outcome = await _rentalService.Update(id, productRental);
            if (!outcome)
            {
                return BadRequest();
            }
            return NoContent();
        }

        // POST: api/ProductRentals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductRental>> PostProductRental(List<RentalDto> rentalDto)
        {

            var productRental = await _rentalService.CreateRange(rentalDto);
            
     
            return CreatedAtAction("GetProductRental",  productRental);
        }

        // DELETE: api/ProductRentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductRental(int id)
        {
            var outcome = await _rentalService.Delete(id);
            if (!outcome) 
            {
                return NotFound();
            }
            return NoContent();
        }

   
    }
    
    
}
