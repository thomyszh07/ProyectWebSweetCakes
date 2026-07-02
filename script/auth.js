const menuUsuario = document.getElementById("menuUsuario");

const sesionIniciada = localStorage.getItem("sesion");

if (sesionIniciada === "true") {

    menuUsuario.innerHTML = `
        <a href="pages/datos-personales.html">Mi Cuenta</a>
    `;

} else {

    menuUsuario.innerHTML = `
        <a href="pages/login.html">Iniciar Sesión</a>
    `;

}