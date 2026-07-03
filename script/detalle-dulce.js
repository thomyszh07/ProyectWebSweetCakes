console.log("postres.js cargado"); 
 
const postres = {

    1:{
        nombre:"TORTA DE CHOCOLATE",
        imagen:"../assets/imagenes/dulces/tortachoco2.webp",
        descripcion:"Deliciosa torta húmeda de chocolate amargo con relleno de manjar blanco y canela rallada de decoración.",
        porcion:8,
        completo:34
    },

    2:{
        nombre:"TORTA DE MARACUYÁ",
        imagen:"../assets/imagenes/dulces/tortamaracuya2.png",
        descripcion:"Bizcocho de vainilla rellena con crema de maracuyá acida y chantilly sabor maracuya.",
        porcion:9,
        completo:38
    },

    3:{
        nombre:"PIE DE LIMÓN",
        imagen:"../assets/imagenes/dulces/pie_pedido.jpg",
        descripcion:"El pie de limón es un postre clásico que combina una base crujiente de masa o galleta con un relleno cremoso y cítrico a base de limón, coronado por una capa suave de merengue tostado.",
        porcion:8,
        completo:68
    },

    4:{
        nombre:"CHEESECAKE DE FRUTOS",
        imagen:"../assets/imagenes/dulces/cheescake.jpg",
        descripcion:"Cheesecake cremoso sabor vainilla con una base de galleta maria suave y con frutos rojos de temporada.",
        porcion:9,
        completo:39
    },

    5:{
        nombre:"KEKE DE NARANJA",
        imagen:"../assets/imagenes/dulces/keke.png",
        descripcion:"Keke casero con un sabor naranja muy suave y delicioso.",
        porcion:7,
        completo:29
    },

    6:{
        nombre:"TORTA HELADA",
        imagen:"../assets/imagenes/dulces/tortahelada.png",
        descripcion:"Torta helada de tres niveles (keke de chocolate y vainilla , gelatina de fresa y gelatina de fresa con leche )tradicional.",
        porcion:8,
        completo:34
    },

    7:{
        nombre:"TORTA TRES LECHES",
        imagen:"../assets/imagenes/dulces/tortatresleches.jpg",
        descripcion:"Bizcocho de vainilla bañado en tres leches dulce, con chantilli de decoracion .",
        porcion:8,
        completo:34
    },

    8:{
        nombre:"FLAN",
        imagen:"../assets/imagenes/dulces/flan.webp",
        descripcion:"Fina y delicada masa de bizcocho enrollada a la perfección, rellena de una suave crema. Un clásico de la repostería con la textura ideal para derretirse en tu boca.",
        porcion:5,
        completo:34
    },

    9:{
        nombre:"PIONONO",
        imagen:"../assets/imagenes/dulces/pionono.png",
        descripcion:"Pionono relleno de dulce de leche argentino .",
        porcion:6,
        completo:27
    },

    10:{
        nombre:"TORTA IMPOSIBLE",
        imagen:"../assets/imagenes/dulces/imposible2.webp",
        descripcion:"Un postre de dos sabores , flan y keke de chocolate bañado en caramelo de azucar.",
        porcion:5,
        completo:22
    },

}

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

const postre = postres[id];

if(postre){

    document.getElementById("nombrePostre").textContent=postre.nombre;

    document.getElementById("imagenPostre").src=postre.imagen;

    document.getElementById("imagenPostre").alt=postre.nombre;

    document.getElementById("descripcionPostre").textContent=postre.descripcion;

    document.getElementById("precioPorcion").textContent="Porción — S/ "+postre.porcion.toFixed(2);

    document.getElementById("precioCompleto").textContent="Completo — S/ "+postre.completo.toFixed(2);

}  

// ====== Conectar botón "Añadir al Carrito" ======
const btnAgregar = document.getElementById("btnAgregar");

if (btnAgregar && postre) {
    btnAgregar.addEventListener("click", () => {
        const cantidadPorcion = parseInt(document.getElementById("cantidadPorcion").value) || 0;
        const cantidadCompleto = parseInt(document.getElementById("cantidadCompleto").value) || 0;

        if (cantidadPorcion <= 0 && cantidadCompleto <= 0) {
            alert("Elige al menos una cantidad antes de agregar al carrito.");
            return;
        }

        if (cantidadPorcion > 0) {
            agregarAlCarrito({
                id: id + "-porcion",
                nombre: postre.nombre,
                imagen: postre.imagen,
                tipo: "Porción",
                precio: postre.porcion,
                cantidad: cantidadPorcion
            });
        } 

        if (cantidadCompleto > 0) {
            agregarAlCarrito({
                id: id + "-completo",
                nombre: postre.nombre,
                imagen: postre.imagen,
                tipo: "Completo",
                precio: postre.completo,
                cantidad: cantidadCompleto
            });
        }

        // Actualiza el resumen de la derecha (pedido/total)
        const totalPedido = (cantidadPorcion * postre.porcion) + (cantidadCompleto * postre.completo);
        document.getElementById("pedido").value = postre.nombre;
        document.getElementById("total").value = "S/ " + totalPedido.toFixed(2);
    });
}
