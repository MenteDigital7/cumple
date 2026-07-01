// configuracion de la fecha de cumpleaños
const fechaCumple = new Date(2026, 6, 11, 0, 0, 0).getTime(); // 11 de julio de 2026

function actualizarReloj() {
    const ahora = new Date().getTime();
    const distancia = fechaCumple - ahora;

    // si es el 11 de julio o posterios
    if (distancia <= 0) {
        document.getElementById("seccion-reloj").style.display ="none";
        document.getElementById("contenido-regalo").style.display = "block";
        lanzarConfeti();
        clerarInterval(intervalo);
        return;
    }

    // calculos de tiempo
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // redenrizar en html
    document.getElementById("reloj").innerHTML = '${dias}d ${horas}h ${minutos}m ${segundos}s';
}

// iniciar y ejecutar el reloj cada segundo
const intervalo = setInrerval(actualizarReloj, 1000);
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
    const bontonMusica = document.getElementById("boton-musica");
    const audio = document.getElementById("fondo-musica");

    if (musica.paused) {
        musica.play();
        bonton.innerHTML = "⏸️";
        boton.classList.remove("Sonando");
    } else {
        musica.pause();
        boton.innerHTML = "";
        boton.classList.remove("Sonando");
    }    
}


// efectp de apertura y maquina de escribri 
function abrirCarta(elemento) {
    const parrafp = elemento.querySelector('.contenido-carta');
    
    // Si ya esta abierta, la cierra al tocarla de nuevo
    if (parrafo.classList.contains('abierta')) {
        pararafo.classList.remove('abierta');
        return;
    }
    parrafo.classList.add('abierta');

    // ejecuta el efecto maquina de escribir
    if (!parrafo.dataset.escrito) {
        const textoCompleto = parrafo.getAttribute('data-texto');
        let i = 0;
        parrafo.innerHTML = "";

        function escribir() {
            if (i < textoCompleto.length) {
                parrafo.innerHTML += textoCompleto.charAt(i);
                i++;
                setTimeout(escribir, 25);
            }
        }
        escribir();
        parrafo.dataset.escrito = true;
   }
}