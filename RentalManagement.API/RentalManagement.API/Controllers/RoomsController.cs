using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalManagement.API.Data;
using RentalManagement.API.Models;

namespace RentalManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }








        // GET: api/Rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {

            return await _context.Rooms.ToListAsync();

        }









        // GET: api/Rooms/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {

            var room = await _context.Rooms.FindAsync(id);


            if (room == null)
            {
                return NotFound();
            }


            return room;

        }









        // POST: api/Rooms
        [HttpPost]
        public async Task<ActionResult<Room>> CreateRoom(Room room)
        {

            try
            {


                // kiểm tra dữ liệu

                if (string.IsNullOrEmpty(room.RoomCode))
                {
                    return BadRequest(new
                    {
                        message = "Mã phòng không được để trống"
                    });
                }




                if (room.Price <= 0)
                {
                    return BadRequest(new
                    {
                        message = "Giá phòng phải lớn hơn 0"
                    });
                }





                if (room.Area <= 0)
                {
                    return BadRequest(new
                    {
                        message = "Diện tích phải lớn hơn 0"
                    });
                }







                // kiểm tra trùng mã phòng

                var existRoom = await _context.Rooms

                    .AnyAsync(r => r.RoomCode == room.RoomCode);



                if (existRoom)
                {
                    return BadRequest(new
                    {
                        message = "Mã phòng đã tồn tại"
                    });
                }







                // nếu chưa nhập trạng thái

                if (string.IsNullOrEmpty(room.Status))
                {
                    room.Status = "Còn trống";
                }







                _context.Rooms.Add(room);


                await _context.SaveChangesAsync();




                return CreatedAtAction(

                    nameof(GetRoom),

                    new
                    {
                        id = room.RoomID
                    },

                    room

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













        // PUT: api/Rooms/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(

            int id,

            Room room

        )
        {


            if (id != room.RoomID)
            {
                return BadRequest();
            }





            if (room.Price <= 0)
            {
                return BadRequest(new
                {
                    message = "Giá phòng phải lớn hơn 0"
                });
            }






            if (room.Area <= 0)
            {
                return BadRequest(new
                {
                    message = "Diện tích phải lớn hơn 0"
                });
            }







            _context.Entry(room).State =

                EntityState.Modified;






            try
            {

                await _context.SaveChangesAsync();

            }

            catch (DbUpdateConcurrencyException)
            {


                if (!RoomExists(id))
                {
                    return NotFound();
                }


                throw;

            }






            return NoContent();

        }












        // DELETE: api/Rooms/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {


            var room = await _context.Rooms.FindAsync(id);



            if (room == null)
            {
                return NotFound();
            }








            // kiểm tra phòng có hợp đồng chưa

            var hasContract = await _context.Contracts

                .AnyAsync(c => c.RoomID == id);




            if (hasContract)
            {

                return BadRequest(new
                {
                    message = "Không thể xóa phòng đang có hợp đồng"
                });

            }








            _context.Rooms.Remove(room);



            await _context.SaveChangesAsync();




            return NoContent();


        }









        private bool RoomExists(int id)
        {

            return _context.Rooms.Any(

                e => e.RoomID == id

            );

        }


    }
}