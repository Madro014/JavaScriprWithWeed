package com.example.crudprueba;

import com.example.crudprueba.dto.UsuarioDTO;
import com.example.crudprueba.exception.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registrarUsuario(UsuarioDTO.Registro registroDTO) {
        Usuario usuario = new Usuario();
        usuario.setNombre(registroDTO.nombre());
        usuario.setCorreo(registroDTO.correo());
        usuario.setContrasena(passwordEncoder.encode(registroDTO.contrasena()));
        usuarioRepository.save(usuario);
    }

    public boolean verificarLogin(String correo, String contrasena) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return passwordEncoder.matches(contrasena, usuario.getContrasena());  
    }

    public List<UsuarioDTO.Respuesta> obtenerTodosLosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(u -> new UsuarioDTO.Respuesta(u.getId(), u.getNombre(), u.getCorreo()))     
                .collect(Collectors.toList());
    }
}