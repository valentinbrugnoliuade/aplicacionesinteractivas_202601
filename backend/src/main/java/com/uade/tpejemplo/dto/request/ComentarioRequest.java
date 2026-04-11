package com.uade.tpejemplo.dto.request;

import com.uade.tpejemplo.model.TipoEntidad;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ComentarioRequest {

    @NotBlank(message = "El contenido es obligatorio.")
    @Size(min = 3, max = 1000, message = "El contenido debe tener entre 3 y 1000 caracteres.")
    private String contenido;

    @NotNull(message = "El tipo de entidad es obligatorio.")
    private TipoEntidad tipoEntidad;

    private String dniCliente;
    private Long idCredito;
    private Long idCobranza;
}