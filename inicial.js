// GUARDAR DATOS EN localStorage
arrayPalabras = ["AHORCADO","ALURA","WEB","INTERNET","HTML","CSS","FIREFOX","CHROME","EDGE"];
localStorage.setItem('palabrasLocal', JSON.stringify(arrayPalabras));

//Variables de botones y pantallas
var btnIniciar = document.querySelector(".btn-iniciar");
var btnAgregar = document.querySelector(".btn-agregar");
var pantallaInicial = document.querySelector(".pantalla-inicial");
var pantallaAgregarPalabra = document.querySelector(".agregar-palabra");
var pantallaJuego = document.querySelector(".juego");

// Codigo de Botones de Pantalla Inicial
btnIniciar.addEventListener("click",function(){
    ocultar(pantallaInicial);
    mostrar(pantallaJuego);
    asignarPalabra();
});

btnAgregar.addEventListener("click", function(){
    ocultar(pantallaInicial);
    mostrar(pantallaAgregarPalabra);
    inputIngresar.focus();
})

// Codigo de Agregar Palabras
var btnGuardar = document.querySelector(".btn-guardar");
var btnCancelar = document.querySelector(".btn-cancelar");
var patron = /^[A-ZÑñ]+$/i;
var inputIngresar = document.querySelector(".input-ingresar");
btnGuardar.addEventListener("click", function(){
    var aviso = document.querySelector(".info-agregar");
    if (patron.test(inputIngresar.value) && (inputIngresar.value.length <=8)){  
        var palabras = JSON.parse(localStorage.getItem('palabrasLocal'));
        var palabraMayus = inputIngresar.value.toUpperCase();
        palabras.push(palabraMayus);
        localStorage.setItem('palabrasLocal', JSON.stringify(palabras));
        inputIngresar.value="";
        ocultar(pantallaAgregarPalabra);
        mostrar(pantallaJuego);
        asignarPalabra();
        removeEventListener("click",function(){});
    } else{
        if (inputIngresar.value.length > 8) {
            aviso.textContent = "ⓘ Ingresa una palabra con hasta 8 letras";
            inputIngresar.focus();
        } else {
            aviso.textContent = "ⓘ Ingresa letras sin caracteres especiales y sin espacios";
            inputIngresar.focus();
        }
    }
});

btnCancelar.addEventListener("click", function(){
    inputIngresar.value="";
    ocultar(pantallaAgregarPalabra);
    mostrar(pantallaInicial);
});


// Funciones de Ocultar y Mostrar Elementos
function ocultar(elemento) {
    elemento.classList.add("ocultar");
}

function mostrar(elemento) {
    elemento.classList.remove("ocultar");
}

// Empezar el juego y asignar una palabra
function asignarPalabra(){
    var palabras = JSON.parse(localStorage.getItem('palabrasLocal'));
    var indice = Math.round(Math.random() * palabras.length);
    var palabraAsignada = palabras[indice];
    var cantidadLetras = palabraAsignada.length;
    var vidas = 6;
    for (let i=0;i < cantidadLetras;i++){
        letra = ".letra"+ (i+1).toString();
        document.querySelector(letra).classList.remove("ocultar");
    }


    document.addEventListener("keydown", (tecla)=>{

        let teclaMayus = tecla.key.toUpperCase();
        if (palabraAsignada.includes(teclaMayus)){
            for (let i=0; i < cantidadLetras; i++){
                if (palabraAsignada.charAt(i) == teclaMayus){
                    let casilla = (".letra"+(i+1).toString());
                    document.querySelector(casilla).textContent = teclaMayus;
                 }
            }
            //Pregunto si ya completé la palabra
            let cont = 0;
            for (let j = 1; j <= cantidadLetras;j++){
                let lugar = (".letra"+(j).toString());
                if (document.querySelector(lugar).textContent != ""){
                    cont++;
                }
            }
            if (cont == cantidadLetras){
                document.querySelector("main").classList.add("main-win");
                let terminar = confirm("GANASTE ! | Palabra: " + palabraAsignada);
                if (terminar){
                    location.reload();
                }else{
                    location.reload();
                }
                // document.querySelector(".ganaste").classList.remove("ocultar");
                // let btnOK = document.querySelector(".btn-ok");
                // document.querySelector(".palabra-aviso").textContent+=palabraAsignada;
                // btnOK.addEventListener("click", function(){
                //     location.reload();
                // });


            }

        } else {
            //Pregunto si perdí
            if (vidas > 0){
                let seccionErrados = document.querySelector(".errada").textContent;
                if (!seccionErrados.includes(teclaMayus) && patron.test(teclaMayus)){
                    document.querySelector(".errada").textContent = seccionErrados + " " + teclaMayus;
                }
                let seccion = (".parte"+vidas.toString());
                document.querySelector(seccion).classList.remove("ocultar");
                vidas--;

            }
            if (vidas == 0){
                document.querySelector("main").classList.add("main-lose");
                let terminar = confirm("PERDISTE | Palabra: " + palabraAsignada);
                if (terminar){
                    location.reload();
                }else{
                    location.reload();
                }

                // document.querySelector(".perdiste").classList.remove("ocultar");
                // let btnSalir = document.querySelector(".btn-salir");
                // document.querySelector(".subtitulo").textContent += palabraAsignada;
                // btnSalir.addEventListener("click", function(){
                //     location.reload();
                // });
            }
        }
    });       
}

function limpiarJuego(){
    var claseLetra = document.querySelectorAll(".letra");
    var claseErrada = document.querySelectorAll(".errada");
    var claseDibujos = document.querySelectorAll(".parte-horca");
    claseLetra.forEach(element => element.textContent="");
    claseLetra.forEach(element => element.classList.add("ocultar"));
    claseErrada.forEach(element => element.textContent="");
    claseDibujos.forEach(element => element.classList.add("ocultar"));
}

//Funciones del Juego
btnNuevo = document.querySelector(".btn-nuevo");
btnDesistir = document.querySelector(".btn-desistir");

btnNuevo.addEventListener("click", function(){
    limpiarJuego();
    asignarPalabra();
})

btnDesistir.addEventListener("click", function(){
    limpiarJuego();
    ocultar(pantallaJuego);
    mostrar(pantallaInicial);
})