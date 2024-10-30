const products = [
  {
    id: 'h10065',
    nombre: 'Camiseta local',
    categoria: 'Hombre',
    precio: 44990,
    descripcioncorta: 'Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt nullam, mattis senectus eget elementum condimentum at donec dictum.',
    imagen: '/productos-images/hombre-local.jpg' 
  },
  {
    id: 'h10066',
    nombre: 'Camiseta visita',
    categoria: 'Hombre',
    precio: 44990,
    descripcioncorta: 'Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt nullam, mattis senectus eget elementum condimentum at donec dictum.',
    imagen: '/productos-images/hombre-visita.jpg' 
  },
  {
    id: 'm10055',
    nombre: 'Camiseta local',
    categoria: 'Mujer',
    precio: 39990,
    descripcioncorta: 'Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt nullam, mattis senectus eget elementum condimentum at donec dictum.',
    imagen: '/productos-images/mujer-local.jpg' 
  },
  {
    id: 'n10075',
    nombre: 'Camiseta local',
    categoria: 'Niños',
    precio: 29990,
    descripcioncorta: 'Lorem ipsum dolor sit amet consectetur adipiscing elit tincidunt nullam, mattis senectus eget elementum condimentum at donec dictum.',
    imagen: '/productos-images/niño-local.jpg' 
  }
];


const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export default fetchProducts; 

  
