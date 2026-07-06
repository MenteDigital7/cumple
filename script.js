//musica

// configuracion de la fecha de cumpleaños
const fechaCumple = new Date().getTime() - 1000;

function actualizarReloj() {
    const ahora = new Date().getTime();
    const distancia = fechaCumple - ahora;

    if (distancia <= 0) {
        clearInterval(intervalo);
        document.getElementById("seccion-reloj").style.display = "none";
        document.getElementById("contenido-regalo").style.display = "block";
        lanzarConfeti();
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("reloj").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

const intervalo = setInterval(actualizarReloj, 1000);
actualizarReloj();
// iniciar y ejecutar el reloj cada segundo

const cartas = document.querySelectorAll(".contenido-carta");
console.log("Cantidad de cartas:", cartas.length);
    cartas.forEach(parrafo => {
        const texto = parrafo.textContent.trim();
        console.log("Texto:", texto);
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
    
// funcion para lanzar confeti
function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// control del boton de reproducir musica
function controlarMusica() {
    console.log("SE EJECUTÓ controlarMusica");
    const audioHTML = document.getElementById("fondo-musica");
    const boton = document.getElementById("boton-musica");
    console.log(audioHTML.paused);
    console.log(audioHTML.currentTime);
    console.log(audioHTML.readyState);

    if (!audioHTML) return;

    if (audioHTML.paused) {
        audioHTML.play()
            .then(() => boton.textContent = "⏸️")
            .catch(err => {
            console.error(err);
            alert("toca nuevamente el boton para iniciar la musica");
        });
    } else {
        audioHTML.pause();
        boton.textContent = "🎵";
    }
}
// efecto de apertura y maquina de escribir version 4.4   
function abrirCarta(elemento) {

    const parrafo = elemento.querySelector(".contenido-carta");
    const carta = elemento;
    const textoSpan = parrafo.querySelector(".texto");
    const cursor = parrafo.querySelector(".cursor");
    if (!parrafo) return;

    // si esta abrierta se cierra
    if (parrafo.classList.contains("abierta")){
        parrafo.classList.remove("abierta");
        carta.classList.remove("abierta");
        cursor.style.display = "none";
        return;
    }

    // si esta cerrada la abrimos 
    parrafo.classList.add("abierta");
    carta.classList.add("abierta");
    cursor.style.display = "inline";
    
    const textoCompleto = parrafo.dataset.texto;
    console.log(textoCompleto);
    let i = Number(parrafo.dataset.indice);
    console.log(i);
    textoSpan.textContent = textoCompleto.slice(0,i);
    const velocidadBase = 45;
    let ultimoTiempo = 0;
    let velocidadActual = velocidadBase;
  

   
    function bucleEscritura(tiempoActual) {
    
            if (!parrafo.classList.contains("abierta")) {
                return;
            }
            if(!ultimoTiempo){
                ultimoTiempo = tiempoActual;
            }

            const delta = tiempoActual - ultimoTiempo;
            if (delta >= velocidadActual) {
                console.log("Escribiendo..",i);
                if (i < textoCompleto.length){
                    textoSpan.textContent += textoCompleto[i];
                    i++;
                    parrafo.dataset.indice = i;
                    ultimoTiempo = tiempoActual;
                    velocidadActual = 35 + Math.random() * 30;
                } else {
                    parrafo.dataset.indice = 0;
                    textoSpan.textContent = textoCompleto;
                    cursor.style.display = "none";
                return;
                }      
            }
            requestAnimationFrame(bucleEscritura);      
       
    
        }
        requestAnimationFrame(bucleEscritura);

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

