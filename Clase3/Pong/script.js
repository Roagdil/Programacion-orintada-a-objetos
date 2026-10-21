// Seleccionamos el lienzo del HTML usando su ID
const canvas = document.getElementById("canvasPong");
// Obtenemos el contexto de dibujo en 2D para poder pintar formas
const ctx = canvas.getContext("2d");

// Configuración de la paleta del jugador (izquierda)
const jugador = {
    x: 10, // Posición horizontal fija cerca del borde izquierdo
    y: canvas.height / 2 - 40, // Centrado verticalmente al inicio
    ancho: 10, // Ancho en píxeles de la paleta
    alto: 80, // Alto en píxeles de la paleta
    puntos: 0 // Contador de puntos del jugador
};

// Configuración de la paleta de la computadora (derecha)
const computadora = {
    x: canvas.width - 20, // Posición horizontal fija cerca del borde derecho
    y: canvas.height / 2 - 40, // Centrado verticalmente al inicio
    ancho: 10, // Ancho de la paleta
    alto: 80, // Alto de la paleta
    puntos: 0 // Contador de puntos de la computadora
};

// Configuración de la pelota
const pelota = {
    x: canvas.width / 2, // Empieza en el centro horizontal
    y: canvas.height / 2, // Empieza en el centro vertical
    radio: 7, // Tamaño (radio) de la pelota
    velocidadX: 4, // Cuántos píxeles se mueve por frame en X (positivo va a la derecha)
    velocidadY: 4 // Cuántos píxeles se mueve por frame en Y (positivo va hacia abajo)
};

// Objeto para registrar si las teclas de control están presionadas
const teclas = {
    ArrowUp: false, // Registra si se presiona la flecha arriba
    ArrowDown: false // Registra si se presiona la flecha abajo
};

// Escuchamos cuando el usuario presiona una tecla
window.addEventListener("keydown", (evento) => {
    // Si la tecla es válida, la marcamos como verdadera (presionada)
    if (evento.key in teclas) teclas[evento.key] = true;
});

// Escuchamos cuando el usuario suelta una tecla
window.addEventListener("keyup", (evento) => {
    // Si la tecla se suelta, la marcamos como falsa (no presionada)
    if (evento.key in teclas) teclas[evento.key] = false;
});

// Función para reiniciar la pelota en el centro al hacer un punto
function reiniciarPelota() {
    pelota.x = canvas.width / 2; // Vuelve al centro X
    pelota.y = canvas.height / 2; // Vuelve al centro Y
    pelota.velocidadX = -pelota.velocidadX; // Cambia de dirección para que saque el otro
}

// Función encargada de actualizar las posiciones y calcular colisiones
function actualizar() {
    // Si se presiona flecha arriba y no se sale del techo, sube el jugador
    if (teclas.ArrowUp && jugador.y > 0) jugador.y -= 5;
    // Si se presiona flecha abajo y no se sale del suelo, baja el jugador
    if (teclas.ArrowDown && jugador.y < canvas.height - jugador.alto) jugador.y += 5;

    // Movimiento automático de la computadora (sigue el centro de la pelota de forma simple)
    if (pelota.y < computadora.y + computadora.alto / 2) {
        computadora.y -= 3.5; // Sube si la pelota está más arriba
    } else {
        computadora.y += 3.5; // Baja si la pelota está más abajo
    }

    // Movemos la pelota sumando su velocidad a su posición actual
    pelota.x += pelota.velocidadX;
    pelota.y += pelota.velocidadY;

    // Colisión de la pelota con el techo o el suelo
    if (pelota.y - pelota.radio < 0 || pelota.y + pelota.radio > canvas.height) {
        pelota.velocidadY = -pelota.velocidadY; // Invierte la dirección vertical (rebote)
    }

    // Comprobamos si la pelota pasa la paleta del jugador (Punto para Computadora)
    if (pelota.x < 0) {
        computadora.puntos++; // Suma punto a la máquina
        reiniciarPelota(); // Reinicia la pelota al centro
    }

    // Comprobamos si la pelota pasa la paleta del computadora (Punto para Jugador)
    if (pelota.x > canvas.width) {
        jugador.puntos++; // Suma punto al jugador
        reiniciarPelota(); // Reinicia la pelota al centro
    }

    // Colisión de la pelota con la paleta del Jugador (Izquierda)
    if (pelota.velocidadX < 0 && pelota.x - pelota.radio <= jugador.x + jugador.ancho && pelota.y >= jugador.y && pelota.y <= jugador.y + jugador.alto) {
        pelota.velocidadX = -pelota.velocidadX; // Rebota hacia la derecha
    }

    // Colisión de la pelota con la paleta de la Computadora (Derecha)
    if (pelota.velocidadX > 0 && pelota.x + pelota.radio >= computadora.x && pelota.y >= computadora.y && pelota.y <= computadora.y + computadora.alto) {
        pelota.velocidadX = -pelota.velocidadX; // Rebota hacia la izquierda
    }
}

// Función encargada de borrar y volver a dibujar todo en la pantalla
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Borramos todo el lienzo anterior

    ctx.fillStyle = "white"; // Definimos el color blanco para los dibujos

    ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto); // Dibujamos la paleta del jugador
    ctx.fillRect(computadora.x, computadora.y, computadora.ancho, computadora.alto); // Dibujamos la paleta de la computadora

    ctx.beginPath(); // Iniciamos la ruta para dibujar la pelota redonda
    ctx.arc(pelota.x, pelota.y, pelota.radio, 0, Math.PI * 2); // Creamos la forma de círculo
    ctx.fill(); // Rellenamos el círculo con el color blanco

    ctx.font = "30px 'Courier New'"; // Definimos el tamaño y fuente del marcador
    ctx.fillText(jugador.puntos, canvas.width / 4, 50); // Dibujamos los puntos del jugador a la izquierda
    ctx.fillText(computadora.puntos, (canvas.width / 4) * 3, 50); // Dibujamos los puntos de la máquina a la derecha

    // Dibujamos la línea de puntos divisoria en el medio del campo
    for (let i = 0; i < canvas.height; i += 20) {
        ctx.fillRect(canvas.width / 2 - 1, i, 2, 10); // Dibuja pequeños rectángulos de arriba a abajo
    }
}

// Bucle principal del juego que se ejecuta continuamente
function bucleJuego() {
    actualizar(); // Calcula movimientos y colisiones
    dibujar(); // Renderiza los gráficos actualizados
    requestAnimationFrame(bucleJuego); // Llama automáticamente al siguiente frame de animación
}

// --- NUEVA LÓGICA DE INICIO ---

// Seleccionamos los elementos de la interfaz usando sus IDs
const pantallaInicio = document.getElementById("pantallaInicio");
const botonIniciar = document.getElementById("botonIniciar");

// Escuchamos el clic en el botón de inicio
botonIniciar.addEventListener("click", () => {
    pantallaInicio.style.display = "none"; // Ocultamos la pantalla de inicio tapando el juego
    bucleJuego(); // Ejecutamos el bucle principal por primera vez para arrancar el juego
});
