
const fs = require('fs'); 

const baseUrl = 'https://fakestoreapi.com/products';


async function obtenerTodosLosProductos() {
    try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error('Error al obtener los productos: ' + response.status);
        }
        const productos = await response.json();
        console.log('Todos los productos:', productos);
        guardarDatosEnArchivo('todos_los_productos.json', productos);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function obtenerProductosLimitados(limite) {
    try {
        const response = await fetch(`${baseUrl}?limit=${limite}`);
        if (!response.ok) {
            throw new Error('Error al obtener los productos limitados: ' + response.status);
        }
        const productos = await response.json();
        console.log(`Productos limitados (${limite}):`, productos);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function agregarNuevoProducto(nuevoProducto) {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(nuevoProducto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al agregar el producto: ' + response.status);
        }
        const productoAgregado = await response.json();
        console.log('Producto agregado:', productoAgregado);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function obtenerProductoPorId(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto por ID: ' + response.status);
        }
        const producto = await response.json();
        console.log(`Producto con ID ${id}:`, producto);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function eliminarProducto(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto: ' + response.status);
        }
        console.log(`Producto con ID ${id} eliminado.`);
    } catch (error) {
        console.error('Error:', error);
    }
}


async function guardarDatosEnArchivo(nombreArchivo, datos) {
    fs.writeFile(nombreArchivo, JSON.stringify(datos, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo', err);
        } else {
            console.log(`Datos guardados en ${nombreArchivo}`);
        }
    });
}


obtenerTodosLosProductos(); 
obtenerProductosLimitados(5); 
obtenerProductoPorId(3); D
eliminarProducto(3); 

const nuevoProducto = {
    title: 'Producto de Prueba',
    price: 29.99,
    description: 'Un producto de prueba agregado a la tienda',
    image: 'https://via.placeholder.com/150',
    category: 'electrónica'
};
agregarNuevoProducto(nuevoProducto);
