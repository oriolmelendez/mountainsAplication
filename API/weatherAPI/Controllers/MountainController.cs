using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace weatherAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MountainController : ControllerBase
    {

        private readonly DataContext _dataContext;

        public MountainController(DataContext dataContext) {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Mountain>>> Get()
        {
            return Ok(await _dataContext.MountainsCat.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Mountain>>> Get(int id)
        {
            var dbMountain = await _dataContext.MountainsCat.FindAsync(id);
            if (dbMountain == null)
            {
                return BadRequest("Mountain not found.");
            }

            return Ok(dbMountain);
        }

        [HttpPost]
        public async Task<ActionResult<List<Mountain>>> AddMountain(Mountain mountain)
        {
            _dataContext.MountainsCat.Add(mountain);
            await _dataContext.SaveChangesAsync();
            var dbMountain = await _dataContext.MountainsCat.FindAsync(mountain.Id);
            if (dbMountain == null)
            {
                return BadRequest("Mountain not found.");
            }
            return Ok(dbMountain);
        }

        [HttpPut]
        public async Task<ActionResult<List<Mountain>>> UpdateMountain(Mountain requestData)
        {
            var dbMountain = await _dataContext.MountainsCat.FindAsync(requestData.Id);
            if (dbMountain == null)
            {
                return BadRequest("Mountain not found.");
            }

            dbMountain.Name = requestData.Name;
            dbMountain.Region = requestData.Region;
            dbMountain.Height = requestData.Height;
            dbMountain.Latitude = requestData.Latitude;
            dbMountain.Altitude = requestData.Altitude;
            
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.MountainsCat.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Mountain>>> Delete(int id)
        {
            var dbMountain = await _dataContext.MountainsCat.FindAsync(id);
            if (dbMountain == null)
            {
                return BadRequest("Mountain not found.");
            }

            _dataContext.MountainsCat.Remove(dbMountain);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.MountainsCat.ToListAsync());
        }
    }
}
