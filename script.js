//musica
const musica = new Audio();
musica.src = "gone.mp3";
musica.loop = false;
musica.preload = "auto";

let desbloqueado = false;

document.addEventListener("click"), () => {
    if (!desbloqueado) {
        musica.play();
        desbloqueado = true;
    }
}

// configuracion de la fecha de cumpleaños
const fechaCumple = new Date().getTime() - 1000; // 11 de julio de 2026

function actualizarReloj() {
    const ahora = new Date().getTime();
    const distancia = fechaCumple - ahora;

    // si es el 11 de julio o posterios
    if (distancia <= 0) {
        clearInterval(intervalo);
        document.getElementById("seccion-reloj").style.display ="none";
        document.getElementById("contenido-regalo").style.display = "block";
        lanzarConfeti();
        return;
    }

    // calculos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // redenrizar en html
    document.getElementById("reloj").innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

// iniciar y ejecutar el reloj cada segundo
const intervalo = setInterval(actualizarReloj, 1000);
actualizarReloj();


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
    const boton = document.getElementById("boton-musica");
    
    musica.play().then(() => {
        if (!musica.paused) {
            boton.innerHTML = "⏸️";
        }
    }).catch((err) => {
        console.error("Error al reproducir la musica en el movil", err);
    });

    if (!musica.paused) {
        musica.pause();
        boton.innerHTML = "🎵";
    }
    
}


// efectp de apertura y maquina de escribri 
function abrirCarta(elemento) {
    const parrafo = elemento.querySelector('.contenido-carta');

    if (!parrafo) return;
    
    // Si ya esta abierta, la cierra al tocarla de nuevo
    if (parrafo.classList.contains('abierta')) {
        parrafo.classList.remove('abierta');
        return;
    }
    parrafo.classList.add('abierta');

    // ejecuta el efecto maquina de escribir
    if (parrafo.dataset.escrito !== "si" ) {
        const textoCompleto = parrafo.getAttribute('data-texto');
        if (!textoCompleto) return;
   
        parrafo.dataset.escrito = "si";
        const letras = Array.from(textoCompleto);

        // EL TRUCO: Llenamos el párrafo con el texto en transparente
        // Creamos un <span> interno para pintar las letras reales una a una encima
        parrafo.style.color = "transparent"; 
        parrafo.innerHTML = textoCompleto; 

        const capaVisible = document.createElement('span');
        capaVisible.style.color = "#4a5568"; // El color real de tus letras
        capaVisible.style.position = "absolute";
        capaVisible.style.left = "0";
        capaVisible.style.top = "0";
        capaVisible.style.width = "100%";
        capaVisible.style.height = "100%";
        capaVisible.style.pointerEvents = "none";

        // Nos aseguramos de que el párrafo tenga posición relativa para alinear la capa
        parrafo.style.position = "relative";
        parrafo.appendChild(capaVisible);


       

        let i = 0;
        let ultimoTiempo = 0;
        const velocidadMs = 30;

            function bucleEscritura(tiempoActual) {
                if (!ultimoTiempo) ultimoTiempo = tiempoActual;
                const delta = tiempoActual - ultimoTiempo;

                // Solo escribe cuando pasa el tiempo configurado, sincronizado con la pantalla
                if (delta >= velocidadMs) {
                    if (i < letras.length) { 
                        capaVisible.innerHTML += letras[i]; 
                        i++;
                        ultimoTiempo = tiempoActual;

                    } else {
                        parrafo.style.color = "#4a5568";
                        capaVisible.remove(); // eliminamos la capa visible
                        return; // termina la animacion cuando se escriben todas las letras
                    }
                }
                requestAnimationFrame(bucleEscritura);
            }
            requestAnimationFrame(bucleEscritura); 
        }
         
    }

 