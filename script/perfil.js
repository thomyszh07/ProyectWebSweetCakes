const usuario = JSON.parse(localStorage.getItem("usuario"));
const btnCambiarFoto=document.getElementById("btnCambiarFoto");
const inputFoto=document.getElementById("inputFoto");

if (!usuario) {
    window.location.href = "../index.html";
}

//=========================
// CARGAR DATOS
//=========================

document.getElementById("nombreUsuario").value = usuario.nombre;
document.getElementById("correo").value = usuario.correo;
document.getElementById("telefono").value = usuario.telefono;
document.getElementById("direccion").value = usuario.direccion;
document.getElementById("fotoPerfil").src=usuario.foto?.startsWith("data:")
? usuario.foto
: "../"+usuario.foto;

//=========================
// GUARDAR CAMBIOS
//=========================

document.querySelector(".btn-guardar").addEventListener("click", () => {

    usuario.nombre = document.getElementById("nombreUsuario").value.trim();
    usuario.correo = document.getElementById("correo").value.trim();
    usuario.telefono = document.getElementById("telefono").value.trim();
    usuario.direccion = document.getElementById("direccion").value.trim();

    localStorage.setItem("usuario", JSON.stringify(usuario));

    // 🔥 EVENTO GLOBAL (CLAVE)
    window.dispatchEvent(new Event("usuarioActualizado"));

    mostrarToastPerfil("Cambios guardados correctamente ✓");
});

btnCambiarFoto.addEventListener("click",()=>{
    inputFoto.click();
});

inputFoto.addEventListener("change",()=>{
    const archivo=inputFoto.files[0];
    if(!archivo)return;

    const lector=new FileReader();

    lector.onload=()=>{
        usuario.foto=lector.result;
        document.getElementById("fotoPerfil").src=lector.result;

        localStorage.setItem("usuario",JSON.stringify(usuario));
        window.dispatchEvent(new CustomEvent("usuarioActualizado"));
    };

    lector.readAsDataURL(archivo);
});
function mostrarToastPerfil(mensaje){
    const toast=document.getElementById("toastPerfil");
    toast.textContent=mensaje;
    toast.classList.add("mostrar");

    setTimeout(()=>{
        toast.classList.remove("mostrar");
    },2500);
}