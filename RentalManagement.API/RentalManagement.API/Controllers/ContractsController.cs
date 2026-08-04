using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalManagement.API.Data;
using RentalManagement.API.Models;

namespace RentalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public ContractsController(ApplicationDbContext context)
        {
            _context = context;
        }





        // GET: api/Contracts
        // Lấy danh sách hợp đồng + thông tin phòng + người thuê
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetContracts()
        {

            var contracts = await _context.Contracts

                .Select(c => new
                {

                    c.ContractID,


                    c.RoomID,


                    RoomCode = _context.Rooms

                        .Where(r => r.RoomID == c.RoomID)

                        .Select(r => r.RoomCode)

                        .FirstOrDefault(),



                    RoomName = _context.Rooms

                        .Where(r => r.RoomID == c.RoomID)

                        .Select(r => r.RoomName)

                        .FirstOrDefault(),




                    c.TenantID,



                    TenantName = _context.Tenants

                        .Where(t => t.TenantID == c.TenantID)

                        .Select(t => t.FullName)

                        .FirstOrDefault(),




                    c.StartDate,


                    c.EndDate,


                    c.Deposit

                })

                .ToListAsync();



            return contracts;

        }









        // GET: api/Contracts/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Contract>> GetContract(int id)
        {

            var contract = await _context.Contracts

                .FindAsync(id);



            if (contract == null)
            {
                return NotFound();
            }



            return contract;

        }









        // POST: api/Contracts
        [HttpPost]
        public async Task<ActionResult<Contract>> CreateContract(
            Contract contract
        )
        {

            try
            {


                // Kiểm tra phòng tồn tại

                var room = await _context.Rooms

                    .FindAsync(contract.RoomID);



                if (room == null)
                {

                    return BadRequest(new
                    {
                        message = "Phòng không tồn tại."
                    });

                }







                // Kiểm tra phòng đang thuê

                if (room.Status == "Đang thuê")
                {

                    return BadRequest(new
                    {
                        message = "Phòng này đang được thuê."
                    });

                }







                // Thêm hợp đồng

                _context.Contracts.Add(contract);





                // Đổi trạng thái phòng

                room.Status = "Đang thuê";





                await _context.SaveChangesAsync();







                return CreatedAtAction(

                    nameof(GetContract),

                    new
                    {
                        id = contract.ContractID
                    },

                    contract

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












        // PUT: api/Contracts/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContract(
            int id,
            Contract contract
        )
        {


            var oldContract = await _context.Contracts

                .FindAsync(id);




            if (oldContract == null)
            {

                return NotFound();

            }






            oldContract.RoomID = contract.RoomID;


            oldContract.TenantID = contract.TenantID;


            oldContract.StartDate = contract.StartDate;


            oldContract.EndDate = contract.EndDate;


            oldContract.Deposit = contract.Deposit;






            await _context.SaveChangesAsync();




            return NoContent();


        }












        // DELETE: api/Contracts/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {


            var contract = await _context.Contracts

                .FindAsync(id);




            if (contract == null)
            {

                return NotFound();

            }







            // Lấy phòng của hợp đồng

            var room = await _context.Rooms

                .FindAsync(contract.RoomID);






            if (room != null)
            {

                room.Status = "Còn trống";

            }








            // Xóa hợp đồng

            _context.Contracts.Remove(contract);






            await _context.SaveChangesAsync();






            return NoContent();


        }



    }
}