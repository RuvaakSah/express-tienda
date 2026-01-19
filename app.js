const express = require('express');
const app = express();
const port = 3000;

const productsData = [
  { id: 1, name: 'Portátil HP', price: 799, category: 'electrónica', stock: 15 },
  { id: 2, name: 'iPhone 14', price: 999, category: 'electrónica', stock: 25 },
  { id: 3, name: 'Camiseta Nike', price: 29, category: 'ropa', stock: 50 },
  { id: 4, name: 'Zapatillas Adidas', price: 89, category: 'ropa', stock: 30 },
  { id: 5, name: 'Mesa IKEA', price: 149, category: 'hogar', stock: 10 },
  { id: 6, name: 'Silla oficina', price: 199, category: 'hogar', stock: 20 },
  { id: 7, name: 'Auriculares Sony', price: 159, category: 'electrónica', stock: 40 },
  { id: 8, name: 'Teclado mecánico', price: 129, category: 'electrónica', stock: 18 },
  { id: 9, name: 'Pantalón Levi\'s', price: 79, category: 'ropa', stock: 35 },
  { id: 10, name: 'Chaqueta North Face', price: 199, category: 'ropa', stock: 22 },
  { id: 11, name: 'Lámpara LED', price: 45, category: 'hogar', stock: 60 },
  { id: 12, name: 'Alfombra', price: 69, category: 'hogar', stock: 15 },
  { id: 13, name: 'Tablet Samsung', price: 399, category: 'electrónica', stock: 12 },
  { id: 14, name: 'Smart TV LG 55"', price: 699, category: 'electrónica', stock: 8 },
  { id: 15, name: 'Sudadera Puma', price: 49, category: 'ropa', stock: 45 },
  { id: 16, name: 'Estantería', price: 89, category: 'hogar', stock: 14 },
  { id: 17, name: 'Ratón inalámbrico', price: 25, category: 'electrónica', stock: 70 },
  { id: 18, name: 'Gafas de sol Ray-Ban', price: 159, category: 'ropa', stock: 28 },
  { id: 19, name: 'Sofá 3 plazas', price: 599, category: 'hogar', stock: 5 },
  { id: 20, name: 'Cafetera Nespresso', price: 179, category: 'hogar', stock: 25 },
];

// Función de ayuda para filtrar
const getProductsByCategory = (cat) => productsData.filter(p => p.category === cat);

// Plantilla HTML básica
const layout = (titulo, contenido) => `
  <nav>
    <a href="/">Inicio</a> | <a href="/electronica">Electrónica</a> | 
    <a href="/ropa">Ropa</a> | <a href="/hogar">Hogar</a> | 
    <a href="/productos">Todos</a> | <a href="/productos/baratos">Baratos</a> | <a href="/productos/caros">Caros</a>
  </nav>
  <h1>${titulo}</h1>
  ${contenido}
`;

// TODO 1: Inicio
app.get('/', (req, res) => {
  res.send(layout('Bienvenido a la Tienda', '<p>Elige una categoría arriba para empezar.</p>'));
});

// TODO 2, 3, 4: Categorías
app.get('/electronica', (req, res) => {
  const prods = getProductsByCategory('electrónica');
  const html = `<ul>${prods.map(p => `<li>${p.name} - ${p.price}€ (Stock: ${p.stock})</li>`).join('')}</ul>`;
  res.send(layout('Productos de Electrónica', html));
});

app.get('/ropa', (req, res) => {
  const prods = getProductsByCategory('ropa');
  const html = `<ul>${prods.map(p => `<li>${p.name} - ${p.price}€</li>`).join('')}</ul>`;
  res.send(layout('Productos de Ropa', html));
});

app.get('/hogar', (req, res) => {
  const prods = getProductsByCategory('hogar');
  const html = `<ul>${prods.map(p => `<li>${p.name} - ${p.price}€</li>`).join('')}</ul>`;
  res.send(layout('Productos de Hogar', html));
});

// TODO 5: Todos
app.get('/productos', (req, res) => {
  const html = `<ul>${productsData.map(p => `<li>${p.name} (${p.category})</li>`).join('')}</ul>`;
  res.send(layout('Todos los Productos', html));
});

// TODO 6: Baratos (<100)
app.get('/productos/baratos', (req, res) => {
  const prods = productsData.filter(p => p.price < 100);
  const html = `<ul>${prods.map(p => `<li>${p.name} - ${p.price}€</li>`).join('')}</ul>`;
  res.send(layout('Productos Baratos', html));
});

// TODO 7: Caros (>=100)
app.get('/productos/caros', (req, res) => {
  const prods = productsData.filter(p => p.price >= 100);
  const html = `<ul>${prods.map(p => `<li>${p.name} - ${p.price}€</li>`).join('')}</ul>`;
  res.send(layout('Productos Premium', html));
});

app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));