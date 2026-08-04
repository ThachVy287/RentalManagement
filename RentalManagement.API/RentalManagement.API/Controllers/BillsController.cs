using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalManagement.API.Data;
using RentalManagement.API.Models;


namespace RentalManagement.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public BillsController(ApplicationDbContext context)
        {
            _context = context;
        }









        // GET: api/Bills
        // Lấy danh sách hóa đơn + thông tin phòng + người thuê
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBills()
        {


            var bills = await _context.Bills

                .Select(b => new
                {

                    b.BillID,


                    b.ContractID,


                    b.BillMonth,


                    b.BillYear,



                    b.ElectricOld,


                    b.ElectricNew,


                    ElectricUsed = b.ElectricNew - b.ElectricOld,



                    b.WaterOld,


                    b.WaterNew,


                    WaterUsed = b.WaterNew - b.WaterOld,



                    b.TotalAmount,


                    b.Status,




                    RoomCode = _context.Contracts

                        .Where(c => c.ContractID == b.ContractID)

                        .Join(

                            _context.Rooms,

                            c => c.RoomID,

                            r => r.RoomID,

                            (c, r) => r.RoomCode

                        )

                        .FirstOrDefault(),






                    RoomName = _context.Contracts

                        .Where(c => c.ContractID == b.ContractID)

                        .Join(

                            _context.Rooms,

                            c => c.RoomID,

                            r => r.RoomID,

                            (c, r) => r.RoomName

                        )

                        .FirstOrDefault(),





                    TenantName = _context.Contracts

                        .Where(c => c.ContractID == b.ContractID)

                        .Join(

                            _context.Tenants,

                            c => c.TenantID,

                            t => t.TenantID,

                            (c, t) => t.FullName

                        )

                        .FirstOrDefault()



                })

                .ToListAsync();




            return bills;


        }









        // GET: api/Bills/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {


            var bill = await _context.Bills

                .FindAsync(id);



            if (bill == null)
            {
                return NotFound();
            }



            return bill;


        }












        // POST: api/Bills
        [HttpPost]
        public async Task<ActionResult<Bill>> CreateBill(Bill bill)
        {


            try
            {


                // Tính số điện nước sử dụng

                int electricUsed =
                    bill.ElectricNew - bill.ElectricOld;


                int waterUsed =
                    bill.WaterNew - bill.WaterOld;



                // Ví dụ giá:
                // Điện 3500/kWh
                // Nước 20000/m3


                decimal electricMoney =
                    electricUsed * 3500;



                decimal waterMoney =
                    waterUsed * 20000;



                bill.TotalAmount =
                    electricMoney + waterMoney;



                _context.Bills.Add(bill);



                await _context.SaveChangesAsync();





                return CreatedAtAction(

                    nameof(GetBill),

                    new
                    {
                        id = bill.BillID
                    },

                    bill

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













        // PUT: api/Bills/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBill(
            int id,
            Bill bill
        )
        {



            var oldBill = await _context.Bills

                .FindAsync(id);





            if (oldBill == null)
            {
                return NotFound();
            }








            oldBill.ContractID = bill.ContractID;


            oldBill.BillMonth = bill.BillMonth;


            oldBill.BillYear = bill.BillYear;


            oldBill.ElectricOld = bill.ElectricOld;


            oldBill.ElectricNew = bill.ElectricNew;


            oldBill.WaterOld = bill.WaterOld;


            oldBill.WaterNew = bill.WaterNew;


            oldBill.Status = bill.Status;





            int electricUsed =
                oldBill.ElectricNew - oldBill.ElectricOld;



            int waterUsed =
                oldBill.WaterNew - oldBill.WaterOld;




            oldBill.TotalAmount =

                electricUsed * 3500 +

                waterUsed * 20000;







            await _context.SaveChangesAsync();




            return NoContent();


        }













        // DELETE: api/Bills/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBill(int id)
        {


            var bill = await _context.Bills

                .FindAsync(id);





            if (bill == null)
            {

                return NotFound();

            }





            _context.Bills.Remove(bill);




            await _context.SaveChangesAsync();




            return NoContent();


        }



    }

}