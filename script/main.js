//==================== TOAST ====================//
function mostrarToast(msg){
    const t=document.getElementById("toast");
    t.textContent=msg;
    t.classList.add("mostrar");
    setTimeout(()=>t.classList.remove("mostrar"),3000);
}

//==================== CAMBIAR FORMULARIOS ====================//
function mostrarRegistro(){
    document.getElementById("loginForm").style.display="none";
    document.getElementById("registroForm").style.display="block";
}

function mostrarLogin(){
    document.getElementById("registroForm").style.display="none";
    document.getElementById("loginForm").style.display="block";
}

//==================== VALIDAR LOGIN ====================//
function validarLogin(){

    const email=document.getElementById("email").value.trim();
    const pass=document.getElementById("password").value.trim();

    if(email===""||pass===""){
        mostrarToast("Completa todos los campos.");
        return;
    }

    const correo=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!correo.test(email)){
        mostrarToast("Ingresa un correo electrónico válido.");
        return;
    }

    if(pass.length<8){
        mostrarToast("La contraseña debe tener mínimo 8 caracteres.");
        return;
    }

    mostrarToast("Inicio de sesión exitoso.");

    localStorage.setItem("sesion","true");

    setTimeout(()=>{
    window.location.href="../index.html";
    },1500);

}

//==================== REGISTRAR ====================//
function registrarUsuario(){

    const nombre=document.getElementById("nombre").value.trim();
    const correo=document.getElementById("correoRegistro").value.trim();
    const pass=document.getElementById("passwordRegistro").value.trim();
    const confirmar=document.getElementById("confirmarPassword").value.trim();

    if(nombre===""||correo===""||pass===""||confirmar===""){
        mostrarToast("Completa todos los campos.");
        return;
    }

    const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email.test(correo)){
        mostrarToast("Ingresa un correo electrónico válido.");
        return;
    }

    if(pass.length<8){
        mostrarToast("La contraseña debe tener mínimo 8 caracteres.");
        return;
    }

    if(pass!==confirmar){
        mostrarToast("Las contraseñas no coinciden.");
        return;
    }

    mostrarToast("¡Registro exitoso!");

    setTimeout(()=>{
        mostrarLogin();
    },2000);

}

//==================== GOOGLE ====================//
function loginGoogle(){
    mostrarToast("Próximamente podrás iniciar sesión con Google.");
}

function registroGoogle(){
    mostrarToast("Próximamente podrás registrarte con Google.");
}
//====================
// MOSTRAR CONTRASEÑA
//====================
function mostrarPassword(id,icono){

    const input=document.getElementById(id);

    if(input.type==="password"){

        input.type="text";
        icono.textContent="🙈";

    }else{

        input.type="password";
        icono.textContent="👁️";

    }

}