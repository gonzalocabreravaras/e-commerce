# Ecommerce Básico con React y Firebase

Este proyecto es una aplicación de ecommerce básica creada con **React**, **JavaScript** y **Firebase** como base de datos. Permite a los usuarios ver productos, agregarlos al carrito, y realizar un proceso de compra.

## Características

- Visualización de productos por categoría.
- Detalles de productos con opción para agregar al carrito.
- Carrito de compras con posibilidad de modificar la cantidad de productos o eliminar productos.
- Persistencia de datos en `localStorage` para el carrito de compras.
- Integración con **Firebase** para gestionar los productos en la base de datos.
- Enrutamiento de páginas con **React Router**.
- Interfaz de usuario con **Bootstrap** y **FontAwesome**.

## Estructura del Proyecto

- **src/**
  - **Componentes/**: Carpeta con los componentes principales como `Header`, `ProductDetail`, `ItemListContainer`, etc.
  - **context/**: Carpeta con el contexto `CartContext` para manejar el estado global del carrito de compras.
  - **Utils/**: Funciones auxiliares como `formatCurrency`.
  - **firebase.js**: Configuración para conectar con Firebase.
  - **App.js**: Componente principal que gestiona las rutas y la estructura general de la aplicación.

## Funcionalidad

- **Página Principal**: Muestra todos los productos o los productos filtrados por categoría.
- **Detalles del Producto**: Muestra información completa de un producto específico, con opción para agregarlo al carrito.
- **Carrito de Compras**: Permite ver y gestionar los productos agregados al carrito.
- **404 - Página no encontrada**: Muestra un mensaje cuando una ruta no existe.

## Dependencias

- `react`
- `react-router-dom`
- `firebase`
- `react-loading-skeleton`
- `bootstrap`
- `@fortawesome/fontawesome-free`
