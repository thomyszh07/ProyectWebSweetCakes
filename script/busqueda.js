console.log("busqueda.js cargado");

document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("mi-buscador-pro");
    const tarjetas = document.querySelectorAll(".tarjeta-postre");

    if (!buscador || tarjetas.length === 0) return;

    buscador.addEventListener("input", () => {
        const textoBuscado = limpiarTexto(buscador.value);

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector(".nombre-postre")?.textContent || "";
            const precio = tarjeta.querySelector(".precio-postre")?.textContent || "";

            const textoTarjeta = limpiarTexto(nombre + " " + precio);

            if (textoTarjeta.includes(textoBuscado)) {
                tarjeta.style.display = "flex";
            } else {
                tarjeta.style.display = "none";
            }
        });
    });
});

function limpiarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}