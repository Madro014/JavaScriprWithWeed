package com.example.crudprueba;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping(path = "api/v1/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> getAll() {
        return productoService.getProductos();
    }

    @GetMapping("/{productoId}")
    public Optional<Producto> getById(@PathVariable("productoId") Long productoId) {
        return productoService.getProductoById(productoId);
    }

    @PostMapping
    public void saveUpdate(@RequestBody Producto producto) {
        productoService.saveOrUpdate(producto);
    }

    @DeleteMapping("/{productoId}")
    public void delete(@PathVariable("productoId") Long productoId) {
        productoService.delete(productoId);
    }

    @PutMapping("/{productoId}")
    public void update(@PathVariable("productoId") Long productoId, @RequestBody Producto producto) {
        productoService.updateProducto(productoId, producto);
    }
}