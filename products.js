/* ============================================================
   EXC. — CONFIGURACIÓN Y PRODUCTOS
   Este es el único archivo que necesitas editar para cambiar
   el número de WhatsApp, los precios o los productos.
   ============================================================ */

const STORE = {
  // Número de WhatsApp con código de país, solo dígitos. Colombia = 57.
  // Ejemplo: "573001234567"
  whatsapp: "57XXXXXXXXXX",
  instagram: "",
  facebook: "",
  currency: "COP"
};

const TALLAS_CALZADO = ["37", "38", "39", "40", "41", "42", "43", "44"];
const TALLAS_ROPA = ["S", "M", "L", "XL"];

/* category: "sneakers", "ropa", "relojes" o "accesorios".
   new: true  -> aparece en "Nuevos ingresos" y con etiqueta "Nuevo". */

/* Productos de EJEMPLO: cambia nombre, precio y agrega tu foto.
   image: ruta de la foto, por ejemplo "assets/products/sneaker-01.jpg".
   Si image está vacío se muestra un espacio con la marca EXC. */
const PRODUCTS = [
  { id: "sn-01", name: "Tenis Noir 01",   category: "sneakers", price: 289000, sizes: TALLAS_CALZADO, image: "", new: true },
  { id: "sn-02", name: "Tenis Ash 02",    category: "sneakers", price: 319000, sizes: TALLAS_CALZADO, image: "", new: true },
  { id: "sn-03", name: "Tenis Slate 03",  category: "sneakers", price: 349000, sizes: TALLAS_CALZADO, image: "" },
  { id: "sn-04", name: "Tenis Bone 04",   category: "sneakers", price: 299000, sizes: TALLAS_CALZADO, image: "" },
  { id: "ro-01", name: "Camiseta Essential Negra",  category: "ropa", price: 89000,  sizes: TALLAS_ROPA, image: "", new: true },
  { id: "ro-02", name: "Camiseta Essential Blanca", category: "ropa", price: 89000,  sizes: TALLAS_ROPA, image: "" },
  { id: "ro-03", name: "Buzo Oversize EXC.",        category: "ropa", price: 169000, sizes: TALLAS_ROPA, image: "" },
  { id: "wa-01", name: "Reloj Essential 01 (referencia)", category: "relojes", price: 189000, sizes: ["Única"], image: "", new: true },
  { id: "ac-01", name: "Gorra EXC. (referencia)", category: "accesorios", price: 69000, sizes: ["Única"], image: "", new: true }
];
