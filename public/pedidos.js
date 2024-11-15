document.addEventListener("DOMContentLoaded", function() {
    const pedidosFlotante = document.getElementById("pedidos-flotante");
    const abrirPedidos = document.getElementById("abrir-pedidos");
    const cerrarPedidos = document.getElementById("cerrar-pedidos");

    abrirPedidos.addEventListener("click", function() {
        pedidosFlotante.classList.add("visible");
        cargarPedidos(); // Cargar los pedidos cuando se abre el menú
    });

    cerrarPedidos.addEventListener("click", function() {
        pedidosFlotante.classList.remove("visible");
    });
});

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
