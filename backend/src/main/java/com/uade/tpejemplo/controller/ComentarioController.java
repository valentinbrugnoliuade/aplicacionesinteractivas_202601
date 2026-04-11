package com.uade.tpejemplo.controller;

import com.uade.tpejemplo.dto.request.ComentarioRequest;
import com.uade.tpejemplo.dto.response.ComentarioResponse;
import com.uade.tpejemplo.service.ComentarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@RequiredArgsConstructor
public class ComentarioController {

    private final ComentarioService comentarioService;

    @PostMapping
    public ResponseEntity<ComentarioResponse> crear(
            @Valid @RequestBody ComentarioRequest request,
            Authentication authentication) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(comentarioService.crear(request, authentication.getName()));
    }

    @GetMapping
    public ResponseEntity<List<ComentarioResponse>> listarTodos() {
        return ResponseEntity.ok(comentarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(comentarioService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComentarioResponse> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ComentarioRequest request) {

        return ResponseEntity.ok(comentarioService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        comentarioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/cliente/{dni}")
    public ResponseEntity<List<ComentarioResponse>> listarPorCliente(@PathVariable String dni) {
        return ResponseEntity.ok(comentarioService.listarPorCliente(dni));
    }

    @GetMapping("/credito/{idCredito}")
    public ResponseEntity<List<ComentarioResponse>> listarPorCredito(@PathVariable Long idCredito) {
        return ResponseEntity.ok(comentarioService.listarPorCredito(idCredito));
    }

    @GetMapping("/cobranza/{idCobranza}")
    public ResponseEntity<List<ComentarioResponse>> listarPorCobranza(@PathVariable Long idCobranza) {
        return ResponseEntity.ok(comentarioService.listarPorCobranza(idCobranza));
    }
}