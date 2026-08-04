using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalManagement.API.Data;
using RentalManagement.API.Models;

namespace RentalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ServicesController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public ServicesController(ApplicationDbContext context)
        {
            _context = context;
        }





        // GET: api/Services

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            return await _context.Services.ToListAsync();
        }







        // GET: api/Services/1

        [HttpGet("{id}")]

        public async Task<ActionResult<Service>> GetService(int id)
        {

            var service = await _context.Services.FindAsync(id);


            if (service == null)
            {
                return NotFound();
            }


            return service;

        }









        // POST: api/Services

        [HttpPost]

        public async Task<ActionResult<Service>> CreateService(Service service)
        {

            try
            {

                _context.Services.Add(service);


                await _context.SaveChangesAsync();



                return CreatedAtAction(

                    nameof(GetService),

                    new
                    {
                        id = service.ServiceID
                    },

                    service

                );

            }

            catch (Exception ex)
            {

                return BadRequest(new
                {
                    message = ex.Message,

                    detail = ex.InnerException?.Message
                });

            }

        }









        // PUT: api/Services/1

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateService(

            int id,

            Service service

        )
        {

            if (id != service.ServiceID)
            {
                return BadRequest();
            }



            _context.Entry(service).State =
                EntityState.Modified;



            try
            {

                await _context.SaveChangesAsync();

            }

            catch (DbUpdateConcurrencyException)
            {

                if (!ServiceExists(id))
                {
                    return NotFound();
                }


                throw;

            }



            return NoContent();

        }









        // DELETE: api/Services/1

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteService(int id)
        {

            var service = await _context.Services.FindAsync(id);



            if (service == null)
            {
                return NotFound();
            }



            _context.Services.Remove(service);



            await _context.SaveChangesAsync();



            return NoContent();

        }







        private bool ServiceExists(int id)
        {
            return _context.Services.Any(
                e => e.ServiceID == id
            );
        }


    }
}