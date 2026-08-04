using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalManagement.API.Data;
using RentalManagement.API.Models;


namespace RentalManagement.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class TenantsController : ControllerBase
    {


        private readonly ApplicationDbContext _context;



        public TenantsController(ApplicationDbContext context)
        {
            _context = context;
        }









        // GET: api/Tenants

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Tenant>>> GetTenants()
        {

            return await _context.Tenants.ToListAsync();

        }









        // GET: api/Tenants/1

        [HttpGet("{id}")]

        public async Task<ActionResult<Tenant>> GetTenant(int id)
        {

            var tenant = await _context.Tenants.FindAsync(id);



            if (tenant == null)
            {

                return NotFound();

            }



            return tenant;

        }









        // POST: api/Tenants

        [HttpPost]

        public async Task<ActionResult<Tenant>> CreateTenant(
            Tenant tenant
        )
        {

            try
            {


                // Kiểm tra CCCD trùng

                var exists = await _context.Tenants

                    .AnyAsync(t => t.CCCD == tenant.CCCD);



                if (exists)
                {

                    return BadRequest(new
                    {

                        message = "CCCD đã tồn tại"

                    });

                }






                _context.Tenants.Add(tenant);



                await _context.SaveChangesAsync();





                return CreatedAtAction(

                    nameof(GetTenant),

                    new
                    {
                        id = tenant.TenantID
                    },

                    tenant

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













        // PUT: api/Tenants/1

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateTenant(

            int id,

            Tenant tenant

        )
        {



            if (id != tenant.TenantID)
            {

                return BadRequest();

            }






            // Kiểm tra CCCD trùng với người khác

            var exists = await _context.Tenants

                .AnyAsync(

                    t =>

                    t.CCCD == tenant.CCCD

                    &&

                    t.TenantID != id

                );





            if (exists)
            {

                return BadRequest(new
                {

                    message = "CCCD đã được sử dụng"

                });

            }








            _context.Entry(tenant).State =

                EntityState.Modified;






            try
            {


                await _context.SaveChangesAsync();


            }

            catch (DbUpdateConcurrencyException)
            {


                if (!_context.Tenants.Any(
                    e => e.TenantID == id
                ))
                {

                    return NotFound();

                }


                throw;


            }





            return NoContent();

        }















        // DELETE: api/Tenants/1

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteTenant(int id)
        {


            var tenant = await _context.Tenants

                .FindAsync(id);





            if (tenant == null)
            {

                return NotFound();

            }







            // Kiểm tra người thuê có hợp đồng không

            var hasContract = await _context.Contracts

                .AnyAsync(

                    c => c.TenantID == id

                );







            if (hasContract)
            {

                return BadRequest(new
                {

                    message =

                    "Không thể xóa người thuê đang có hợp đồng"

                });


            }








            _context.Tenants.Remove(tenant);



            await _context.SaveChangesAsync();




            return NoContent();


        }


    }

}