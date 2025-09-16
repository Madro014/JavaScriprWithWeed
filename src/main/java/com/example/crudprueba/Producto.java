package com.example.crudprueba;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String descripcion;
    private Double precio;
    private String imagenUrl;
    private String talla;
    private String color;
    private String categoria;
    private String temporada;

    public Producto() {}

    public Producto(String nombre, String descripcion, Double precio, 
                   String talla, String color, String categoria, String temporada) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.talla = talla;
        this.color = color;
        this.categoria = categoria;
        this.temporada = temporada;
    }
}