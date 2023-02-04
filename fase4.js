 /*// Variables
 const baseDeDatos = [

    {
        id: 1,
        nombre: 'Anana',
        precio: 912,
        imagen: 'https://granjaus.com/wp-content/uploads/2019/02/AA113.jpg'
    },
    {
        id: 2,
        nombre: 'Manzana Verde',
        precio: 725,
        imagen: 'https://frutasolivar.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/09/main-img-manzana.jpg.webp' 
    },
    {
        id: 3,
        nombre: 'Pera',
        precio: 489,
        imagen: 'https://laopinion.com/wp-content/uploads/sites/3/2015/10/pera.jpg?quality=80&strip=all&w=1196' 
    },
    {
        id: 4,
        nombre: 'Banana',
        precio: 278,
        imagen: 'https://greenshop.ar/wp-content/uploads/sites/9/2016/08/A.2.6-500GR.jpg'
    },
    {
        id: 5,
        nombre: 'Batata',
        precio: 279,
        imagen: 'https://greenshop.ar/wp-content/uploads/sites/9/2016/08/A.6.7-500GR-600x600.jpg'
    },
    {
        id: 6,
        nombre: 'Cebolla',
        precio: 275,
        imagen: 'https://greenshop.ar/wp-content/uploads/sites/9/2016/08/A.6.14-500GR-600x600.jpg'
    },
    {
        id: 7,
        nombre: 'Calabacin',
        precio: 250,
        imagen: 'https://www.hogarmania.com/archivos/201105/calabacin-xl-668x400x80xX.jpg'
    },
    {
        id: 8,
        nombre: 'Fresas',
        precio: 750,
        imagen: 'https://img.interempresas.net/fotos/1341264.jpeg'
    },
    {
        id: 9,
        nombre: 'Limon',
        precio: 1150,
        imagen: 'https://www.herbazest.com/imgs/0/1/a/851921/limon.jpg' 
    }
]; */

fetch("/.baseDeDatos.JSON")
.then(response => response.json())
.then(baseDeDatos => miPrograma(baseDeDatos))

    function miPrograma(baseDeDatos) {

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const divisa = '$/Kg';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
    
    confirmBottonText: "Gracias",  miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+','-';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
       
        Swal.fire ({
            title: "Bienvenido Gracias Por Elegirnos",
    text: "Inicie su Compra",
    imageUrl: "https://revertia.com/wp-content/uploads/2014/01/1339221557612-10026808-icono-de-carrito-de-compras.jpg",
            imageWidth: 200,
            imageHeight: 200,
    icon: "Continuar",
    confirmBottonText: "Gracias",
    timer: 8000
})
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();
    saveLocal();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el productoext
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    saveLocal();
}


/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();

//set item
const saveLocal = () => {
localStorage.setItem('carrito', JSON.stringify(carrito));
};

//get item 

JSON.parse(localStorage.getItem('carrito'))

}