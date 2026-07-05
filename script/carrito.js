// ================================
// CARRITO DE COMPRAS - Sweet Cakes
// Guarda el carrito en localStorage
// ================================

function obtenerCarrito() {
    const datos = localStorage.getItem("carritoSweetCakes");
    return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoSweetCakes", JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem("carritoSweetCakes");
}

function agregarAlCarrito(item) {
    const carrito = obtenerCarrito();
    const existente = carrito.find(p => p.id === item.id);

    if (existente) {
        existente.cantidad += item.cantidad;
    } else {
        carrito.push(item);
    }

    guardarCarrito(carrito);
    alert(item.nombre + " se agregó al carrito 🛒");
}

function eliminarDelCarrito(index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
}

function cambiarCantidad(index, cambio) {
    const carrito = obtenerCarrito();
    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

function renderizarCarrito() {
    const cuerpo = document.getElementById("cuerpo-carrito");
    
    // Si no estamos en carrito.html, saltamos el renderizado de la tabla,
    // pero ejecutamos la lógica para actualizar los botones si estamos en checkout.html
    const carrito = obtenerCarrito();
    let subtotal = 0;

    if (cuerpo) {
        cuerpo.innerHTML = "";
        carrito.forEach((item, index) => {
            const totalItem = parseFloat((item.precio * item.cantidad).toFixed(2));
            subtotal += totalItem;

            cuerpo.innerHTML += `
                <tr>
                    <td>
                        <img src="${item.imagen}" alt="${item.nombre}" width="55" height="42" style="border-radius:6px; display:inline-block; margin-right:10px; vertical-align:middle;">
                        <strong>${item.nombre}</strong>
                        <br><small style="color:var(--color-texto-suave)">${item.tipo}</small>
                        <br><button onclick="eliminarDelCarrito(${index})" style="margin-top:6px; padding:4px 12px; font-size:0.72rem; background:transparent; color:var(--color-cereza); border:1px solid var(--color-cereza); border-radius:20px;">Eliminar</button>
                    </td>
                    <td style="text-align:center">S/ ${item.precio.toFixed(2)}</td>
                    <td style="text-align:center">
                        <button onclick="cambiarCantidad(${index}, -1)" style="padding:4px 10px; border-radius:20px; background:var(--color-rosa-claro); color:var(--color-texto);">−</button>
                        &nbsp;${item.cantidad}&nbsp;
                        <button onclick="cambiarCantidad(${index}, 1)" style="padding:4px 10px; border-radius:20px; background:var(--color-rosa-claro); color:var(--color-texto);">+</button>
                    </td>
                    <td style="text-align:center; font-weight:700; color:var(--color-cereza)">S/ ${totalItem.toFixed(2)}</td>
                </tr>
            `;
        });
    } else {
        // Si no existe la tabla del carrito (estamos en checkout), calculamos el subtotal de respaldo en memoria
        carrito.forEach(item => {
            subtotal += parseFloat((item.precio * item.cantidad).toFixed(2));
        });
    }

    subtotal = parseFloat(subtotal.toFixed(2));

    const elItems = document.getElementById("resumen-items");
    const elSubtotal = document.getElementById("resumen-subtotal");
    const elEnvio = document.getElementById("resumen-envio");
    const elTotal = document.getElementById("resumen-total");

    // Lógica para definir el envío (No sumará 10 a menos que el HTML tenga el elemento del envío desgrosado)
    const envio = (carrito.length > 0 && elEnvio) ? 10 : 0;
    const total = subtotal + envio;

    if (elItems) elItems.textContent = carrito.length;
    if (elSubtotal) elSubtotal.textContent = "S/ " + subtotal.toFixed(2);
    if (elEnvio) elEnvio.textContent = "S/ " + envio.toFixed(2);
    if (elTotal) elTotal.textContent = " S/ " + total.toFixed(2);

    // NUEVO: Busca el botón del formulario de Checkout y actualiza el "S/ 115.00" de prueba por el valor real
    const btnConfirmar = document.querySelector(".btn-confirmar");
    if (btnConfirmar && !document.getElementById("overlay-boleta").classList.contains("activo")) {
        // En el checkout, asumimos que siempre se suma el envío de S/ 10
        const totalCheckout = subtotal + (carrito.length > 0 ? 10 : 0);
        btnConfirmar.textContent = `✓ Confirmar y Pagar — S/ ${totalCheckout.toFixed(2)}`;
    }
}

// ====== MODAL DE BOLETA CORREGIDO ======
function mostrarBoleta() {
    const carrito = (typeof obtenerCarrito === "function") ? obtenerCarrito() : [];
    const contenedor = document.getElementById("boleta-items");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    let subtotal = 0;

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; color:var(--color-texto-suave);'>No hay productos registrados.</p>";
    } else {
        carrito.forEach(item => {
            // CORRECCIÓN MATEMÁTICA: Evitamos centavos extra multiplicando con redondeo controlado
            const totalItem = parseFloat((item.precio * item.cantidad).toFixed(2));
            subtotal += totalItem;

            contenedor.innerHTML += `
                <div class="boleta-item">
                    <span>
                        ${item.nombre}
                        <small>${item.tipo} × ${item.cantidad}</small>
                    </span>
                    <span>S/ ${totalItem.toFixed(2)}</span>
                </div>
            `;
        });
    }

    subtotal = parseFloat(subtotal.toFixed(2));
    const envio = carrito.length > 0 ? 10 : 0;
    const total = subtotal + envio;

    document.getElementById("boleta-subtotal").textContent = "S/ " + subtotal.toFixed(2);
    document.getElementById("boleta-envio").textContent = "S/ " + envio.toFixed(2);
    document.getElementById("boleta-total").textContent = "S/ " + total.toFixed(2);

    // Desenfoca el fondo y muestra el modal
    document.getElementById("checkout-principal").classList.add("fondo-desenfocado");
    document.getElementById("overlay-boleta").classList.add("activo");

    // Vacía el carrito ya que la compra se completó exitosamente
    if (typeof vaciarCarrito === "function") {
        vaciarCarrito();
    }
}

function procesarPago(event) {
    event.preventDefault();
    mostrarBoleta();
}

function cerrarBoletaEIrInicio() {
    window.location.href = "../index.html";
}

// Inicialización de eventos al cargar la ventana
document.addEventListener("DOMContentLoaded", renderizarCarrito);

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        renderizarCarrito();
    }
});