using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TEBAS.Models;

namespace LugaresTuristicosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LugaresTuristicosController : ControllerBase
    {
        private static List<LugarTuristico> Lugares = new List<LugarTuristico>
        {
            new LugarTuristico
            {
                Id = 1,
                Nombre = "Antigua Guatemala",
                Descripcion = "Una ciudad colonial llena de historia y cultura.",
                Latitud = 14.5583,
                Longitud = -90.7333,
                ImagenUrl = "https://bonvoyageguatemala.com/en/wp-content/uploads/2018/09/shutterstock-769890442.jpg"
            },
            new LugarTuristico
            {
                Id = 2,
                Nombre = "Lago de Atitlán",
                Descripcion = "Uno de los lagos más bellos del mundo, rodeado de volcanes y pueblos pintorescos.",
                Latitud = 14.6980,
                Longitud = -91.2000,
                ImagenUrl = "https://i.pinimg.com/originals/31/ce/22/31ce2279b8f61de33b15f048a0846bd1.jpg"
            },
            new LugarTuristico
            {
                Id = 3,
                Nombre = "Tikal",
                Descripcion = "Uno de los sitios arqueológicos más importantes de la civilización maya.",
                Latitud = 17.2220,
                Longitud = -89.6237,
                ImagenUrl = "https://www.anywhere.com/img-a/destination/tikal-guatemala/Tikal-10.jpg"
            },
            new LugarTuristico
            {
                Id = 4,
                Nombre = "Semuc Champey",
                Descripcion = "Un paraíso natural con pozas de agua turquesa y un río subterráneo.",
                Latitud = 15.5333,
                Longitud = -89.9667,
                ImagenUrl = "https://www.beyondtheordinary.co.uk/wp-content/uploads/2019/06/Semuc-Champey-Guatemala-Aerial-1600x1064.jpeg"
            },
            new LugarTuristico
            {
                Id = 5,
                Nombre = "Chichicastenango",
                Descripcion = "Famoso por su mercado indígena y su rica cultura maya.",
                Latitud = 14.9442,
                Longitud = -91.1106,
                ImagenUrl = "https://aprende.guatemala.com/wp-content/uploads/2017/02/Iglesia-Parroquial-de-Santo-Tomas-en-Chichicastenango-1.jpg"
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<LugarTuristico>> Get()
        {
            return Ok(Lugares);
        }

        [HttpGet("{id}")]
        public ActionResult<LugarTuristico> Get(int id)
        {
            var lugar = Lugares.Find(l => l.Id == id);
            if (lugar == null)
            {
                return NotFound();
            }
            return Ok(lugar);
        }
    }
}