package com.example.crudprueba;


import com.example.crudprueba.dto.UsuarioDTO.Registro;
import com.example.crudprueba.dto.UsuarioDTO.Login;
import com.example.crudprueba.dto.UsuarioDTO.Respuesta;
import com.example.crudprueba.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/registro")
    public ResponseEntity<String> registrar(@Valid @RequestBody Registro request) {
        usuarioService.registrarUsuario(request);
        return new ResponseEntity<>("Usuario registrado exitosamente", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody Login request) {
        try {
            boolean esValido = usuarioService.verificarLogin(request.correo(), request.contrasena());
            return esValido
                ? new ResponseEntity<>("Login exitoso", HttpStatus.OK)
                : new ResponseEntity<>("Credenciales inválidas", HttpStatus.UNAUTHORIZED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Respuesta>> getAllUsuarios() {
        List<Respuesta> usuarios = usuarioService.obtenerTodosLosUsuarios();
        return ResponseEntity.ok(usuarios);
    }
}