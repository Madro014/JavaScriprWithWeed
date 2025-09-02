package com.example.crudprueba;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Spring Data JPA crea la consulta automáticamente a partir del nombre del método
    Optional<Usuario> findByCorreo(String correo);
}



