console.log("salados.js cargado");

const salados = {
    1: {
        nombre: "EMPANADAS JAMÓN Y QUESO",
        imagen: "../assets/imagenes/salados/jamonadayqueso0.png",
        descripcion: "Empanadas artesanales rellenas de jamón frances y queso cheedar amarillo derretido.",
        docena: 20
    },

    2: {
        nombre: "TEQUEÑOS DE QUESO ",
        imagen: "../assets/imagenes/salados/tequenos1.webp",
        descripcion: "Los tequeños son un popular aperitivo frito hecho con un bastón de queso blanco envuelto en masa. Son crujientes por fuera, suaves por dentro y el piqueo infaltable en fiestas y reuniones de Sudamérica.",
        completo: 45
    },

    3: {
        nombre: "PITIPAN",
        imagen: "../assets/imagenes/salados/pititipam.png",
        descripcion: "Los pitipanes son pequeños panes redondos y suaves, con un toque ligeramente dulce, muy populares en el Perú. Son el bocadito salado por excelencia en cumpleaños, reuniones de trabajo y fiestas infantiles.",
        docena: 20
    },

    4: {
        nombre: "CHOCOBOYO",
        imagen: "../assets/imagenes/salados/chocoboyo.png",
        descripcion: "Pan dulce con chispas de chocolate.",
        docena: 20
    },

    5: {
        nombre: "CROISSANTS",
        imagen: "../assets/imagenes/salados/cuernitos.png",
        descripcion: "El croissant (o cruasán) es un pan de hojaldre con forma de medialuna, famoso por su textura crujiente por fuera y su interior alveolado y suave.",
        docena: 40
    },

    6: {
        nombre: "EMPANADAS",
        imagen: "../assets/imagenes/salados/empanadas2.webp",
        descripcion: "Las empanadas son un bocado hecho de masa fina relleno con un guiso salado o dulce, que se cocina al horno o frito.",
        docena: 30
    },

    7: {
        nombre: "TRIPLES",
        imagen: "../assets/imagenes/salados/triple.png",
        descripcion: "Sándwich triple con jamón, queso y pollo.",
        docena: 30
    },

    8: {
        nombre: "MINI PANES",
        imagen: "../assets/imagenes/salados/pitipan.png",
        descripcion: "Mini panes suaves rellenos de pollo.",
        docena: 29
    },
};

// 🔹 Obtener ID de la URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");
const producto = salados[id];

// 🔹 Mostrar producto en el HTML
if (producto) {
    const nombre = document.getElementById("nombrePostre");
    const imagen = document.getElementById("imagenPostre");
    const descripcion = document.getElementById("descripcionPostre");
    const precio = document.getElementById("precioDocena");

    if (nombre) nombre.textContent = producto.nombre;
    if (imagen) {
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
    }
    if (descripcion) descripcion.textContent = producto.descripcion;

    if (precio) {
        const valor = producto.docena || producto.completo;
        const tipoTexto = producto.completo ? "Completo" : "Docena";
        precio.textContent = tipoTexto + " — S/ " + valor.toFixed(2);
    }
}

// ====== ACTUALIZACIÓN AUTOMÁTICA DEL TOTAL ======
const actualizarTotalSalados = () => {
    if (!producto) return;

    const inputCantidad = document.getElementById("cantidad");
    const inputTotal = document.getElementById("total");

    if (!inputCantidad || !inputTotal) return;

    const cantidad = parseInt(inputCantidad.value) || 0;
    const precioUnitario = producto.docena || producto.completo;
    const total = cantidad * precioUnitario;

    // Actualiza directamente la caja de texto del Total
    inputTotal.value = "S/ " + total.toFixed(2);
};

// Escuchamos los cambios en la caja de cantidad al presionar flechas o escribir
const inputCant = document.getElementById("cantidad");
if (inputCant) {
    inputCant.addEventListener("input", actualizarTotalSalados);
    inputCant.addEventListener("change", actualizarTotalSalados);
}

// Ejecuta el cálculo automático apenas abre la página (así toma el "1" inicial y muestra su precio real)
actualizarTotalSalados();


// 🔹 Botón agregar al carrito
const btnAgregar = document.getElementById("btnAgregar");

if (btnAgregar && producto) {
    btnAgregar.addEventListener("click", () => {
        const inputCantidad = document.getElementById("cantidad");
        const cantidad = parseInt(inputCantidad?.value) || 0;

        if (cantidad <= 0) {
            alert("Elige una cantidad válida antes de añadir al carrito.");
            return;
        }

        const precioUnitario = producto.docena || producto.completo;

        if (typeof agregarAlCarrito === "function") {
            agregarAlCarrito({
                id: id,
                nombre: producto.nombre,
                imagen: producto.imagen,
                tipo: "Salado",
                precio: precioUnitario,
                cantidad: cantidad
            });
            
        } else {
            console.warn("agregarAlCarrito no está definida");
        }

        actualizarTotalSalados();
    });
}