document.addEventListener("DOMContentLoaded", function () {
    const noSesion = document.getElementById("no-sesion");
    const datosUsuario = document.getElementById("datos-usuario");

    const nombreUsuario = document.getElementById("nombre-usuario");
    const emailUsuario = document.getElementById("email-usuario");
    const listaPedidos = document.getElementById("lista-pedidos");

    // Simular la autenticación usando localStorage (puedes usar una API en un proyecto real)
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        // Mostrar los datos del usuario
        noSesion.classList.add("oculto");
        datosUsuario.classList.remove("oculto");

        nombreUsuario.textContent = usuario.nombre;
        emailUsuario.textContent = usuario.email;

        // Cargar los pedidos del usuario
        cargarPedidos(usuario.pedidos);
    } else {
        // Mostrar la opción para iniciar sesión o registrarse
        noSesion.classList.remove("oculto");
        datosUsuario.classList.add("oculto");
    }

    function cargarPedidos(pedidos) {
        if (pedidos.length === 0) {
            listaPedidos.innerHTML = "<p>No has realizado ningún pedido aún.</p>";
        } else {
            listaPedidos.innerHTML = "";
            pedidos.forEach(pedido => {
                const pedidoHTML = `
                    <div class="pedido">
                        <h3>Pedido #${pedido.id}</h3>
                        <p><strong>Fecha:</strong> ${pedido.fecha}</p>
                        <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
                        <ul>
                            ${pedido.productos.map(producto => `<li>${producto.nombre} - $${producto.precio.toFixed(2)}</li>`).join('')}
                        </ul>
                    </div>
                `;
                listaPedidos.innerHTML += pedidoHTML;
            });
        }
    }
});
