const menuUsuario=document.getElementById("menuUsuario");

function inicializarMenuUsuario(){
    if(!menuUsuario)return;

    const usuario=JSON.parse(localStorage.getItem("usuario"));

    if(!usuario||localStorage.getItem("sesion")!=="true"){
        menuUsuario.innerHTML=`<a href="pages/login.html">Iniciar Sesión</a>`;
        return;
    }

    menuUsuario.innerHTML=`
        <div class="dropdown-usuario">
            <button class="btn-usuario" id="btnUsuario">Mi Cuenta ▼</button>
            <div class="dropdown-menu" id="dropdownMenu">
                <div class="usuario-info">
                    <img src="${usuario.foto}" alt="Perfil">
                    <h4>${usuario.nombre}</h4>
                    <p>${usuario.correo}</p>
                </div>
                <hr>
                <a href="pages/perfil.html">👤 Mi Perfil</a>
                <button id="cerrarSesion">🚪 Cerrar sesión</button>
            </div>
        </div>
    `;

    const btnUsuario=document.getElementById("btnUsuario");
    const dropdownMenu=document.getElementById("dropdownMenu");
    const cerrarSesion=document.getElementById("cerrarSesion");

    if(btnUsuario&&dropdownMenu){
        btnUsuario.addEventListener("click",(e)=>{
            e.stopPropagation();
            dropdownMenu.classList.toggle("active");
        });
    }

    if(cerrarSesion){
    cerrarSesion.addEventListener("click",()=>{
        localStorage.removeItem("sesion");
        localStorage.removeItem("usuario");

        const estaEnPages = window.location.pathname.includes("/pages/");
        window.location.href = estaEnPages ? "../index.html" : "index.html";
    });
}
}

document.addEventListener("click",(e)=>{
    if(!e.target.closest(".dropdown-usuario")){
        document.getElementById("dropdownMenu")?.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded",inicializarMenuUsuario);
window.addEventListener("usuarioActualizado",inicializarMenuUsuario);
window.addEventListener("pageshow",inicializarMenuUsuario);
window.addEventListener("focus",inicializarMenuUsuario);