// ==========================================
// 1. VARIABLES Y VARIABLES DE ESTADO
// ==========================================
const statusLabel = document.getElementById('statusLabel');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X'; // El jugador que empieza
let isGameActive = true;  // Controla si el juego sigue en curso
let boardState = ["", "", "", "", "", "", "", "", ""]; // Representación interna del tablero

// Arreglo de combinaciones ganadoras corregido
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

// ==========================================
// 2. FUNCIONES PRINCIPALES
// ==========================================

// Función que se ejecuta cada vez que un usuario clickea una celda
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Si la celda ya está ocupada o el juego terminó, ignoramos el click
    if (boardState[clickedIndex] !== "" || !isGameActive) {
        return;
    }

    // Guardamos la jugada en nuestro array interno y la dibujamos en pantalla
    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Suma la clase CSS para el color

    // Verificamos si esta jugada causó una victoria o empate
    checkResult();
}

// Función para revisar el estado del tablero
function checkResult() {
    let roundWon = false;

    // Recorremos todas las combinaciones ganadoras
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        let a = boardState[combination[0]];
        let b = boardState[combination[1]];
        let c = boardState[combination[2]];

        // Si alguna de las celdas de la combinación está vacía, continuamos
        if (a === '' || b === '' || c === '') {
            continue;
        }
        
        // Si las tres celdas tienen el mismo jugador, ¡hay un ganador!
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // Si alguien ganó, mostramos el mensaje y frenamos el juego
    if (roundWon) {
        statusLabel.textContent = `¡El jugador ${currentPlayer} ha ganado! 🎉`;
        isGameActive = false;
        return;
    }

    // Si no quedan celdas vacías y nadie ganó, es un empate
    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusLabel.textContent = "¡Es un empate! 🤝";
        isGameActive = false;
        return;
    }

    // Si nadie ganó y no hay empate, cambiamos de turno
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusLabel.textContent = `Turno del jugador ${currentPlayer}`;
}

// Función para vaciar el tablero y reiniciar los valores
function resetGame() {
    currentPlayer = 'X';
    isGameActive = true;
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusLabel.textContent = `Turno del jugador ${currentPlayer}`;
    
    // Limpiamos el texto y los estilos de cada botón del HTML
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('X', 'O');
    });
}

// ==========================================
// 3. ASIGNACIÓN DE EVENTOS
// ==========================================

// Le agregamos el detector de clicks a cada uno de los 9 casilleros
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Le asignamos la función de reinicio al botón
resetButton.addEventListener('click', resetGame);
