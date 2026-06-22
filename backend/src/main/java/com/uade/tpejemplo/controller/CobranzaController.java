package com.uade.tpejemplo.controller;

import com.uade.tpejemplo.dto.request.CobranzaRequest;
import com.uade.tpejemplo.dto.response.CobranzaResponse;
import com.uade.tpejemplo.exception.BusinessException;
import com.uade.tpejemplo.model.Usuario;
import com.uade.tpejemplo.service.CobranzaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cobranzas")
@RequiredArgsConstructor
public class CobranzaController {

    private final CobranzaService cobranzaService;

    @PostMapping
    public ResponseEntity<CobranzaResponse> registrar(@Valid @RequestBody CobranzaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cobranzaService.registrar(request));
    }

    @GetMapping("/credito/{idCredito}")
    public ResponseEntity<List<CobranzaResponse>> listarPorCredito(@PathVariable Long idCredito) {
        return ResponseEntity.ok(cobranzaService.listarPorCredito(idCredito));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> anular(
        @PathVariable Long id,
        @AuthenticationPrincipal Usuario usuario
    ) {
        if (!usuario.isPuedeAnularCobranza()) {
            throw new BusinessException("No tiene permisos para anular cobranzas.");
        }
        cobranzaService.anular(id);
        return ResponseEntity.noContent().build();
    }
}
