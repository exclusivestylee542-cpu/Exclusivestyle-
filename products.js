/* ============================================================
   EXC. — CONFIGURACIÓN Y PRODUCTOS
   Este es el único archivo que necesitas editar para cambiar
   el número de WhatsApp, los precios o los productos.
   ============================================================ */

const STORE = {
  // Número de WhatsApp con código de país, solo dígitos. Colombia = 57.
  // Ejemplo: "573001234567"
  whatsapp: "573238765716",
  instagram: "https://www.instagram.com/exc.store_",
  facebook: "",
  currency: "COP"
};

const TALLAS_CALZADO = ["37", "38", "39", "40", "41", "42", "43", "44"];
const TALLAS_ROPA = ["S", "M", "L", "XL"];
// Tallas de niño: rango("21","33") -> 21, 22, ... 33
function rango(desde, hasta) {
  var out = [];
  for (var n = Number(desde); n <= Number(hasta); n++) out.push(String(n));
  return out;
}

/* category: "sneakers", "ninos", "ropa", "relojes" o "accesorios".
   new: true  -> aparece en "Nuevos ingresos" y con etiqueta "Nuevo". */

/* Productos de EJEMPLO: cambia nombre, precio y agrega tu foto.
   image: ruta de la foto, por ejemplo "fotos-sneaker-01.jpg".
   Si image está vacío se muestra un espacio con la marca EXC. */
const PRODUCTS = [
  { id: "sn-01", name: "Nike TN Negro", category: "sneakers", price: 189900, sizes: TALLAS_CALZADO, image: "tenis-01.jpg", new: true },
  { id: "sn-02", name: "Clemont Negro Rojo", category: "sneakers", price: 149900, sizes: TALLAS_CALZADO, image: "tenis-02.jpg", new: true },
  { id: "sn-03", name: "New Balance 9060 Gris Negro", category: "sneakers", price: 189900, sizes: TALLAS_CALZADO, image: "tenis-03.jpg", new: true },
  { id: "sn-04", name: "Calvin Klein CK Negro", category: "sneakers", price: 129900, sizes: rango("34", "43"), image: "tenis-04.jpg", new: true },
  { id: "sn-05", name: "Creative Recreation Negro Dorado", category: "sneakers", price: 179900, sizes: TALLAS_CALZADO, image: "tenis-05.jpg", new: true },
  { id: "sn-06", name: "On Cloud Negro", category: "sneakers", price: 149900, sizes: rango("34", "43"), image: "tenis-06.jpg", new: true },
  { id: "sn-07", name: "Guess Blanco Negro", category: "sneakers", price: 179900, sizes: TALLAS_CALZADO, image: "tenis-07.jpg", new: true },
  { id: "ni-01", name: "Plata Espejo Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-01.jpg", new: true },
  { id: "ni-02", name: "Black Wings Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-02.jpg", new: true },
  { id: "ni-03", name: "Charol Rojo Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-03.jpg", new: true },
  { id: "ni-04", name: "Crema Monograma Kids", category: "ninos", price: 95000, sizes: rango("23", "33"), image: "nino-04.jpg", new: true },
  { id: "ni-05", name: "Runner Negro Confeti Kids", category: "ninos", price: 95000, sizes: rango("22", "33"), image: "nino-05.jpg", new: true },
  { id: "ni-06", name: "Clásico Concha Negro Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-06.jpg", new: true },
  { id: "ni-07", name: "Dune Runner Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-07.jpg", new: true },
  { id: "ni-08", name: "Runner Negro Blanco Kids", category: "ninos", price: 95000, sizes: rango("22", "33"), image: "nino-08.jpg", new: true },
  { id: "ni-09", name: "Runner Azul Marino Kids", category: "ninos", price: 95000, sizes: rango("22", "33"), image: "nino-09.jpg", new: true },
  { id: "ni-10", name: "Lona Alta Blanca Kids", category: "ninos", price: 95000, sizes: rango("18", "20"), image: "nino-10.jpg", new: true },
  { id: "ni-11", name: "Arena Brillo Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-11.jpg", new: true },
  { id: "ni-12", name: "Skate Negro Clásico Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-12.jpg", new: true },
  { id: "ni-13", name: "Café Osito Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-13.jpg", new: true },
  { id: "ni-14", name: "Total Black Brillo Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-14.jpg", new: true },
  { id: "ni-15", name: "Negro Velcro Premium Kids", category: "ninos", price: 95000, sizes: rango("22", "33"), image: "nino-15.jpg", new: true },
  { id: "ni-16", name: "Azul Moño Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-16.jpg", new: true },
  { id: "ni-17", name: "Velcro Negro Rojo Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-17.jpg", new: true },
  { id: "ni-18", name: "Black Red Script Kids", category: "ninos", price: 95000, sizes: rango("21", "33"), image: "nino-18.jpg", new: true },
  { id: "ro-01", name: "Camiseta Essential Negra",  category: "ropa", price: 89000,  sizes: TALLAS_ROPA, image: "", new: true },
  { id: "ro-02", name: "Camiseta Essential Blanca", category: "ropa", price: 89000,  sizes: TALLAS_ROPA, image: "" },
  { id: "ro-03", name: "Buzo Oversize EXC.",        category: "ropa", price: 169000, sizes: TALLAS_ROPA, image: "" },
  { id: "wa-01", name: "Reloj Essential 01 (referencia)", category: "relojes", price: 189000, sizes: ["Única"], image: "", new: true },
  { id: "wa-02", name: "Curren Chronograph Verde Rosé", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-01.jpg", new: true },
  { id: "wa-03", name: "Curren Chronograph Gris Rosé", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-02.jpg", new: true },
  { id: "wa-04", name: "TechnoMarine Cruise Azul Transparente", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-03.jpg", new: true },
  { id: "wa-05", name: "TechnoMarine Cruise Black Gold", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-04.jpg", new: true },
  { id: "wa-06", name: "TechnoMarine Champagne Wave Negro", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-05.jpg", new: true },
  { id: "wa-07", name: "TechnoMarine Octagon Dorado Blanco", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-06.jpg", new: true },
  { id: "wa-08", name: "TechnoMarine Gold Wave Negro", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-07.jpg", new: true },
  { id: "wa-09", name: "TechnoMarine Dorado Negro TM-125155", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-08.jpg", new: true },
  { id: "wa-10", name: "Mulco Kripton Blanco Rosé", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-09.jpg", new: true },
  { id: "wa-11", name: "Curren Tachymeter Acero Plateado", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-10.jpg", new: true },
  { id: "wa-12", name: "Curren Cuadrado Romano Negro Rosé", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-11.jpg", new: true },
  { id: "wa-13", name: "Curren Square Negro Dorado", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-12.jpg", new: true },
  { id: "wa-14", name: "Curren Acero Plateado Dial Verde", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-13.jpg", new: true },
  { id: "wa-15", name: "Curren Square Acero Plateado", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-14.jpg", new: true },
  { id: "wa-16", name: "Curren Honeycomb Dorado", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-15.jpg", new: true },
  { id: "wa-17", name: "Curren Honeycomb Azul Hielo", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-16.jpg", new: true },
  { id: "wa-18", name: "Curren Tonneau Chronograph Dorado Negro", category: "relojes", price: 100000, sizes: ["Única"], image: "reloj-17.jpg", new: true },
  { id: "ac-01", name: "Gorra EXC. (referencia)", category: "accesorios", price: 69000, sizes: ["Única"], image: "", new: true }
];
