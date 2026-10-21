import java.util.InputMismatchException;
import java.util.Scanner;

public class ClasificacionEdad {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Por favor, ingresa tu edad: ");
        
        try {
            int edad = scanner.nextInt();
            
            if (edad < 0) {
                System.out.println("Edad no válida. No puede ser negativa.");
            } else if (edad < 13) {
                System.out.println("Eres un niño.");
            } else if (edad <= 17) {
                System.out.println("Eres un adolescente.");
            } else if (edad <= 64) {
                System.out.println("Eres un adulto.");
            } else {
                System.out.println("Eres un adulto mayor.");
            }
        } catch (InputMismatchException e) {
            System.out.println("Error: Debes ingresar un número entero válido.");
        } finally {
            scanner.close();
        }
    }
}
