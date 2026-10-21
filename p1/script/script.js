// Solicitar la edad al usuario
let edad = parseInt(prompt("Por favor, ingresa tu edad:"));

// Clasificar según la edad ingresada
if (edad < 13) {
    console.log("Eres un niño.");
} else if (edad >= 13 && edad <= 17) {
    console.log("Eres un adolescente.");
} else if (edad >= 18 && edad <= 64) {
    console.log("Eres un adulto.");
} else if (edad >= 65) {
    console.log("Eres un adulto mayor.");
} else {
    console.log("Edad no válida.");
}
