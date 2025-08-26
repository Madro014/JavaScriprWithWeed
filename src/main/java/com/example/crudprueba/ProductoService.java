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
}