# Solicitar la edad al usuario
edad = int(input("Por favor, ingresa tu edad: "))

# Clasificar según la edad ingresada
if edad < 13:
    print("Eres un niño.")
elif 13 <= edad <= 17:
    print("Eres un adolescente.")
elif 18 <= edad <= 64:
    print("Eres un adulto.")
elif edad >= 65:
    print("Eres un adulto mayor.")
else:
    print("Edad no válida.")
