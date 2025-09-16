package com.example.crudprueba;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> getProductoById(Long id) {
        return productoRepository.findById(id);
    }

    public void saveOrUpdate(Producto producto) {
        productoRepository.save(producto);
    }

    public void delete(Long id) {
        productoRepository.deleteById(id);
    }

    public void updateProducto(Long id, Producto producto) {
        Producto productoToUpdate = productoRepository.findById(id).get();
        productoToUpdate.setNombre(producto.getNombre());
        productoToUpdate.setDescripcion(producto.getDescripcion());
        productoToUpdate.setPrecio(producto.getPrecio());
        productoToUpdate.setImagenUrl(producto.getImagenUrl());
        productoToUpdate.setTalla(producto.getTalla());
        productoToUpdate.setColor(producto.getColor());
        productoToUpdate.setCategoria(producto.getCategoria());
        productoToUpdate.setTemporada(producto.getTemporada());
        productoRepository.save(productoToUpdate);
    }
}