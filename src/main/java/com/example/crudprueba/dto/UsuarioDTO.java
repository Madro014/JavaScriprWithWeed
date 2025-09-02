package com.example.crudprueba.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
public interface UsuarioDTO {

    record Registro(
            @NotBlank(message = "El nombre no puede estar vacío")
            String nombre,

            @NotBlank(message = "El correo no puede estar vacío")
            @Email(message = "El correo no es válido")
            String correo,

            @NotBlank(message = "La contraseña no puede estar vacía")
            @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
            @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
                    message = "La contraseña debe contener al menos una mayúscula, una minúscula y un número")
            String contrasena
    ) {}

    record Login(
            @NotBlank(message = "El correo no puede estar vacío")
            @Email(message = "El correo no es válido")
            String correo,

            @NotBlank(message = "La contraseña no puede estar vacía")
            String contrasena
    ) {}

    record Respuesta(
            Long id,
            String nombre,
            String correo
    ) {}

    record Actualizacion(
            @NotBlank(message = "El nombre no puede estar vacío")
            String nombre,

            @NotBlank(message = "El correo no puede estar vacío")
            @Email(message = "El correo no es válido")
            String correo
    ) {}
}