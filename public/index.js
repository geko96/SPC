let carrito = [];

const productos = [
    { nombre: "Gaseosa Fanta Naranja", precio: 1500, imagen: "./img/fanta.jpg" },
    { nombre: "Gaseosa Pepsi", precio: 1400, imagen: "./img/pepsi.jpg" },
    { nombre: "Masitas Oreo", precio: 1200, imagen: "./img/oreo.jpg" },
    { nombre: "Gaseosa Fanta Limón", precio: 1400, imagen: "./img/fantal.jpg" },
    { nombre: "Aquarius Pera", precio: 1400, imagen: "./img/aquape.jpg" },
    { nombre: "Aquarius Pomelo", precio: 1400, imagen: "./img/aquapo.jpg" },
    { nombre: "Alfajor Tatin Negro", precio: 800, imagen: "./img/tatinn.jpg" },
    { nombre: "Alfajor Tatin Blanco", precio: 800, imagen: "./img/tatinb.jpg" },
    { nombre: "Gaseosa Sprite Limalimón", precio: 1400, imagen: "./img/sprite.jpg" },
    { nombre: "Alfajor Oreo", precio: 1200, imagen: "./img/alfajor.jpg" }
];

document.addEventListener("DOMContentLoaded", function() {
    cargarProductos();
    mostrarCarrito();

    // Elementos del menú de pedidos
    const pedidosFlotante = document.getElementById("pedidos-flotante");
    const abrirPedidos = document.getElementById("abrir-pedidos");
    const cerrarPedidos = document.getElementById("cerrar-pedidos");

    // Elementos del carrito de compras
    const carritoFlotante = document.getElementById("carrito-compras");
    const abrirCarrito = document.getElementById("abrir-carrito");
    const cerrarCarrito = document.getElementById("cerrar-carrito");

    abrirPedidos.addEventListener("click", function() {
        pedidosFlotante.classList.add("visible");
        cargarPedidos(); // Cargar los pedidos cuando se abre el menú
    });

    cerrarPedidos.addEventListener("click", function() {
        pedidosFlotante.classList.remove("visible");
    });

    abrirCarrito.addEventListener("click", function() {
        carritoFlotante.classList.add("visible"); // Abre el carrito
    });

    cerrarCarrito.addEventListener("click", function() {
        carritoFlotante.classList.remove("visible"); // Cierra el carrito con el nuevo botón
    });
});

function cargarProductos() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = ""; // Asegurarse de que la lista esté vacía

    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})"><i class="fas fa-cart-plus"></i> Agregar al Carrito</button>
            </div>
        `;
        listaProductos.innerHTML += productoHTML;
    });
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

        const botonEliminar = document.createElement("img");
        botonEliminar.src = "./img/x.jpg"; 
        botonEliminar.alt = "Eliminar";
        botonEliminar.style.width = "13px";
        botonEliminar.style.height = "13px";
        botonEliminar.style.cursor = "pointer";
        botonEliminar.onclick = () => eliminarDelCarrito(index);
        
        item.appendChild(botonEliminar);
        listaCarrito.appendChild(item);
    });

    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    document.getElementById("total").textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

document.getElementById("realizar-pedido").onclick = () => realizarPedido();

function realizarPedido() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    const pedido = {
        id: Date.now(),
        fecha: new Date().toISOString().split('T')[0],
        total: carrito.reduce((acc, producto) => acc + producto.precio, 0),
        productos: [...carrito]
    };

    fetch('save_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
        carrito = [];
        mostrarCarrito();
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}

// Función para cargar pedidos (pedidos.js)
function cargarPedidos() {
    const listaPedidos = document.getElementById("lista-pedidos");
    listaPedidos.innerHTML = ""; // Asegurarse de que la lista esté vacía

    fetch('get_orders.php')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                listaPedidos.innerHTML = "<p><i class='fas fa-exclamation-circle'></i> No has realizado ningún pedido aún.</p>";
                return;
            }

            data.forEach(pedido => {
                const pedidoHTML = `
                    <div class="pedido">
                        <h3><i class="fas fa-receipt"></i> Pedido #${pedido.id}</h3>
                        <p><i class="fas fa-calendar-alt"></i> Fecha: ${pedido.fecha}</p>
                        <p><i class="fas fa-dollar-sign"></i> Total: $${pedido.total.toFixed(2)}</p>
                        <ul>
                            ${pedido.productos.map(producto => `<li><i class="fas fa-box"></i> ${producto.nombre} - $${producto.precio.toFixed(2)}</li>`).join('')}
                        </ul>
                    </div>
                `;
                listaPedidos.innerHTML += pedidoHTML;
            });
        })
        .catch(error => console.error('Error:', error));
}

function CallAPI (){
    fetch('http://localhost:3000/api/register')
    .then(response => response.json())
    .then(json => console.log(json))
}