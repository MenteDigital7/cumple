//===========================
// VARIABLES
//===========================
let intervaloFade = null;
let reproduciedo = false;
let contadorNoTocar = 0;

const mensajesNoTocar = [
    "😶 Te dije queno lo tocaras...",
    "🤨 ¿Otra vez?",
    "😂 Ya sabía que ibas a volver.",
    "🙄 Bueno... ya que estás aquí.",
    "🎉 ¡Feliz cumpleaños otra vez! ❤️"

];

const audioHTML = document.getElementById("fondo-musica");
const boton = document.getElementById("boton-musica");
const iconoPath = document.getElementById("icono-path");
//const fechaCumple = new Date().getTime() - 1000;
const fechaCumple = new Date().getTime() + 30000;
//const fechaCumple = new Date("2026-07-11T00:00:00").getTime();

//===========================
// RELOG
//===========================

function actualizarReloj() {
    const ahora = new Date().getTime();
    const distancia = fechaCumple - ahora;

    if (distancia <= 0) {
        clearInterval(intervalo);
        document.getElementById("seccion-reloj").style.display = "none";
        document.getElementById("contenido-regalo").style.display = "block";
        document.getElementById("boton-musica").style.display = "flex";
        
        mostrarRegalo();
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("reloj").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}


//===========================
// INICIALIAZACION           
//===========================
    const cartas = document.querySelectorAll(".contenido-carta");
    cartas.forEach(parrafo => {
        const texto = parrafo.textContent.trim();
        parrafo.dataset.texto = texto;
        parrafo.textContent = "";
        parrafo.dataset.indice = 0;
   
        // creamos el span del texto
        const textoSpan = document.createElement("span");
        textoSpan.classList.add("texto");
        
        // creamos el cursor
        const cursor = document.createElement("span");
        cursor.classList.add("cursor");
        cursor.textContent = "▌";
        cursor.style.display = "none";

        // los agregamos al parrafo
        parrafo.appendChild(textoSpan);
        parrafo.appendChild(cursor);

    });

function inicializarEventos(){
    document
    .getElementById("boton-ultimo-regalo")
    .addEventListener("click", abrirUltimoRegalo);

    document
    .getElementById("boton-no-tocar")
    .addEventListener("click",botonNoTocar);
}

// iniciar relog
const intervalo = setInterval(actualizarReloj, 1000);
actualizarReloj();
inicializarEventos();

//=================================

// EVENTOS VISUALES
//=================================
function lanzarConfeti() {
     confetti({

        particleCount: 250,
        spread: 360,
        startVelocity: 45,
        origin: {
            x: 0.5,
            y: 0.5
        }

    });
}

function mostrarRegalo() {
    const header = document.getElementById("header-regalo");
    const primeraCarta = document.querySelector(".carta");
    const retrasoInicial = 800;
    const intervalo = 600;
    const direcciones = ["izquierda", "derecha","arriba","abajo"];

    // aparece el encabesado
    setTimeout(() => {
        header.classList.remove("oculto");
        header.classList.add("aparecer");
    }, 150);
    
    // aparece la carta
    setTimeout(() => {
        primeraCarta.classList.remove("oculto");
        primeraCarta.classList.add("aparecer");
        
    }, 800);   
    
}

// fondo animado
const fondo = document.querySelector(".fondo-animado");
    for (let i = 0;i < 35;i++){

        const particula = document.createElement("span");
        const tamaño = Math.random() * 8 + 4;
        const duracion = Math.random() * 4 + 4;
        const retraso = Math.random() * 5;
        const opacidad = Math.random();

        particula.style.width = tamaño + "px";
        particula.style.height = tamaño + "px";
        particula.style.left = Math.random() * 100 + "%";
        particula.style.animationDuration = duracion + "s";
        particula.style.animationDelay = retraso + "s";
        particula.style.opacity = opacidad;

        fondo.appendChild(particula);

    
}


//=================================
//  ICONOS
//=================================

const iconoPlay =  `
<svg id="icono-musica"
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
fill="white"
viewBox="0 0 24 24">
<path d="M8 5v14l11-7z"/>
</svg>`;

const iconoPause = `
<svg id="icono-musica"
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
fill="white"
viewBox="0 0 24 24">
<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>
</svg>`;


//====================================
// FADE IN / FADE OUT
//====================================

function fadeIn(audio){

    if (intervaloFade !== null){
        clearInterval(intervaloFade);
        intervaloFade = null;
    }

    audio.volume = 0;
    audio.play();

    intervaloFade = setInterval(() => {
        if (audio.volume + 0.03 >= 1){
            audio.volume = 1;
            clearInterval(intervaloFade);
            intervaloFade = null;
            
            if (audio.onFadeEnd) {
                audio.onFadeEnd();
                audio.onFadeEnd = null;
            }
        } else {
            audio.volume += 0.03;
        }
    }, 30);
}

// fade Out
function fadeOut(audio) {

        if (intervaloFade !== null) {
            clearInterval(intervaloFade);
            intervaloFade = null;
        }
         
        intervaloFade = setInterval(() => {
        
        if (audio.volume - 0.03 <= 0) {
            audio.volume = 0;
            audio.pause();
            clearInterval(intervaloFade);
            intervaloFade = null;

            if (audio.onFadeEnd) {
                audio.onFadeEnd();
                audio.onFadeEnd = null;
            }
        }else{
            audio.volume -= 0.03;
        }
    }, 30);
}


//====================================
// CONTROL DEL REPRODUCTOR
//====================================

function controlarMusica() {
    
    if (!audioHTML) return; 
    
    boton.classList.remove("pop");
    void boton.offsetWidth;
    boton.classList.add("pop");

    if (!reproduciedo) {
        
            iconoPath.setAttribute("d","M6 5h4v14H6zm8 0h4v14h-4z");
            boton.classList.add("reproduciendo");
            
        fadeIn(audioHTML);
        reproduciedo = true;    
    } else {
        
            iconoPath.setAttribute("d", "M8 5v14l11-7z");
            boton.classList.remove("reproduciendo");                        
        
        fadeOut(audioHTML);
        reproduciedo = false;
    }
}        
     

//==========================================
// EFECTO DE MAQUINA DE ESCRIBIR
//==========================================
function abrirCarta(elemento) {

    const carta = elemento;
    const parrafo = carta.querySelector(".contenido-carta");

    if (!parrafo) return;

    const textoSpan = parrafo.querySelector(".texto");
    const cursor = parrafo.querySelector(".cursor");

    const esUltimaCarta = carta.classList.contains("carta_premio");

    // Si ya está abierta, la cerramos
    if (parrafo.classList.contains("abierta")) {
        parrafo.classList.remove("abierta");
        carta.classList.remove("abierta");
        cursor.style.display = "none";
        return;
    }

    // Abrimos la carta
    parrafo.classList.add("abierta");
    carta.classList.add("abierta");
    cursor.style.display = "inline";

    const textoCompleto = parrafo.dataset.texto;
    let i = Number(parrafo.dataset.indice);

    textoSpan.textContent = textoCompleto.slice(0, i);

    const velocidadBase = 45;
    let velocidadActual = velocidadBase;
    let ultimoTiempo = 0;

    function bucleEscritura(tiempoActual) {

        // Si el usuario cerró la carta antes de terminar
        if (!parrafo.classList.contains("abierta")) {
            return;
        }

        if (!ultimoTiempo) {
            ultimoTiempo = tiempoActual;
        }

        const delta = tiempoActual - ultimoTiempo;

        if (delta >= velocidadActual) {

            if (i < textoCompleto.length) {

                textoSpan.textContent += textoCompleto[i];
                i++;

                parrafo.dataset.indice = i;

                ultimoTiempo = tiempoActual;
                velocidadActual = 35 + Math.random() * 30;

            } else {

                // Terminó de escribir
                parrafo.dataset.indice = 0;
                textoSpan.textContent = textoCompleto;
                cursor.style.display = "none";

                if (!esUltimaCarta) {

                    const siguienteCarta = carta.nextElementSibling;

                    if (
                        siguienteCarta &&
                        siguienteCarta.classList.contains("carta")
                    ) {

                        setTimeout(() => {
                            siguienteCarta.classList.remove("no-mostrar");
                            siguienteCarta.classList.remove("oculto");
                            siguienteCarta.classList.add("aparecer");

                            siguienteCarta.classList.remove("pop");
                            void siguienteCarta.offsetWidth;
                            siguienteCarta.classList.add("pop");

                        }, 300);

                    }

                } else {

                    setTimeout(() => {

                        const botonRegalo =
                            document.getElementById("boton-ultimo-regalo");
                        botonRegalo.classList.remove("no-mostrar");
                        botonRegalo.classList.remove("oculto");
                        botonRegalo.classList.add("aparecer");

                        botonRegalo.classList.remove("pop");
                        void botonRegalo.offsetWidth;
                        botonRegalo.classList.add("pop");

                    }, 1200);

                }

                return;
            }

        }

        requestAnimationFrame(bucleEscritura);

    }

    requestAnimationFrame(bucleEscritura);

}

//=========================
// EVENTOS
//=========================
audioHTML.onended =() => {
        reproduciedo = false;
        const boton = document.getElementById("boton-musica");
        const iconoPath = document.getElementById("icono-path");

    iconoPath.setAttribute("d", "M8 5v14l11-7z");
    boton.classList.remove("reproduciendo");
};
 
//=======================================
// FUNCIONES DEL ULTIMO REGAL0
//=======================================
function abrirUltimoRegalo() {
    
    const boton = document.getElementById("boton-ultimo-regalo");
    const sobre = document.getElementById("sobre-regalo");
    const sobreAnimado= sobre.querySelector(".sobre");
    
    boton.classList.remove("pop");
    void boton.offsetWidth;
    boton.classList.add("pop")

    setTimeout(() => {
        boton.classList.add("ocultar-boton");
    },200);
    
    setTimeout(() => {
        sobre.style.display = "block";
        sobre.classList.add("aparecer");
    },500);

    setTimeout(() => {
        sobreAnimado.classList.remove("pop");
        void sobreAnimado.offsetWidth;
        sobreAnimado.classList.add("pop");
    },650);

    setTimeout(() => {
        sobreAnimado.classList.add("abierto");
    },1400);

    setTimeout(() => {
        const vale = document.getElementById("vale-compensacion");
        vale.classList.add("mostrar");
    },1800);

    setTimeout(() => {
        sobreAnimado.classList.add("descansar")
    },3200);
   setTimeout(() => {

    const vale = document.getElementById("vale-compensacion");

    vale.classList.add("balanceo");

    },3400); 
    
    // Mostrar botón "No tocar" después de una pequeña pausa
    setTimeout(() => {
        const botonNoTocar = document.getElementById("boton-no-tocar");

        botonNoTocar.style.display = "flex";

        botonNoTocar.classList.remove("no.mostrar");
        botonNoTocar.classList.remove("oculto");
        botonNoTocar.classList.add("visible");
        botonNoTocar.classList.add("aparecer");

        botonNoTocar.classList.remove("pop");
        void botonNoTocar.offsetWidth;
        botonNoTocar.classList.add("pop");
    },4200);

}


function botonNoTocar(){

    contadorNoTocar++;

    const dialogo = document.getElementById("dialogo-no-tocar");

    dialogo.textContent =
        mensajesNoTocar[
            Math.min(
                contadorNoTocar-1,
                mensajesNoTocar.length-1
            )
        ];
    dialogo.classList.remove("oculto");
    dialogo.classList.remove("aparecer");
    void dialogo.offsetWidth;
    dialogo.classList.add("aparecer");

    clearTimeout(dialogo.timer);

    dialogo.timer = setTimeout(() => {

        dialogo.classList.remove("aparecer");
        dialogo.classList.add("oculto");

    },2000);

    if(contadorNoTocar===5){

        lanzarConfeti();

        document.getElementById("boton-no-tocar").textContent =
        "😂 Ya eres feliz, ¿no?";

    }

}