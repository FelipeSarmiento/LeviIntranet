package com.levi.levi_intranet_backend.api.siesa;

import com.levi.levi_intranet_backend.application.siesa.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/siesa/items") // prefijo de la ruta
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/itemById")
    public ResponseEntity<?> getItemById(@RequestParam int id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/itemsById")

    public ResponseEntity<?> getItemsById(@RequestParam int id, String listaPrecio, String compania) {
        return ResponseEntity.ok(itemService.getItemsById(id,  listaPrecio, compania));
    }

    @PostMapping("/itemsByIds")
    public ResponseEntity<?> getItemsByIds(@RequestBody String[] ids, @RequestParam String compania) {
        return ResponseEntity.ok(itemService.getItemsByIds(ids,  compania));
    }

    @GetMapping("/itemsByCodigoBarra")

    public ResponseEntity<?> getItemsByCodigoBarra(@RequestParam String codigoBarra, String listaPrecio, String compania) {
        return ResponseEntity.ok(itemService.getItemsByCodigoBarra(codigoBarra,  listaPrecio, compania));
    }

}
