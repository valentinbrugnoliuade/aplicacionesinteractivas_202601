package com.uade.tpejemplo.dto.response;

import com.uade.tpejemplo.model.TipoEntidad;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ComentarioResponse {

    private Long id;
    private TipoEntidad tipoEntidad;
    private String contenido;
    private LocalDateTime fechaCreacion;
    private String username;
    private String dniCliente;
    private Long idCredito;
    private Long idCobranza;
}