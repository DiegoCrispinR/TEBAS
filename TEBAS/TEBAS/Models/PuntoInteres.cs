namespace TEBAS.Models
{
    public class LugarTuristico
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public double Latitud { get; set; }
        public double Longitud { get; set; }
        public string ImagenUrl { get; set; } // URL de la imagen del lugar
    }
}