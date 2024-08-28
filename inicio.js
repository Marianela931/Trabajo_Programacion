const fs = require('fs'); // Importa el módulo fs
const urlApi = 'https://thronesapi.com/api/v2/characters';


async function buscarDatos(id) {
    try {
        const response = await fetch(urlApi + '/' + id);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const datos = await response.json();
        console.log(datos);

    } catch (error) {
        console.error(error);
    }
}


async function obtenerYGuardarTodosLosPersonajes() {
    try {
        const response = await fetch(urlApi);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const personajes = await response.json();
        console.log(personajes); 

        
        guardarDatosEnArchivo(personajes);

    } catch (error) {
        console.error(error);
    }
}


async function guardarDatosEnArchivo(datos) {
    fs.writeFile('todos_los_personajes.json', JSON.stringify(datos, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo', err);
        } else {
            console.log('Todos los personajes han sido guardados en todos_los_personajes.json');
            
            
            mostrarPersonajesStark(); 
        }
    });
}


async function mostrarPersonajesStark() {
    fs.readFile('todos_los_personajes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err);
            return;
        }
        if (!data || data.trim() === "") {
            console.error('El archivo JSON está vacío o es inválido.');
            return;
        }

        try {
            const personajes = JSON.parse(data); 

            
            const starkFamily = personajes.filter(personaje => personaje.family === 'House Stark');

            
            console.log('Personajes de la familia Stark:');
            starkFamily.forEach(personaje => {
                console.log(`${personaje.fullName} (${personaje.title})`);
            });
        } catch (error) {
            console.error('Error al parsear el JSON', error);
        }
    });
}
const nuevoPersonaje = {
    id: 53,
    firstName: "Arya",
    lastName: "Stark",
    fullName: "Arya Stark",
    title: "King of the North",
    family: "House Stark",
    image: "arya-stark.jpg",
    imageUrl: "https://thronesapi.com/assets/images/arya-stark.jpg"
}


async function agregarNuevoPersonaje(nuevoPersonaje) {
    fs.readFile('todos_los_personajes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err);
            return;
        }

        try {
            
            const personajes = JSON.parse(data);

            
            personajes.push(nuevoPersonaje);

            
            fs.writeFile('todos_los_personajes.json', JSON.stringify(personajes, null, 2), (err) => {
                if (err) {
                    console.error('Error al sobrescribir el archivo', err);
                } else {
                    console.log('Nuevo personaje agregado y archivo sobrescrito con éxito.');
                }
            });
        } catch (error) {
            console.error('Error al parsear el JSON', error);
        }
    });
}
async function eliminarPersonajesConIdMayorA25() {
    fs.readFile('todos_los_personajes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err);
            return;
        }

        try {
            
            let personajes = JSON.parse(data);

            
            personajes = personajes.filter(personaje => personaje.id <= 25);

           
            fs.writeFile('todos_los_personajes.json', JSON.stringify(personajes, null, 2), (err) => {
                if (err) {
                    console.error('Error al sobrescribir el archivo', err);
                } else {
                    console.log('Los personajes con ID mayores a 25 han sido eliminados y el archivo ha sido sobrescrito con éxito.');
                }
            });
        } catch (error) {
            console.error('Error al parsear el JSON', error);
        }
    });
}

async function mostrarContenidoArchivoActualizado() {
    fs.readFile('todos_los_personajes.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo actualizado:', err);
            return;
        }
        try {
            const personajes = JSON.parse(data);
            console.log('Contenido del archivo actualizado:', personajes);
        } catch (error) {
            console.error('Error al parsear el archivo actualizado:', error);
        }
    });
}


;

agregarNuevoPersonaje(nuevoPersonaje); 

obtenerYGuardarTodosLosPersonajes().then(() => {
   
    agregarNuevoPersonaje(nuevoPersonaje);
});


buscarDatos(6);

mostrarPersonajesStark();
eliminarPersonajesConIdMayorA25();
mostrarContenidoArchivoActualizado();