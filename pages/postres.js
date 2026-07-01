console.log("postres.js cargado"); 
 
const postres = {

    1:{
        nombre:"TORTA DE CHOCOLATE",
        imagen:"../assets/imagenes/dulces/tortacgococlate.png",
        descripcion:"Deliciosa torta húmeda de chocolate amargo con relleno de manjar blanco y canela rallada de decoración.",
        porcion:8,
        completo:34
    },

    2:{
        nombre:"TORTA DE MARACUYÁ",
        imagen:"../assets/imagenes/dulces/pastelmaracuya.png",
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
        nombre:"TRUFAS",
        imagen:"../assets/imagenes/dulces/trufas.png",
        descripcion:"Trufas artesanales de galleta tentacion de chocolate bañados en chocolate amargo.",
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
        nombre:"MINI DUPLA",
        imagen:"../assets/imagenes/dulces/dupla dulce.png",
        descripcion:"Mini dupla de postres , ideal para compartir con tu amigo pareja.",
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

