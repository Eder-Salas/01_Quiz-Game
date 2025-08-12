// Arreglo con preguntas y opciones
const preguntas = [
  {
    pregunta: "¿Qué país ha ganado más Copas del Mundo?",
    opciones: ["Brasil", "Alemania", "Argentina", "Italia"],
    respuestaCorrecta: 0 // Brasil
  },
  {
    pregunta: "¿En qué año se jugó el primer Mundial?",
    opciones: ["1928", "1930", "1934", "1940"],
    respuestaCorrecta: 1 // 1930
  },
  {
    pregunta: "¿Quién es el máximo goleador en la historia de los mundiales?",
    opciones: ["Pelé", "Miroslav Klose", "Ronaldo Nazário", "Lionel Messi"],
    respuestaCorrecta: 1 // Klose
  },
  {
    pregunta: "¿Qué selección ganó el Mundial 2018?",
    opciones: ["Francia", "Croacia", "Alemania", "Inglaterra"],
    respuestaCorrecta: 0 // Francia
  },
  {
    pregunta: "¿Cuántos jugadores tiene un equipo en cancha?",
    opciones: ["10", "11", "12", "9"],
    respuestaCorrecta: 1 // 11
  }
];

// Variables de control
let indicePregunta = 0;
let puntuacion = 0;

// Referencias a elementos del DOM
const contenedorPregunta = document.getElementById("pregunta");
const contenedorOpciones = document.getElementById("opciones");
const botonSiguiente = document.getElementById("boton-siguiente");
const contenedorResultado = document.getElementById("resultado");
const textoResultado = document.getElementById("texto-resultado");

// Mostrar la pregunta actual
function mostrarPregunta() {
  const preguntaActual = preguntas[indicePregunta];
  contenedorPregunta.textContent = preguntaActual.pregunta;

  // Limpiar opciones anteriores
  contenedorOpciones.innerHTML = "";

  // Crear botones para cada opción
  preguntaActual.opciones.forEach((opcion, indice) => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.onclick = () => seleccionarRespuesta(indice);
    const li = document.createElement("li");
    li.appendChild(boton);
    contenedorOpciones.appendChild(li);
  });
}

// Verificar si la opción es correcta
function seleccionarRespuesta(indiceSeleccionado) {
  const esCorrecta = indiceSeleccionado === preguntas[indicePregunta].respuestaCorrecta;

  if (esCorrecta) {
    puntuacion++;
  }

  // Deshabilitar botones
  const botones = document.querySelectorAll("#opciones button");
  botones.forEach((btn, i) => {
    btn.disabled = true;
    if (i === preguntas[indicePregunta].respuestaCorrecta) {
      btn.style.backgroundColor = "#66bb6a"; // Verde para correcta
    } else if (i === indiceSeleccionado) {
      btn.style.backgroundColor = "#ef5350"; // Rojo para incorrecta
    }
  });

  // Mostrar botón siguiente
  botonSiguiente.style.display = "inline-block";
}

// Ir a la siguiente pregunta o mostrar resultado
botonSiguiente.addEventListener("click", () => {
  indicePregunta++;

  if (indicePregunta < preguntas.length) {
    mostrarPregunta();
    botonSiguiente.style.display = "none";
  } else {
    mostrarResultado();
  }
});

// Mostrar resultado final
function mostrarResultado() {
  document.getElementById("contenedor-pregunta").style.display = "none";
  botonSiguiente.style.display = "none";
  contenedorResultado.classList.remove("oculto");
  textoResultado.textContent = `Obtuviste ${puntuacion} de ${preguntas.length} respuestas correctas.`;
}

// Reiniciar el juego
function reiniciarJuego() {
  indicePregunta = 0;
  puntuacion = 0;
  contenedorResultado.classList.add("oculto");
  document.getElementById("contenedor-pregunta").style.display = "block";
  mostrarPregunta();
  botonSiguiente.style.display = "none";
}

// Iniciar el juego al cargar
mostrarPregunta();
