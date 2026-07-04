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
    const existente = carrito.find(p => p.id === item.id && p.tipo === item.tipo);

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
    if (!cuerpo) return; // si no estamos en carrito.html, no hace nada

    const carrito = obtenerCarrito();
    cuerpo.innerHTML = "";

    let subtotal = 0;

    carrito.forEach((item, index) => {
        const totalItem = item.precio * item.cantidad;
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

    const envio = carrito.length > 0 ? 10 : 0;
    const total = subtotal + envio;

    document.getElementById("resumen-items").textContent = carrito.length;
    document.getElementById("resumen-subtotal").textContent = "S/ " + subtotal.toFixed(2);
    document.getElementById("resumen-envio").textContent = "S/ " + envio.toFixed(2);
    document.getElementById("resumen-total").textContent = "S/ " + total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);

// Vuelve a pintar el carrito si la página se restaura desde el
// caché del navegador (por ejemplo, al usar el botón "Atrás"
// después de pagar). Sin esto, podría mostrarse una versión
// "congelada" de la página con el carrito desactualizado.
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        renderizarCarrito();
    }
});
