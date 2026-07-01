const salados={ 
1:{
    nombre:"EMPANADAS JAMÓN Y QUESO",
    imagen:"../assets/imagenes/salados/jamonadayqueso0.png",
    descripcion:"Empanadas horneadas rellenas de jamón y queso, ideales para compartir.",
    docena:20
   },

2:{
    nombre:"PIZZA DE TOMATE",
    imagen:"../assets/imagenes/salados/pizza.png",
    descripcion:"Pizza artesanal con salsa de tomate, queso y hierbas aromáticas.",
    completo:45
   },

3:{
    nombre:"PITIPAN",
    imagen:"../assets/imagenes/salados/pititipam.png",
    descripcion:"Mini panes rellenos de pollo deshilachado con mayonesa y lechuga fresca.",
    docena:20
  },

4:{
    nombre:"CHOCOBOYO",
    imagen:"../assets/imagenes/salados/chocoboyo.png",
    descripcion:"Mini panes rellenos de pollo deshilachado con mayonesa y lechuga fresca.",
    docena:25
  },

5:{
    nombre:"CROISSANTS",
    imagen:"../assets/imagenes/salados/cuernitos.png",
    descripcion:"Mini panes rellenos de pollo deshilachado con mayonesa y lechuga fresca.",
    docena:40
  },
6:{
    nombre:"EMPANADAS",
    imagen:"../assets/imagenes/salados/empanadas.png",
    descripcion:"Mini panes rellenos de pollo deshilachado con mayonesa y lechuga fresca.",
    docena:30
  },
7:{
    nombre:"TRIPLES",
    imagen:"../assets/imagenes/salados/triple.png",
    descripcion:"Mini panes rellenos de pollo deshilachado con mayonesa y lechuga fresca.",
    docena:30
  },
8:{
    nombre:"MINI PANES",
    imagen:"../assets/imagenes/salados/pitipan.png",
    descripcion:"Mini panes rellenos de pollo deshilachado con mayonesa y lechuga fresca.",
    docena:29
  },
}

const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

const producto = salados[id];

if (producto) {

    document.getElementById("nombrePostre").textContent = producto.nombre;

    document.getElementById("imagenPostre").src = producto.imagen;

    document.getElementById("imagenPostre").alt = producto.nombre;

    document.getElementById("descripcionPostre").textContent = producto.descripcion;

    if (producto.docena !== undefined) {
        document.getElementById("precioPorcion").textContent =
            "Una docena — S/ " + producto.docena.toFixed(2);

        document.getElementById("precioCompleto").textContent = "";
    } else {
        document.getElementById("precioPorcion").textContent = "";

        document.getElementById("precioCompleto").textContent =
            "Completo — S/ " + producto.completo.toFixed(2);
    }
}